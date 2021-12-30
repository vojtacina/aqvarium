import AddBubble from "components/AddBubble";
import AppContainer from "components/AppContainer";
import Bubble from "components/Bubble";
import BubblePlaceholder from "components/BubblePlaceholder";
import Header from "components/Header/Header";
import InflectionGenerator from "components/InflectionGenerator";
import Layout from "components/Layout";
import Loading from "components/Loading";
import SelectCity from "components/SelectCity";
import { useBubbleView, useUserDetails } from "lib/Fetchers";
import { session, useSession } from "next-auth/client";
import { useRouter } from 'next/router'
import React, { useEffect } from "react";
import Head from 'next/head'

export default function Dashboard() {

    const { bubbles, isLoading, isError } = useBubbleView()
    const { userId, username, name, password, description, image } = useUserDetails()
    const [session, loading] = useSession()
    const router = useRouter()

    useEffect(() => {
        if (!session && !loading) {
            router.push("/login")
        }
    }, [loading])


    return (
        <Layout title="Hlavní nástěnka">
            <Head>
                
           

            </Head>
            <AppContainer>
                <Header />


                <div className="w-full appear px-16px md:py-24px dark:text-white">
                    {/* <div className=" py-16px bg-white border border-gray-200 text-black dark:bg-gray-800 dark:text-white rounded-lg px-6px "><span>👋 Ahoj, </span>
                        <span> {name ? InflectionGenerator(name, 2) : <span className="w-50px h-21px load">neznámý</span>}! </span></div> */}
                    <div className="w-full flex justify-between pb-16px items-center">
                        <div>
                            <h1 className="font-medium text-18 md:text-24 whitespace-nowrap">Nejnovější příběhy</h1>
                        </div>

                    </div>
                    <div className="grid sm:grid-cols-3 gap-8px lg:gap-12px grid-cols-2 md:grid-cols-4 xl:grid-cols-5 pb-30px">
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

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      // extends React's HTMLAttributes
      media?: string;
    }
  }