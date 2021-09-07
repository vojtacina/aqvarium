import { motion } from "framer-motion"

interface Props {
    className?: string,
    value: string,
    action?: any
    i?: any
    onClick?: any
}

export default function Button({ className, value, action, i, onClick }: Props) {


    return (
        <motion.div
        key={i}  
        onClick={onClick}
            whileHover={{ scale: 1.05, zIndex: 30 }}
            whileTap={{ scale: 0.95 }} 
            transition={{ duration: 0.3}}
        className={(className && className) + " w-full cursor-pointer select-none rounded-xl h-45px bg-purple hover:bg-opacity-90 border border-purple flex flex-col items-center justify-center font-medium text-white px-20px"}>
            {value}
        </motion.div>
    )
}