import Image from 'next/image'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession, providers } from 'next-auth/client'
import Button from '../../components/Inputs/Button'
import Link from 'next/link'
import UserButton from './UserButton'
import { motion } from 'framer-motion'
import router from 'next/router'

export default function Header(props) {

    const {notSticky} = props

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [bottomPanel, setBottomPanel] = useState(true)
    const [session, loading] = useSession()

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;

        setVisible((currentScrollPos < 20));
        setBottomPanel((prevScrollPos > currentScrollPos) || (currentScrollPos < 50))

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
        <>
        <motion.div 
        animate={{y: visible ? 0 : 5, opacity: visible ? 1 : 0}}
        transition={{ duration: 0.2, ease: "easeOut"}}
        className={(notSticky ? " fixed " : " sticky ")+" lg:hidden flex justify-start items-center overflow-hidden px-16px h-80px top-0   z-50  "}>
            <Link href="/dashboard">
                <a>
                    <div className="w-40px  h-40px relative appear">
                        <Image src="/img/logo.svg" layout="fill" objectFit="contain" />

                    </div>
                </a>
            </Link>
        </motion.div>
        <motion.div 
        animate={{y: bottomPanel ? 0 : 80}}
        transition={{ duration: 0.3, ease: "easeOut"}}
        className={"lg:hidden w-full flex bg-gray-900 backdrop bg-opacity-50 justify-start items-center overflow-hidden px-16px h-50px fixed bottom-0   z-50  "}>
            <div className=" w-full flex flex-grow flex-shrink justify-around items-center text-14 md:text-16">
            <Link href="/dashboard">
                <div className="flex items-center opacity-50 hover:opacity-100 dark:text-white dark:hover:text-white hover:text-purple cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16px w-16px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <div className="ml-8px"></div>
                </div>
                </Link>
                
                <div className="flex items-center opacity-50 hover:opacity-100 dark:text-white dark:hover:text-white hover:text-purple cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16px w-16px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <div className="ml-8px"></div>
                </div>
                <div className="flex items-center opacity-50 hover:opacity-100 dark:text-white dark:hover:text-white hover:text-purple cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16px h-16px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                    </svg>
                    <div className="ml-8px"></div>
                </div>
                <Link href="/my-profile">
                <div className="flex items-center opacity-50 hover:opacity-100 dark:text-white dark:hover:text-white hover:text-purple cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16px h-16px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div className="ml-8px"></div>
                </div>
                </Link>
                <div
                onClick={() => logout()}
                className="flex items-center opacity-50 hover:opacity-100 dark:text-white dark:hover:text-white hover:text-purple cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16px h-16px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <div className="ml-8px"></div>
                </div>
            </div>
        </motion.div>
        </>
    )
}