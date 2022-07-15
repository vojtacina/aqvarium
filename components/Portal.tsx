
import { createPortal } from 'react-dom'

export default function Portal({ children }) {


    if (typeof window !== 'undefined') {
        const portalView = document.getElementById("modal")



        if (portalView) {
            return createPortal(
                <>
                    {children}
                </>




                , portalView
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