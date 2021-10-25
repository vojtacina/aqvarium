import { useRouter } from "next/router"
import Layout from "components/Layout"
import { useBubble, useUserDetails } from "lib/Fetchers"
import React, { useEffect, useRef, useState } from "react"
import AppContainer from "components/AppContainer"
import Header from "components/Header/Header"
import InflectionGenerator from "components/InflectionGenerator"
import { useSession } from "next-auth/client"
import Image from 'next/image'
import { motion } from "framer-motion"
import axios from "axios"
import Message from "components/Message"
import AutosizeInput from 'react-input-autosize';
import { useKeyPress } from 'lib/useKeyPress'
import filterText from "lib/TextFilter"


export default function Story() {

    const router = useRouter()
    const { id } = router.query
    const { userId, username } = useUserDetails()

    const { story, isLoading, isError } = useBubble(id)
    const [session, loading] = useSession()
    const [clicked, setClicked] = useState(false)
    const [comment, setComment] = useState("")

    const pressed = useKeyPress("Enter")

    const input = useRef(null)

    useEffect(() => {
        if (pressed && (document.activeElement === input.current)) {
            addComment()
        }
    }, [pressed])

    async function addComment() {
        setClicked(true)

        if (!filterText(comment)) {
            setComment("")
        }



        if (!comment || comment == "") {
            setClicked(false)
            return
        }

        console.log("storyId:", id)

        const response = await axios.post("/api/threads/add", {
            bubbleId: id,
            userId: userId,
            message: comment,
            date: new Date()
        }).then((res) => {
            setComment("")
        }).catch((err) => {
            alert(err.response.data.message)
        }).finally(() => {
            setClicked(false)

        })
    }


    return (
        <Layout title={story ? story?.title : ("Příběh " + id)}>
            <AppContainer>
                <Header />
                <div className="w-full appear md:px-24px md:py-24px">

                    <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg overflow-hidden">
                        <motion.div
                            animate={{ opacity: story ? 1 : 0, y: story ? 0 : 100, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
                            initial={{ opacity: 0, y: 100, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
                            className=" w-full overflow-hidden relative min-h-400px h-90vh">
                            {story &&
                                <Image src={story.image} blurDataURL={story.image} layout="fill" objectFit="cover" placeholder="blur" />
                            }

                        </motion.div>
                        <div className="p-24px bg-white dark:bg-gray-800 dark:text-white w-full md:h-90vh md:pb-0">
                            <div className="w-full flex flex-col pb-16px md:pb-0 h-full max-h-full">
                                <div className="">
                                    <div className={" h-24px " + (story?.user ? "" : " load rounded-lg w-1/3 ")}>
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-purple">{story?.user?.username}</motion.p>
                                    </div>
                                    <div className={" pb-16px " + (story ? "w-full" : " load  h-24px rounded-lg w-1/2 mt-16px ")}>
                                        <h1 className="font-medium text-18 md:text-24">{story?.title}</h1>
                                    </div>

                                </div>
                                <div

                                    className="  w-full flex-grow self-stretch flex-shrink flex flex-col overflow-y-auto">
                                    {(story?.thread.length == 0) &&
                                        <div className="w-full bg-gray-100 dark:bg-gray-900 rounded-lg p-16px my-8px font-medium flex items-center">
                                            <div className="text-24 mr-8px">💬</div>
                                            <div>Okomentuj tento příběh jako první. </div>

                                        </div>
                                    }
                                    {

                                        story?.thread?.map((message) => (
                                            <Message user={message.messageUser} message={message.messageContent} />
                                        ))

                                    }
                                    <div className="p-3px justify-self-end relative md:mb-24px">
                                        <input
                                            ref={input}
                                            id="input"
                                            type="text"
                                            placeholder={clicked ? "Přidávání komentáře ..." : "Okomentuj..."}
                                            required
                                            value={comment}
                                            onChange={(e) =>
                                                setComment(e.target.value)
                                            }
                                            className="mt-1 p-16px pr-100px ring-1 focus:ring-2 ring-gray-200 dark:ring-gray-800 dark:bg-gray-900 focus:ring-purple bg-white focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                                        />
                                        <motion.div
                                            whileHover={{ opacity: 0.8, scale: 1.05 }}
                                            animate={{ opacity: 0.5, scale: 1 }}
                                            initial={false}
                                            onClick={() => addComment()}
                                            className="absolute right-0 top-1px bottom-0 px-16px flex items-center cursor-pointer">
                                            <Image src="/icons/return-svgrepo-com.svg" width={24} height={24} />
                                            <span className="ml-4px uppercase text-12">Odeslat</span>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </AppContainer>
        </Layout>
    )
}