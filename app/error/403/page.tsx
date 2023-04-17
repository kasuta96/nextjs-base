'use client'

import React from 'react'

export default function Error403() {
  return (
    <section className="max-w-screen-sm px-4 py-8 text-center lg:px-6 lg:py-16">
      <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-stone-600 dark:text-stone-500 lg:text-9xl">
        403
      </h1>
      <div className="text-left">
        <p className="mb-4 text-xl tracking-tight text-gray-900 dark:text-white md:text-2xl">
          {`Oh no! Your account might have been locked or hasn't been given the green light.`}
        </p>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          {`Don't worry, just reach out to the Admin and they'll get you sorted out in no time! Keep on smiling :)`}
        </p>
      </div>
      <a
        href="/"
        className="my-4 inline-flex rounded-lg bg-stone-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-stone-300 dark:focus:ring-stone-900"
      >
        Back to Homepage
      </a>
    </section>
  )
}
