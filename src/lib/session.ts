import { getServerSession as getSS } from "next-auth/next"
import authOptions from "@/lib/auth"

export async function getServerSession() {
  return await getSS(authOptions)
}

export async function getCurrentUser() {
  const session = await getServerSession()

  return session?.user
}
