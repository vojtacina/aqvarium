import Header from '../components/Header/Header'
import MainPage from '../components/MainPage'
import Loading from '../components/Loading'
import { signIn, signOut, useSession, providers } from 'next-auth/client'
import { getCsrfToken } from 'next-auth/client'
import { useRouter } from 'next/router'


import Head from "next/head";
import React, { useEffect, useState } from 'react'
import Layout from 'components/Layout'
import { redirect } from 'next/dist/next-server/server/api-utils'



export default function Login() {
  const router = useRouter()
  const [session, loading] = useSession()
  const [clicked, setClicked] = useState(false)
  const [csrfToken, setCsrfToken] = useState(null as any)

  const[username, setUsername] = useState("")
  const[password, setPassword] = useState("")

  async function getCsrf() {
    setCsrfToken(await getCsrfToken())
  }

  async function submitForm() {
    setClicked(true)
    const response = await signIn('credentials', { redirect: false, password: password, username: username })
    if(response) {
      setClicked(false)
    }
    if(response.status == 200) {
      router.push("/dashboard")
    }
  }

  useEffect(() => {
    console.log(session)
  }, [session])

  useEffect(() => {
    getCsrf()
  }, [])

  return (
    <Layout title="Přihlášení">
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/img/logo.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-18 font-semibold text-gray-900">Přihlaš se ke svému účtu</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Pokud ho ještě nemáš{' '}
              <a href="#" className="has-tooltip font-medium text-indigo-600 hover:text-indigo-500">
                <span className='tooltip rounded-md shadow-md text-14 p-1 bg-white text-black -mt-8'>
                  Účet si vytvoříš stejně snadno jako se do něj pak přihlásíš.
                </span>
                automaticky Ti ho vytvoříme

              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={() => submitForm()} action="javascript:void(0);">
            <input name="csrfToken" type="hidden" value={csrfToken ? csrfToken : ""} />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Uživatelské jméno
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Uživatelské jméno"
                  onChange={(to) => setUsername(to.target.value)}
                  value={username}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Heslo
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Heslo"
                  onChange={(to) => setPassword(to.target.value)}
                  value={password}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">


              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Zapomenuté heslo?
                </a>
              </div>
            </div>

            <div>
              <button
                className={"group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 " + (clicked ? " bg-gray-200 text-gray-800 " : " bg-indigo-600 hover:bg-indigo-700")}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                </span>
                {clicked ? "Ověřování..." : "Vstoupit do Aqvaria"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>

  )



}