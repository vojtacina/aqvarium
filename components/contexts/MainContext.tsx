import { createContext, Dispatch, ReactElement, SetStateAction, useState } from "react"
import React from 'react'
import Modal from "components/Modal";

const initialState = {
    modal: null as ReactElement | null,
    setModal: {} as any,
}

export const MainContext = createContext(initialState);

export default function BookingContextProvider(props: { children: any }) {

    const [modal, setModal] = useState(initialState.modal);

    return (
        <MainContext.Provider
            value={{
                modal: modal,
                setModal: setModal
            }} >
            {props.children}
            <Modal opened={modal ? true : false} setClose={() => setModal(null)}>
                {modal}
            </Modal>
        </MainContext.Provider>
    )
}