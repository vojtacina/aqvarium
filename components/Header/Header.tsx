import Image from 'next/image'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession, providers } from 'next-auth/client'
import Button from '../../components/Inputs/Button'
import Link from 'next/link'
import UserButton from './UserButton'
import { motion } from 'framer-motion'
import router from 'next/router'

export default function Header() {

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [session, loading] = useSession()

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;

        setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);

        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);

    }, [prevScrollPos, visible, handleScroll]);

    async function logout() {
        const response = await signOut({redirect: false})
        if(response) {
            router.push("/")
        }
    }


    return (
        <motion.div 
        animate={{height: visible ? 80 : 60, backgroundColor: visible ? "transparent" : "rgba(249, 250, 251, 0.5)", boxShadow: visible ? "none" : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"}}
        className={"lg:hidden w-full flex justify-start items-center px-24px h-80px sticky top-0  z-50 transition duration-1000 " + (!visible && "backdrop")}>
            <Link href="/dashboard">
                <a>
                    <div className="w-40px  h-40px relative appear">
                        <Image src="/img/logo.svg" layout="fill" objectFit="contain" />

                    </div>
                </a>
            </Link>
            <div className="ml-28px w-full flex flex-grow flex-shrink justify-around items-center text-14 md:text-16">
            <Link href="/dashboard">
                <div className="flex items-center opacity-50 hover:opacity-100 hover:text-purple cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16px w-16px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <div className="ml-8px"></div>
                </div>
                </Link>
                
                <div className="flex items-center opacity-50 hover:opacity-100 hover:text-purple cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16px w-16px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <div className="ml-8px"></div>
                </div>
                <div className="flex items-center opacity-50 hover:opacity-100 hover:text-purple cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16px h-16px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                    </svg>
                    <div className="ml-8px"></div>
                </div>
                <div className="flex items-center opacity-50 hover:opacity-100 hover:text-purple cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16px h-16px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div className="ml-8px"></div>
                </div>
                <div
                onClick={() => logout()}
                className="flex items-center opacity-50 hover:opacity-100 hover:text-purple cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16px h-16px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <div className="ml-8px"></div>
                </div>
            </div>
        </motion.div>
    )
}