import { checkPermission } from "@/lib/services/permission"
import NoReadPermission from "@/components/errors/no-read-permission"
import { EditUserAccordion } from "./_components/edit-user-form"
import { User } from "@/lib/validations/user"
import { getUserData } from "@/lib/services/user"

export const metadata = {
  title: "Users",
}

export default async function UserDetail({
  params: { userId, locale },
}: {
  params: { userId: string; locale: string }
}) {
  // Check permission
  const { read: read, write: write } = await checkPermission("user")
  const { read: readPrivate, write: writePrivate } =
    await checkPermission("user_private")
  if (!read) return <NoReadPermission />

  const userData = (await getUserData(userId, {
    general: read,
    role: read,
    other: read,
    private: readPrivate,
  })) as unknown as User

  return (
    <EditUserAccordion
      user={userData}
      locale={locale}
      permissions={{
        read: read,
        write: write,
        readPrivate: readPrivate,
        writePrivate: writePrivate,
      }}
    />
  )
}
