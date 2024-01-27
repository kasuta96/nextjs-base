"use client"

import { signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import { redirect, useSearchParams } from "next/navigation"
import { authErrors } from "@/lib/constants/auth"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { User } from "~/types/next-auth"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { ROUTE_HOME } from "@/lib/constants/route"

export default function LoginForm({ user }: { user?: User }) {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const callbackError = useSearchParams()!.get("error")
  const callbackUrl = useSearchParams()?.get("callbackUrl")
  const t = useTranslations("common")

  useEffect(() => {
    if (user) {
      toast.success(t("Login successfully"))
      return redirect(callbackUrl || ROUTE_HOME)
    }
  }, [user, callbackUrl, t])

  useEffect(() => {
    callbackError && setError(getAuthErrorMessage(callbackError))
    return () => {
      setError("")
    }
  }, [callbackError])

  async function loginWithGoogle() {
    setIsGoogleLoading(true)
    login("google")
  }
  async function login(provider: string) {
    try {
      await signIn(provider)
    } catch (error) {
      setError("Something went wrong!")
    }
  }

  return (
    <div className="flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button
        disabled={isGoogleLoading}
        className="bg-blue-600 text-base text-white hover:bg-blue-700"
        onClick={loginWithGoogle}
      >
        {isGoogleLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="mr-2"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
          </svg>
        )}
        {t("Login with Google")}
      </Button>
    </div>
  )
}

type AuthErrorKey = keyof typeof authErrors

function getAuthErrorMessage(errorKey: string): string {
  if (errorKey && errorKey in authErrors) {
    return authErrors[errorKey as AuthErrorKey]
  }
  return authErrors.Default
}
