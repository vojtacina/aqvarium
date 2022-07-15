
import { createPortal } from 'react-dom'
import { useState, useEffect, useContext, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({ children, opened, setClose }) {

    const [visibleOnLoad, setVisibleOnLoad] = useState(false)

    useEffect(() => {
        if (opened == true) {
            setVisibleOnLoad(true)
        }

    }, [opened])

    useEffect(() => {
        if (opened) {
            document.body.style.overflow = 'hidden';
            document.body.style.maxHeight = '-webkit-fill-available;';
        }
        else {
            document.body.style.overflow = 'visible';
            document.body.style.maxHeight = 'unset';
        }

    }, [opened])



    if (typeof window !== 'undefined') {
        const modalView = document.getElementById("modal")

        if (modalView) {
            return createPortal(
                <AnimatePresence>
                    {opened &&
                        <motion.div
                            exit={{ opacity: 0 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{zIndex: 100}}
                            className={" fixed top-0 left-0 right-0 bg-black bg-opacity-40 flex justify-center items-center "}>
                            <motion.div
                                exit={{ opacity: 0, scale: 0.9 }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className=" overflow-y-hidden max-h-screen overflow-x-hidden hide-scroll pb-0 md:pb-48px "
                            >
                                {children}
                            </motion.div>

                        </motion.div>
                    }
                </AnimatePresence>



                , modalView
            )
        }
        else {
            return null as any
        }

    }
    else {
        return null as any
    }


}