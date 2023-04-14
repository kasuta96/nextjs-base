interface DeviceLayoutProps {
  children?: React.ReactNode
}

export default async function DeviceLayout({ children }: DeviceLayoutProps) {
  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <div className="p-4">{children}</div>
    </div>
  )
}
