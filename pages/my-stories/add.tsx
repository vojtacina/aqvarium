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

export default function Dashboard() {

    const { bubbles, isLoading, isError } = useBubbleView()
    const [session, loading] = useSession()
    const [clicked, setClicked] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (!session && !loading) {
            router.push("/login")
        }
    }, [loading])


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
                                className="mt-1 p-8px ring-1 focus:ring-2 ring-gray-200 focus:ring-purple focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="my-8px">
                            <label htmlFor="first-name" className="block text-sm font-medium">
                                Lokalita
                            </label>
                            <select
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="mt-1 p-8px ring-1 focus:ring-2 ring-gray-200 focus:ring-purple bg-white focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            >
                                <option>🇨🇿 Celá ČR</option>
                                <option>Brno</option>
                                <option>Šumperk</option>
                            </select>
                        </div>

                    </div>
                </div>
            </AppContainer>

        </Layout>
    )


}