import Image from 'next/image'
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer";
import Link from 'next/link'


export default function Bubble({ data, i }) {

    const [ref, inView] = useInView();

    function messages(messages) {
        switch(messages) {
            case 0: return "Odpověz jako první"
            case 1: return "1 odpověď"
            case 2: case 3: case 4: return data.messages + " odpovědi"
            default: return data.messages + " odpovědí"
        }
    }

    return (
        <Link href={"/story/" + data.id}>
            <motion.div
                ref={ref}
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: (inView ? 1 : 0), scale: (inView ? 1 : 0.9) }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full h-250px md:h-300px rounded-lg shadow-lg p-12px flex items-end relative overflow-hidden cursor-pointer">
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
                <div className={"absolute top-6px right-6px p-8px text-white rounded-lg opacity-80 text-12 " + ((data.messages == 0) ? " bg-blue-900 " : " bg-black") }>
                    {messages(data.messages)}
                </div>
            </motion.div>
        </Link>
    )
}