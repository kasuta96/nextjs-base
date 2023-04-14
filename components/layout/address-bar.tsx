'use client'

import React, { Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

function Params() {
  const searchParams = useSearchParams()!

  return searchParams.toString().length !== 0 ? (
    <div className="px-2 text-gray-500">
      <span>?</span>
      {Array.from(searchParams.entries()).map(([key, value], index) => {
        return (
          <React.Fragment key={key}>
            {index !== 0 ? <span>&</span> : null}
            <span className="px-1">
              <span key={key} className="animate-[highlight_1s_ease-in-out_1]">
                {key}
              </span>
              <span>=</span>
              <span
                key={value}
                className="animate-[highlight_1s_ease-in-out_1]"
              >
                {value}
              </span>
            </span>
          </React.Fragment>
        )
      })}
    </div>
  ) : null
}

export function AddressBar() {
  const pathname = usePathname()
  let uri = ''

  return (
    <div className="flex items-center gap-x-2 p-3.5 lg:px-5 lg:py-3">
      <div className="text-gray-600">
        <HomeIcon className="h-5 w-5" />
      </div>
      <div className="flex gap-x-1 text-sm font-medium">
        {pathname ? (
          <>
            <span className="text-gray-600">/</span>
            {pathname
              .split('/')
              .slice(1)
              .map((segment) => {
                uri += `/${segment}`
                return (
                  <React.Fragment key={segment}>
                    <Link
                      href={uri}
                      key={segment}
                      className="animate-[highlight_1s_ease-in-out_1] rounded-full px-1.5 py-0.5 text-gray-600 dark:text-gray-400"
                    >
                      {segment}
                    </Link>
                    <span className="text-gray-500">/</span>
                  </React.Fragment>
                )
              })}
          </>
        ) : null}

        <Suspense>
          <Params />
        </Suspense>
      </div>
    </div>
  )
}
