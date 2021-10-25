import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession, providers } from 'next-auth/client'
import router from 'next/router'

export default function AppContainer({ children }) {

    async function logout() {
        const response = await signOut({redirect: false})
        if(response) {
            router.push("/")
        }
    }

    return (
        <div className="w-full flex justify-between  relative">
            <div className="hidden lg:block p-24px lg:w-200px ">

            </div>
            <div className="max-w-6xl w-full lg:pl-50px lg:pt-8px">
                {children}
            </div>
            <div></div>
            <div className="hidden dark:text-white lg:flex fixed bottom-0 top-0 left-0 p-24px border-r border-gray-200 dark:border-gray-800 lg:w-200px 2xl:w-250px dark:bg-gray-900 bg-gray-100 flex-col gap-y-16px">
                <div className="mb-50px">
                    <Link href="/dashboard">
                        <a>
                            <div className="w-40px  h-40px relative appear">
                                <Image src="/img/logo.svg" layout="fill" objectFit="contain" />

                            </div>
                        </a>
                    </Link>
                </div>
                <div className="font-medium">
                    Vojtěch Cina
                </div>
                <div className="w-full h-1px bg-gray-300 dark:bg-gray-700 bg-opacity-50"></div>
                <Link href="/dashboard">
                <div className="flex items-center opacity-100 font-medium hover:opacity-100 text-gray-500 dark:text-gray-300  hover:text-purple dark:hover:text-white cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16px w-16px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <div className="ml-8px">Domů</div>
                </div>
                </Link>
                
                <div className="w-full h-1px bg-gray-300 dark:bg-gray-700 bg-opacity-50"></div>
                <div className="flex items-center font-medium   text-gray-500 dark:text-gray-300 hover:text-purple dark:hover:text-white cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16px w-16px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <div className="ml-8px">Zprávy</div>
                </div>
                <div className="flex items-center font-medium text-gray-500 dark:text-gray-300  hover:text-purple dark:hover:text-white cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16px h-16px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                    </svg>
                    <div className="ml-8px">Moje příběhy</div>
                </div>
                <div className="w-full h-1px font-medium bg-gray-300 dark:bg-gray-700 bg-opacity-50"></div>
                <div className="flex items-center   text-gray-500 dark:text-gray-300 hover:text-purple dark:hover:text-white cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16px h-16px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div className="ml-8px">Můj účet</div>
                </div>
                <div className="w-full h-1px bg-gray-300 dark:bg-gray-700 bg-opacity-50"></div>
                <div
                onClick={() => logout()}
                className="flex items-center font-medium   text-gray-500 dark:text-gray-300 hover:text-purple dark:hover:text-white cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16px h-16px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <div className="ml-8px">Odhlásit se</div>
                </div>
            </div>
        </div>
    )
}