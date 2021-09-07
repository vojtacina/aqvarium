import InflectionGenerator from '../components/InflectionGenerator'
import { useState, useEffect } from 'react'
import Button from '../components/Inputs/Button'
import Input from '../components/Inputs/Input'
import { motion } from "framer-motion"
import prisma from 'lib/clients/prisma'
import useSWR from 'swr'
import axios from 'axios'
import { useSession, getSession } from 'next-auth/client'


function WelcPage() {

    const [session, setSession] = useState(null as any)

    useEffect(() => {
        loadSession()
    }, [])

    async function loadSession() {
        const data = await getSession()
        setSession(data)
    }

    return (
        <div className="w-full mt-120px   text-center flex-col flex items-center appear">
            <motion.div
                initial={{ opacity: 0, scale: 4, rotate: 60 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.0 }}
                className="text-36 select-none">🎉</motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}

                className="text-36 px-24px font-medium"><span>Vítej mezi námi{(session?.user.name) && ","}</span>{(session?.user.name) ? <span> {InflectionGenerator(session?.user?.name, 2)}! </span> : <span className="ml-12px bg-gray-800 text-transparent w-100px h-16px rounded-lg">Načítání</span>}</motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}

                className=" px-30px max-w-400px md:w-1/3 mt-12px  font-light">Děkujeme Ti za přidání se do Aqvaria. Už brzy budeš moci vytvářet vlastní místnosti i přispívat do jiných.</motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.3 }}

                className=" px-30px max-w-400px md:w-1/3 mt-12px  font-light">Nejprve od tebe budeme potřebovat pár drobností, aby tvůj profil byl kompletní. <span className="font-medium">Pomůžeš nám s tím?</span> 🙏</motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}

                className="mt-30px">
                <Button value="Pokračovat" />
            </motion.div>
        </div>
    )
}

function FillName({ writtenName, setWrittenName, setPage, session }) {

    const [loading, setLoading] = useState(false)

    async function saveName() {
        setLoading(true)
        axios.post('/api/users/edit', {
            name: writtenName,
          })
          .then(function (response) {
            console.log(response);
            setLoading(false)
            setPage(1)
            getSession()
          })
          .catch(function (error) {
            console.log(error);
            alert("chyba")
            setLoading(false)
          });
    }

    return (
        <div className="w-full mt-120px   text-center flex-col flex items-center appear">
            <motion.div
                initial={{ opacity: 0, scale: 4, rotate: 60 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                exit={{ opacity: 0 }}
                className="text-36 select-none">👀</motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                exit={{ opacity: 0 }}
                className="text-36 px-24px font-medium"><span>Jak se vlastně jmenuješ?</span></motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1 }}
                exit={{ opacity: 0 }}
                className=" px-30px max-w-400px md:w-1/3 mt-12px  font-light">U nás v Aqvariu si všichni tykáme. Prozraď nám prosím své celé jméno. Křestní jméno napiš tak, jak chceš, aby Tě ostatní oslovovali.</motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.2 }}
                exit={{ opacity: 0 }}
                className=" px-30px w-full mx-24px md:w-1/3 mt-12px  font-light">
                <Input type="text" value={writtenName} setValue={(toThis: string) => setWrittenName(toThis)} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.5 }}

                className="mt-30px">
                <Button value={(loading) ? "Ukládání..." : "Pokračovat"} onClick={() => saveName()} />
            </motion.div>
        </div>
    )
}


export default function Welcome({ session }) {

    const [page, setPage] = useState(0)
    const [writtenName, setWrittenName] = useState("")

    useEffect(() => {
        if (session.user.name) {
            setPage(1)
        }
    }, [])



    return (
        <div className="mb-100px">
            {(page == 0) && <FillName session={session} writtenName={writtenName} setWrittenName={setWrittenName} setPage={setPage} />}
            {(page == 1) && <WelcPage />}
        </div>
    )
}