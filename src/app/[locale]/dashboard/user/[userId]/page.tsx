import { getTranslations } from "next-intl/server"
import { checkPermission } from "@/lib/services/permission"
import NoReadPermission from "@/components/errors/no-read-permission"
import { User } from "@/lib/validations/user"
import { getUserData } from "@/lib/services/user"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  EditUserGeneralForm,
  EditUserPrivateForm,
  UserOther,
} from "./_components/edit-user-form"
import { EditUserRolesForm } from "./_components/edit-user-role"

export const metadata = {
  title: "Users",
}

export default async function UserDetail({
  params: { userId, locale },
}: {
  params: { userId: string; locale: string }
}) {
  const t = await getTranslations()

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
    <div className="space-y-4">
      <Accordion
        type="single" // single | multiple
        collapsible // use with type single
        defaultValue="general"
        className="grid gap-4"
      >
        <AccordionItem
          value={"general"}
          className="h-fit rounded-lg border px-4 hover:shadow-lg"
        >
          <AccordionTrigger>{t("common.General")}</AccordionTrigger>
          <AccordionContent className="p-2 pb-4">
            <EditUserGeneralForm
              user={userData}
              write={write}
              locale={locale}
            />
          </AccordionContent>
        </AccordionItem>

        {readPrivate && (
          <AccordionItem
            value={"private"}
            className="h-fit rounded-lg border px-4 hover:shadow-lg"
          >
            <AccordionTrigger>{t("common.Private")}</AccordionTrigger>
            <AccordionContent className="p-2 pb-4">
              <EditUserPrivateForm user={userData} write={writePrivate} />
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem
          value={"roles"}
          className="h-fit rounded-lg border px-4 hover:shadow-lg"
        >
          <AccordionTrigger>{t("common.Roles")}</AccordionTrigger>
          <AccordionContent className="p-2 pb-4">
            <EditUserRolesForm user={userData} write={write} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value={"other"}
          className="h-fit rounded-lg border px-4 hover:shadow-lg"
        >
          <AccordionTrigger>{t("common.Other")}</AccordionTrigger>
          <AccordionContent className="p-2 pb-4">
            <UserOther user={userData} write={write} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
