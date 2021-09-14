import Image from 'next/image'
import { motion } from "framer-motion"
import { PlusIcon } from '@heroicons/react/solid'

export default function AddBubble() {

    

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1}} 
            whileHover={{  zIndex: 30, y: -3 }}
            whileTap={{ scale: 0.95 }} 
            transition={{ duration: 0.2}}
            className="w-full h-250px md:h-300px load border-purple border rounded-md  p-12px flex items-end relative cursor-pointer">
            <div className="bottom-O left-0 right-0 top-0 m-auto z-20 text-purple">
                <div className="flex flex-col gap-16px items-center">
                <div><PlusIcon className=" w-32px h-32px" aria-hidden="true" /></div>
                <div className="text-center">Přidat nový příběh</div>
                </div>
                
            </div>
        </motion.div>
    )
}