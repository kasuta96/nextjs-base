'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Dropdown from '../basic/dropdown'
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Dropdown
      btn={<ThemeIcon theme={theme} />}
      menu={{
        className: '-top-2 right-0 -translate-y-full',
        data: [
          {
            icon: <ComputerDesktopIcon className="h-6 w-6" />,
            name: 'System',
            onClick: () => setTheme('system'),
          },
          {
            icon: <MoonIcon className="h-6 w-6" />,
            name: 'Dark',
            onClick: () => setTheme('dark'),
          },
          {
            icon: <SunIcon className="h-7 w-7" />,
            name: 'Light',
            onClick: () => setTheme('light'),
          },
        ],
      }}
    />
  )
}

const ThemeIcon = ({ theme }: { theme?: string }) => {
  return (
    <div className="p-1">
      <div className="h-7 w-7">
        {theme == 'light' ? (
          <SunIcon />
        ) : theme == 'dark' ? (
          <MoonIcon />
        ) : (
          <ComputerDesktopIcon />
        )}
      </div>
    </div>
  )
}

export default ThemeSwitch
