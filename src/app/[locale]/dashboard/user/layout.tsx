interface UserLayoutProps {
  children?: React.ReactNode
}

export default function UserLayout({ children }: UserLayoutProps) {
  return <div className="p-4">{children}</div>
}
