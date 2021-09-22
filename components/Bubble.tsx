import Image from 'next/image'
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer";
import Link from 'next/link'


export default function Bubble({ data, i }) {

    const [ref, inView] = useInView();

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
            </motion.div>
        </Link>
    )
}