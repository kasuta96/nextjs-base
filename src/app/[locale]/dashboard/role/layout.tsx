interface RoleLayoutProps {
  children?: React.ReactNode
}

export default function RoleLayout({ children }: RoleLayoutProps) {
  return <div className="p-4">{children}</div>
}
