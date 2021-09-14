import AddBubble from "components/AddBubble";
import Bubble from "components/Bubble";
import Header from "components/Header/Header";
import InflectionGenerator from "components/InflectionGenerator";
import Layout from "components/Layout";
import Loading from "components/Loading";
import { useBubbleView } from "lib/Fetchers";
import { session, useSession } from "next-auth/client";
import { useRouter } from 'next/router'
import React, { useEffect } from "react";

export default function Dashboard() {

    const { bubbles, isLoading, isError } = useBubbleView()
    const [session, loading] = useSession()
    const router = useRouter()

    useEffect(() => {
        if (!session) {
            router.push("/login")
        }
    }, [loading])

   
        return (
            <Layout title="Hlavní nástěnka">
                    <Header />
    
                        
                    <div className="w-full appear px-24px">
                        <div className="py-16px bg-white shadow-md rounded-md px-6px my-6px"><span>👋 Vítej zpět, </span>
                        <span> { session?.user?.name ? InflectionGenerator(session.user.name, 2) : <span className="w-50px h-21px load">neznámý</span>}! </span></div>
                        <div className="grid sm:grid-cols-3 gap-x-12px gap-y-12px grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 mt-20px">
                            <AddBubble />
                            {bubbles?.map((bubble, i) =>
                                <Bubble data={bubble} i={i} />
                            )}
                            {isLoading &&
                                <Loading />
                            }
                        </div>
                    </div>
            </Layout>
        )

    
}