import Image from 'next/image'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession, providers } from 'next-auth/client'
import Button from '../../components/Inputs/Button'
import Link from 'next/link'

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
        <div className={"w-full flex justify-between p-24px fixed top-0  z-50 transition duration-1000 " + (!visible && "backdrop")}>
            <Link href="/">
                <a>
                    <div className="w-40px  h-40px relative appear">
                        <Image src="/img/logo.svg" layout="fill" objectFit="contain" />

                    </div>
                </a>
            </Link>
            <div className="w-full flex justify-end items-center text-14 md:text-16">
                {session &&
                    <div className="flex flex-shrink-0 items-center">

                        <div onClick={() => signOut()} className="font-light  appear px-6px md:px-20px text-center cursor-pointer flex-shrink-0">Odhlásit se</div>

                        <div className="flex flex-shrink-0 items-center">
                            <div className="w-24px  h-24px relative appear mx-6px">
                                <Image src="/icons/messages_new.svg" layout="fill" objectFit="contain" />
                            </div>

                            <div className="w-24px  h-24px relative appear mx-6px">
                                <Image src="/icons/user.svg" layout="fill" objectFit="contain" />
                            </div>

                        </div>

                    </div>
                }
            </div>
        </div>
    )
}