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
import FormField from "components/Inputs/FormField";
import Image from 'next/image'

export default function Dashboard() {

    const { bubbles, isLoading, isError } = useBubbleView()
    const { userId, username, name, password, description, image } = useUserDetails()
    const [session, loading] = useSession()

    const [clicked, setClicked] = useState(false);

    const router = useRouter()

    function save() {
        setClicked(true)
        axios.post("/api/users/edit", formData).then((res) => {
            setClicked(false)
            router.push("/dashboard")
        })
    }

    const [formData, setFormData] = useState({
        name: name,
        password: password,
        description: description,
        username: username,
        image: image,
    })


    return (
        <Layout title="Hlavní nástěnka">
            <AppContainer>
                <Header />


                <div className="w-full appear px-16px">
                    <div className="w-full flex justify-between py-24px items-center">
                        <div>
                            <h1 className="font-medium text-white text-18 md:text-24">Můj účet</h1>
                        </div>
                        <button
                            onClick={() => save()}
                            className={"group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 " + (clicked ? " bg-indigo-600 bg-opacity-20 text-purple " : " bg-indigo-600 hover:bg-indigo-700")}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                            </span>
                            {clicked ? "Ukládání..." : "Uložit"}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 w-full rounded-lg bg-white bg-opacity-10 text-white shadow-lg overflow-hidden mb-24px">

                        <div className="flex items-center justify-center w-full h-full p-24px">
                            <div className="w-200px h-200px rounded-full overflow-hidden relative">
                                <Image src={formData.image ?? "/img/background.jpg"} layout="fill" objectFit="cover" />
                            </div>
                            
                        </div>
                        <div className="p-24px order-1 md:order-2 md:col-span-2">
                            <FormField
                                label="Jméno a příjmení"
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <FormField
                                label="Uživatelské jméno"
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                            
                            <FormField
                                label="Popis profilu"
                                type="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>


                    </div>
                </div>
            </AppContainer>

        </Layout>
    )


}