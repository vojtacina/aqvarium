import Image from 'next/image'
import { motion } from "framer-motion"


export default function Bubble({ data, i }) {

    

    return (
        <motion.div
            key={i}  
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1}} 
            whileHover={{  zIndex: 30, y: -3 }}
            whileTap={{ scale: 0.95 }} 
            transition={{ duration: 0.2}}
            className="w-full h-250px md:h-300px load rounded-md shadow-lg p-12px flex items-end relative overflow-hidden cursor-pointer">
            <Image src={"/img/" + data.image} layout="fill" objectFit="cover" />
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-black"></div>
            <div className="bottom-O left-0 right-0 mb-0 mt-auto z-20 text-white">{data.title}</div>
        </motion.div>
    )
}