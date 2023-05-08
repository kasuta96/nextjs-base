'use client'

import React, { Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { locales } from '@/lib/i18n'
import { ROUTE_HOME } from '@/lib/constants/route'

export function AddressBar() {
  const pathname = usePathname()
  let uri = ''

  return (
    <div className="flex items-center gap-x-2 overflow-hidden p-3.5 text-gray-600 dark:text-gray-400 lg:px-5 lg:py-3">
      <Link href={ROUTE_HOME}>
        <Home className="h-4 w-4" />
      </Link>
      <div className="flex gap-x-1 text-sm font-medium">
        {pathname ? (
          <>
            {pathname
              .split('/')
              .slice(1)
              .map((segment) => {
                uri += `/${segment}`
                if (locales.includes(segment)) return null
                return (
                  <React.Fragment key={segment}>
                    <span className="text-gray-500">/</span>
                    <Link
                      href={uri}
                      key={segment}
                      className="animate-[highlight_1s_ease-in-out_1] rounded-full px-1.5 py-0.5"
                    >
                      {segment}
                    </Link>
                  </React.Fragment>
                )
              })}
          </>
        ) : null}

        {/* <Suspense>
          <Params />
        </Suspense> */}
      </div>
    </div>
  )
}

// function Params() {
//   const searchParams = useSearchParams()!

//   return searchParams.toString().length !== 0 ? (
//     <div className="px-2 text-gray-500">
//       <span>?</span>
//       {Array.from(searchParams.entries()).map(([key, value], index) => {
//         return (
//           <React.Fragment key={key}>
//             {index !== 0 ? <span>&</span> : null}
//             <span className="px-1">
//               <span key={key} className="animate-[highlight_1s_ease-in-out_1]">
//                 {key}
//               </span>
//               <span>=</span>
//               <span
//                 key={value}
//                 className="animate-[highlight_1s_ease-in-out_1]"
//               >
//                 {value}
//               </span>
//             </span>
//           </React.Fragment>
//         )
//       })}
//     </div>
//   ) : null
// }
