import { Metadata } from 'next'
import LoginForm from './loginForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default function LoginPage() {
  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
      <LoginForm />
    </div>
  )
}
