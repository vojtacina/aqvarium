import Image from 'next/image'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession, providers } from 'next-auth/client'
import Button from '../../components/Inputs/Button'
import Link from 'next/link'
import UserButton from './UserButton'

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


    return (
        <div className={"lg:hidden w-full flex justify-start p-24px sticky top-0  z-50 transition duration-1000 " + (!visible && "backdrop")}>
            <Link href="/dashboard">
                <a>
                    <div className="w-40px  h-40px relative appear">
                        <Image src="/img/logo.svg" layout="fill" objectFit="contain" />

                    </div>
                </a>
            </Link>
            <div className="ml-28px w-full flex justify-start items-center text-14 md:text-16">
                {session &&
                   <UserButton />
                }
            </div>
        </div>
    )
}