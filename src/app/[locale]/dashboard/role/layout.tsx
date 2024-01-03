interface RoleLayoutProps {
  children?: React.ReactNode
}

export default function RoleLayout({ children }: RoleLayoutProps) {
  return <div className="my-4">{children}</div>
}
