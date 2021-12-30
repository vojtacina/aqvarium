
import { signIn, signOut, useSession, providers } from 'next-auth/client'

import React, { useEffect } from 'react'


import Link from 'next/link'
import Layout from 'components/Layout'
import { Transition } from 'framer-motion'
import Image from 'next/image'


export default function Home() {

  const [session, loading] = useSession()

  useEffect(() => {
    console.log(session)
  }, [session])

  return (
    <Layout>

      <div className="relative bg-bglight overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-bglight sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-bglight transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <div>
              <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                  <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                    <div className="flex items-center justify-between w-full md:w-auto">
                      <a href="#">
                        <span className="sr-only">Workflow</span>
                        <img
                          className="h-8 w-auto sm:h-10"
                          src="/img/logo.svg"
                        />
                      </a>
                      <div className="-mr-2 flex items-center md:hidden">

                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-20px">
                    {session?.user &&
                      <>
                        <Link href="/dashboard">
                          <div className="ml-20px">Nástěnka</div>
                        </Link>
                        <div>{session?.user?.name}</div>
                      </>
                    }

                  </div>
                  <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                    {session?.user ?
                      <div onClick={() => signOut()} className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                        Odhlásit se
                      </div>
                      :
                      <Link href="/login" >
                        <div className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                          Přihlásit se
                        </div>
                      </Link>
                    }

                  </div>
                </nav>
              </div>

              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-bold text-gray-900 text-30  md:text-48">
                    <span className="block xl:inline ">Jednoduchá aplikace pro</span>{' '}
                    <span className="block text-indigo-600 xl:inline ">úžasnou společnost</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Prozkoumej stories z tvého města nebo z celé republiky. Staň se součástí jednoho velkého příběhu.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-xl shadow">
                      <Link href="/dashboard">
                        <a

                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                        >
                          Prozkoumat
                        </a>
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <a
                        href="#"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                      >
                        O projektu
                      </a>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div className="lg:absolute overflow-hidden m-4 rounded-lg lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full relative">
              <Image
                layout="fill"
                blurDataURL="/img/feat_img.jpeg"
                objectFit="cover"
                src="/img/feat_img.jpeg"
                alt=""
                placeholder="blur"
              />
            </div>

          </div>
        </div>
      </div>
    </Layout>
  )
}