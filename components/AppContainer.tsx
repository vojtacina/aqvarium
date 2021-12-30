import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession, providers } from 'next-auth/client'
import router from 'next/router'
import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function AppContainer(props) {

    const { children } = props

    const [active, setActive] = useState("🏠 Domů");

    async function logout() {
        const response = await signOut({ redirect: false })
        if (response) {
            router.push("/")
        }
    }

    useEffect(() => {
        console.log(active)
    }, [active]);

    useEffect(() => {
        setActive(router.pathname)
    }, []);

    return (
        <div className="w-full flex justify-between  relative">
            <Head>
                <meta
                    name="theme-color" content="#F5F3FB"
                    media="(prefers-color-scheme: light)"
                />
                <meta
                    name="theme-color" content="#000000"
                    media="(prefers-color-scheme: dark)"
                />
            </Head>
            <div className="hidden lg:block p-24px lg:w-200px ">

            </div>
            <div className="max-w-6xl w-full lg:pl-50px lg:pt-8px pb-50px md:pb-0">
                {children}
            </div>
            <div></div>
            <div className="hidden dark:text-white lg:flex fixed bottom-0 top-0 left-0 p-24px   lg:w-200px 2xl:w-250px dark:bg-bgdark bg-bglight flex-col gap-y-8px">
                <div className="mb-50px">
                    <Link href="/dashboard">
                        <a>
                            <div className="w-40px  h-40px relative appear">
                                <Image src="/img/logo.svg" layout="fill" objectFit="contain" />

                            </div>
                        </a>
                    </Link>
                </div>

                <MenuItem title="💥 Příběhy" href="/dashboard" active={active} setActive={(to) => setActive(to)} />
                <MenuItem title="💬 Zprávy" href="/" active={active} setActive={(to) => setActive(to)} />
                <MenuItem title="🎞 Moje příběhy" href="/" active={active} setActive={(to) => setActive(to)} />
                <MenuItem title="🙋‍♂️ Můj účet" href="/my-profile" active={active} setActive={(to) => setActive(to)} />
                <div
                    onClick={() => logout()}
                    className="flex items-center opacity-100 font-medium hover:opacity-100 hover:bg-white p-2 rounded-md dark:hover:bg-black text-gray-500 dark:text-gray-300  hover:text-black dark:hover:text-white cursor-pointer">

                    <div className="">🔚 Odhlásit se</div>
                </div>
            </div>
        </div>
    )
}

function MenuItem({ title, href, active, setActive }) {


    return (
        <Link href={href} >
            <div className={(active == href ? " bg-white dark:bg-black text-black shadow " : " text-gray-500 dark:text-gray-300 ") + " flex items-center opacity-100 font-medium hover:opacity-100 hover:bg-white hover:bg-opacity-50 p-2 rounded-md dark:hover:bg-black   hover:text-black dark:hover:text-white cursor-pointer"}>
                <div className="">{title}</div>
            </div>
        </Link>
    )
}