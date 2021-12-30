import AddBubble from "components/AddBubble";
import AppContainer from "components/AppContainer";
import Bubble from "components/Bubble";
import Header from "components/Header/Header";
import InflectionGenerator from "components/InflectionGenerator";
import Layout from "components/Layout";
import Loading from "components/Loading";
import SelectCity from "components/SelectCity";
import { useBubbleView, useUserDetails } from "lib/Fetchers";
import { session, useSession } from "next-auth/client";
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useS3Upload } from "next-s3-upload";

export default function Dashboard() {

    const { bubbles, isLoading, isError } = useBubbleView()
    const { userId, username } = useUserDetails()
    const [session, loading] = useSession()
    const [clicked, setClicked] = useState(false)
    const router = useRouter()

    const [title, setTitle] = useState("" as any)
    const [city, setCity] = useState("" as any)
    const [file, setFile] = useState(null as any)

    let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

    console.log("id:", userId)

    useEffect(() => {
        console.log(title, city, file)
    })

    useEffect(() => {
        if (!session && !loading) {
            router.push("/login")
        }
    }, [loading])

    async function send() {
        if (!clicked) {
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

            setClicked(true)

            const { url } = await uploadToS3(file)

            const response = await axios.post("/api/bubbles/add", {
                userId: userId,
                title: title,
                image: url,
                city: city,
            }).then((res) => {
                alert("Příběh byl přidán do hlavního feedu! 😎")
            }).finally(() => {
                router.push("/dashboard")
                setClicked(false)
            })
        }

    }

    return (
        <Layout title="Hlavní nástěnka">
            <AppContainer>
                <Header />


                <div className="w-full appear px-16px">
                    <div className="w-full flex justify-between py-24px items-center">
                        <div>
                            <h1 className="font-medium dark:text-white text-18 md:text-24">Přidat příběh</h1>
                        </div>
                        <button
                            onClick={() => send()}
                            className={"group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 " + (clicked ? " bg-gray-200 text-gray-800 " : " bg-indigo-600 hover:bg-indigo-700")}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                            </span>
                            {clicked ? "Ověřování..." : "Nahrát"}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 w-full rounded-lg bg-white dark:bg-gray-800 dark:text-white shadow overflow-hidden mb-24px">


                        <div className="p-24px order-1 md:order-2 md:col-span-2">

                            <div className="my-8px">
                                <label htmlFor="first-name" className="block text-sm font-medium">
                                    Obrázek
                                </label>
                                <input
                                    type="file"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    required
                                    onChange={(e) => 
                                            setFile(e.target.files[0])
}
                                    className="mt-1 p-8px ring-1 focus:ring-2 ring-gray-200 focus:ring-purple bg-white dark:bg-black dark:ring-gray-900 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="my-8px">
                                <label htmlFor="first-name" className="block text-sm font-medium">
                                    Text příběhu
                                </label>
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    required
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mt-1 p-8px ring-1 focus:ring-2 ring-gray-200 focus:ring-purple focus:outline-none dark:bg-black dark:ring-gray-900 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                                    className="mt-1 p-8px ring-1 focus:ring-2 ring-gray-200 focus:ring-purple dark:bg-black dark:ring-gray-900 bg-white focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />

                            </div>
                        </div>
                        <div className="order-2 md:order-1 relative h-full w-full">
                            {file &&
                            <div className="w-full h-full">
                                <img src={URL.createObjectURL(file)} width={"100%"} height="100%" className="object-cover min-h-full" />
                                </div>
                            }
                            <div className="absolute p-24px text-white left-0 right-0 bottom-0 text-24 block">
                                <p>{title}</p>
                                <p className="text-16 opacity-80">{city}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </AppContainer>

        </Layout>
    )


}