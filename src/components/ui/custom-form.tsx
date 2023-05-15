'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

const SelectRef = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>
))
SelectRef.displayName = SelectPrimitive.Select.displayName

export { SelectRef }
