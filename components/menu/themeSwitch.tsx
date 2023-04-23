'use client'

import { Moon, Palette, Sun } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

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
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <ThemeIcon theme={theme} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setTheme('system')}>
            <Palette className="mr-2 h-5 w-5" />
            <span>System</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            <Moon className="mr-2 h-5 w-5" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('light')}>
            <Sun className="mr-2 h-5 w-5" />
            <span>Light</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ThemeIcon = ({ theme }: { theme?: string }) => {
  return (
    <div className="p-1">
      {theme == 'light' ? (
        <Sun className="h-7 w-7" />
      ) : theme == 'dark' ? (
        <Moon className="h-7 w-7" />
      ) : (
        <Palette className="h-7 w-7" />
      )}
    </div>
  )
}

export default ThemeSwitch
