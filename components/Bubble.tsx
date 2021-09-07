import Image from 'next/image'
import { motion } from "framer-motion"


export default function Bubble({ data, i }) {

    

    return (
        <motion.div
            key={i}  
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1}} 
            whileHover={{ scale: 1.05, boxShadow: "0px 2px 111px 12px rgba(0,0,0,0.36)", zIndex: 30, rotate: 1, y: -3 }}
            whileTap={{ scale: 0.95 }} 
            transition={{ duration: 0.2}}
            className="w-full h-250px load rounded-lg p-12px flex items-end relative overflow-hidden cursor-pointer">
            <Image src={"/img/" + data.image} layout="fill" objectFit="cover" />
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-black"></div>
            <div className="bottom-O left-0 right-0 mb-0 mt-auto z-20">{data.title}</div>
        </motion.div>
    )
}