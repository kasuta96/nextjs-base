interface HomeLayoutProps {
  children: React.ReactNode
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-between p-4">
      {children}
    </main>
  )
}
