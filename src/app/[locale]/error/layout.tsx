export default async function ErrorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <div className="m-auto">{children}</div>
    </div>
  )
}
