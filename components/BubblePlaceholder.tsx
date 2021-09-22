import Image from 'next/image'
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer";


export default function BubblePlaceholder({}) {

    const [ref, inView] = useInView();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: (inView ? 1 : 0), scale: (inView ? 1 : 0.9) }}
            transition={{ duration: 0.2 }}
            className="w-full h-250px md:h-300px load rounded-lg p-12px flex items-end relative overflow-hidden cursor-pointer">
        </motion.div>
    )
}