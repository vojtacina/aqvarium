import Image from 'next/image'
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer";
import Link from 'next/link'
import Portal from './Portal';
import BubbleModal from './Bubble/BubbleModal';
import { useContext, useState } from 'react';
import Modal from './Modal';
import { MainContext } from './contexts/MainContext';


export default function Bubble({ data, i }) {

    const [ref, inView] = useInView();
    
    const {setModal} = useContext(MainContext)

    function messages(messages) {
        switch (messages) {
            case 0: return "Odpověz jako první"
            case 1: return "1 odpověď"
            case 2: case 3: case 4: return data.messages + " odpovědi"
            default: return data.messages + " odpovědí"
        }
    }

    return (
        <motion.div
            onClick={() => setModal(<BubbleModal id={data.id} close={() => setModal(null)} />)}
            ref={ref}
            key={i}
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full h-250px md:h-300px rounded-xl shadow-lg p-12px flex items-end relative overflow-hidden cursor-pointer">
            <Image src={data.image} blurDataURL={data.image} layout="fill" objectFit="cover" placeholder="blur" />
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-black"></div>
            <div className="bottom-O left-0 right-0 mb-0 mt-auto z-20 text-white">
                <div className="text-12 opacity-70">
                    {data?.user?.username}
                </div>
                <div>
                    {data.title}
                </div>
            </div>
            <div className={"absolute top-6px right-6px p-8px text-white rounded-lg opacity-80 text-12 " + ((data.messages == 0) ? " bg-blue-900 " : " bg-black")}>
                {messages(data.messages)}
            </div>
        </motion.div>
    )
}