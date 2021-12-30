import Image from 'next/image'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession, providers } from 'next-auth/client'
import Button from '../../components/Inputs/Button'
import Link from 'next/link'
import UserButton from './UserButton'
import { motion } from 'framer-motion'
import router from 'next/router'

export default function Header(props) {

    const { notSticky } = props

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [bottomPanel, setBottomPanel] = useState(true)
    const [session, loading] = useSession()
    const [page, setPage] = useState("/dashboard");

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
        const response = await signOut({ redirect: false })
        if (response) {
            router.push("/")
        }
    }

    function switcher(el) {
        const value = el.target.value
        console.log(value)
        setPage(value)
        switch(value) {
            case "/dashboard": return router.push("/dashboard")
            case "/my-profile": return router.push("/my-profile")
            case "/logout": return logout()
        }
    }

    useEffect(() => {
        const url = router.pathname
        console.log("url:", url)

        setPage(url)
    }, []);

    return (
        <>
            <motion.div
                animate={{ y: visible ? 0 : 5, opacity: visible ? 1 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={(notSticky ? " fixed " : " sticky ") + " lg:hidden w-full flex justify-between items-center overflow-hidden px-16px h-80px top-0   z-50  "}>
                <Link href="/dashboard">
                    <a>
                        <div className="w-40px  h-40px relative appear">
                            <Image src="/img/logo.svg" layout="fill" objectFit="contain" />

                        </div>
                    </a>
                </Link>
                {/* <select onChange={(el) => switcher(el)} value={page}
                    className="bg-bglight relative w-full text-transparent bg-opacity-50 backdrop rounded-xl h-40px py-2 px-16px ml-16px cursor-pointer appearance-none border-gray-600 text-black font-medium block outline-none"
                    >
                        <option value="/dashboard">💥 Nové příběhy</option>
                        <option value="/messages">💬 Zprávy</option>
                        <option value="/my-stories">🎞 Moje příběhy</option>
                        <option value="/my-profile">🙋‍♂️ Můj účet</option>
                        <option value="/logout">🔚 Odhlásit se</option>
                    </select> */}
            </motion.div>
            <motion.div
                animate={{ y:  0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={"lg:hidden w-full flex bg-bglight dark:bg-bgdark backdrop bg-opacity-50  justify-start items-center overflow-hidden px-16px h-50px fixed bottom-0   z-50  "}>
                <div className=" w-full flex flex-grow flex-shrink justify-around items-center text-14 md:text-16">
                    <select onChange={(el) => switcher(el)} value={page}
                    className="bg-transparent cursor-pointer appearance-none shadow-sm  text-black dark:text-white font-medium block w-full h-50px outline-none"
                    >
                        <option value="/dashboard">💥 Nové příběhy</option>
                        <option value="/messages">💬 Zprávy</option>
                        <option value="/my-stories">🎞 Moje příběhy</option>
                        <option value="/my-profile">🙋‍♂️ Můj účet</option>
                        <option value="/logout">🔚 Odhlásit se</option>
                    </select>
                   
                </div>
            </motion.div>
        </>
    )
}