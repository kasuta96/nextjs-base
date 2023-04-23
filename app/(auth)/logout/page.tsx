'use client'

import { useSearchParams } from 'next/navigation'
import { signOut } from 'next-auth/react'

export default function LogOut() {
  const from = useSearchParams()?.get('from')
  let url = '/login' + (from ? `?from=${from}` : '')
  signOut({ callbackUrl: url })
}
