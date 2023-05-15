interface ProfileLayoutProps {
  children: React.ReactNode
}

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <>
      <div className="mx-auto mt-20 w-full max-w-lg lg:mt-10">{children}</div>
      <div className="mb-20"></div>
    </>
  )
}
