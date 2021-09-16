import AddBubble from "components/AddBubble";
import AppContainer from "components/AppContainer";
import Bubble from "components/Bubble";
import Header from "components/Header/Header";
import InflectionGenerator from "components/InflectionGenerator";
import Layout from "components/Layout";
import Loading from "components/Loading";
import SelectCity from "components/SelectCity";
import { useBubbleView } from "lib/Fetchers";
import { session, useSession } from "next-auth/client";
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";
import axios from 'axios'

export default function Dashboard() {

    const { bubbles, isLoading, isError } = useBubbleView()
    const [session, loading] = useSession()
    const [clicked, setClicked] = useState(false)
    const router = useRouter()

    const [title, setTitle] = useState("" as any)
    const [city, setCity] = useState("" as any)
    const [file, setFile] = useState(null as any)

    useEffect(() => {
        console.log(title, city, file)
    })

    useEffect(() => {
        if (!session && !loading) {
            router.push("/login")
        }
    }, [loading])

    async function send() {
        if (!title || title == "") {
            alert("Je potřeba vyplnit popis")
            return
        }
        if (title.length > 100) {
            alert("Popis je příliš dlouhý")
            return
        }
        if (!file) {
            alert("Příběh musí obsahovat obrázek")
            return
        }
        if (file?.type != "image/jpeg") {
            alert("Soubor musí být obrázek")
            return
        }

        const response = await axios.post("/api/bubbles/add", {
            userId: 3,
            title: title,
            image: "https://picsum.photos/200/300",
            city: city,
        }).finally(() => {
            router.push("/dashboard")
        })
    }

    return (
        <Layout title="Hlavní nástěnka">
            <AppContainer>
                <Header />


                <div className="w-full appear px-24px">
                    <div className="w-full flex justify-between py-16px items-center">
                        <div>
                            <h1 className="font-medium text-18 md:text-24">Přidat příběh</h1>
                        </div>
                        <button
                            onClick={() => send()}
                            className={"group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 " + (clicked ? " bg-gray-200 text-gray-800 " : " bg-indigo-600 hover:bg-indigo-700")}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                            </span>
                            {clicked ? "Ověřování..." : "Nahrát"}
                        </button>
                    </div>
                    <div className="w-full rounded-lg bg-white shadow-lg p-24px">


                        <div className="my-8px">
                            <label htmlFor="first-name" className="block text-sm font-medium">
                                Text příběhu
                            </label>
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 p-8px ring-1 focus:ring-2 ring-gray-200 focus:ring-purple focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="my-8px">
                            <label htmlFor="first-name" className="block text-sm font-medium">
                                Město
                            </label>
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                onChange={(e) => setCity(e.target.value)}
                                className="mt-1 p-8px ring-1 focus:ring-2 ring-gray-200 focus:ring-purple bg-white focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />

                        </div>
                        <div className="my-8px">
                            <label htmlFor="first-name" className="block text-sm font-medium">
                                Obrázek
                            </label>
                            <input
                                type="file"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="mt-1 p-8px ring-1 focus:ring-2 ring-gray-200 focus:ring-purple bg-white focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />

                        </div>
                        <div>
                            {file &&
                                <img src={URL.createObjectURL(file)} width={100} height={300} />
                            }
                        </div>

                    </div>
                </div>
            </AppContainer>

        </Layout>
    )


}