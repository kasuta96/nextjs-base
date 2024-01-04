interface UserLayoutProps {
  children?: React.ReactNode
}

export default function UserLayout(props: UserLayoutProps) {
  return <div className="my-4">{props.children}</div>
}
