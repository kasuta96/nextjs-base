'use client'

import * as React from 'react'
import { signIn } from 'next-auth/react'

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AuthForm({ className, ...props }: AuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  return (
    <div className="grid gap-6" {...props}>
      <button
        type="button"
        className=""
        onClick={() => {
          setIsLoading(true)
          signIn('github')
        }}
        disabled={isLoading}
      >
        {isLoading ? 'Loading' : 'Github'}
      </button>
      <button
        type="button"
        className=""
        onClick={() => {
          setIsLoading(true)
          signIn('google')
        }}
        disabled={isLoading}
      >
        {isLoading ? 'Loading' : 'Google'}
      </button>
    </div>
  )
}
