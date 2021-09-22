import AddBubble from "components/AddBubble";
import AppContainer from "components/AppContainer";
import Bubble from "components/Bubble";
import BubblePlaceholder from "components/BubblePlaceholder";
import Header from "components/Header/Header";
import InflectionGenerator from "components/InflectionGenerator";
import Layout from "components/Layout";
import Loading from "components/Loading";
import SelectCity from "components/SelectCity";
import { useBubbleView } from "lib/Fetchers";
import { session, useSession } from "next-auth/client";
import { useRouter } from 'next/router'
import React, { useEffect } from "react";

export default function Dashboard() {

    const { bubbles, isLoading, isError } = useBubbleView()
    const [session, loading] = useSession()
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


                <div className="w-full appear px-24px md:py-24px">
                    <div className=" py-16px bg-white rounded-lg px-6px "><span>👋 Vítej zpět, </span>
                        <span> {session?.user?.name ? InflectionGenerator(session.user.name, 2) : <span className="w-50px h-21px load">neznámý</span>}! </span></div>
                    <div className="w-full flex justify-between py-16px items-center">
                        <div>
                            <h1 className="font-medium text-18 md:text-24 whitespace-nowrap">Nejnovější příběhy</h1>
                        </div>

                    </div>
                    <div className="grid sm:grid-cols-3 gap-x-12px gap-y-12px grid-cols-2 md:grid-cols-4 xl:grid-cols-5 pb-30px">
                        <AddBubble />
                        {bubbles?.map((bubble, i) =>
                            <Bubble data={bubble} i={i} />
                        )}
                        {isLoading &&
                        <>
                        <BubblePlaceholder />
                        <BubblePlaceholder />
                        <BubblePlaceholder />
                        <BubblePlaceholder />
                        </>
                        
                        }
                    </div>
                </div>
            </AppContainer>

        </Layout>
    )


}