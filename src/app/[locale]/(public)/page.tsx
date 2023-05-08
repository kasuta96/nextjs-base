'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useTranslations } from 'next-intl'
import { ROUTE_DASHBOARD, ROUTE_LOGO } from '@/lib/constants/route'

const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {
  const t = useTranslations('common')

  return (
    <>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src={ROUTE_LOGO}
          alt="Next.js Logo"
          width={442}
          height={78}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:auto-cols-max lg:grid-flow-col lg:text-left">
        <a
          href={ROUTE_DASHBOARD}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
        >
          <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
            {t(`Dashboard`)}{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p
            className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
          >
            {t('Management Page')}
          </p>
        </a>
      </div>
    </>
  )
}
