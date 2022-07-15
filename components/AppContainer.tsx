import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession, providers } from 'next-auth/client'
import router from 'next/router'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Cardholder, ChatsTeardrop, Lightning, Person, SignOut, StackSimple, User } from 'phosphor-react'

export default function AppContainer(props) {

    const { children } = props

    const [active, setActive] = useState("Domů");

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
            <div className="hidden text-white  lg:flex fixed bottom-0 top-0 left-0 p-24px   lg:w-200px 2xl:w-250px bg-white bg-opacity-5 flex-col gap-y-8px">
                <div className="mb-50px">
                    <Link href="/dashboard">
                        <a>
                            <div className="w-40px  h-40px relative appear">
                                <Image src="/img/logo.svg" layout="fill" objectFit="contain" />

                            </div>
                        </a>
                    </Link>
                </div>

                <MenuItem icon={<Lightning />} title="Příběhy" href="/dashboard" active={active} setActive={(to) => setActive(to)} />
                <MenuItem icon={<ChatsTeardrop />} title="Zprávy" href="/" active={active} setActive={(to) => setActive(to)} />
                <MenuItem icon={<StackSimple />} title="Moje příběhy" href="/" active={active} setActive={(to) => setActive(to)} />
                <MenuItem icon={<User />} title="Můj účet" href="/my-profile" active={active} setActive={(to) => setActive(to)} />
                <div className=""   onClick={() => logout()}>
                <MenuItem icon={<SignOut />} title="Odhlásit se" href="/" active={active} setActive={(to) => setActive(to)} />
                </div>
            </div>
        </div>
    )
}

function MenuItem({ title, href, active, setActive, icon }) {


    return (
        <Link href={href} >
            <div className={(active == href ? "  text-purple bg-purple bg-opacity-20 font-medium " : " text-gray-300 ") + " flex items-center opacity-100 font-light  hover:bg-purple hover:bg-opacity-10 p-2 rounded-md cursor-pointer"}>
                <div className="flex items-center gap-x-2">
                    {icon}
                    {title}
                </div>
            </div>
        </Link>
    )
}