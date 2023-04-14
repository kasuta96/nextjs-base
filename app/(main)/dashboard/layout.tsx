interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <div className="p-4">{children}</div>
    </div>
  )
}
