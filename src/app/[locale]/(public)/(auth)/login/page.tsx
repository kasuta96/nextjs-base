import { Metadata } from "next"
import LoginForm from "./loginForm"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default async function LoginPage() {
  const user = await getCurrentUser()

  return (
    <>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:-translate-x-1/2 before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:lg:h-[360px] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40">
        <LoginForm user={user} />
      </div>
      <div></div>
    </>
  )
}
