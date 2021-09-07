import Image from 'next/image'

export default function Loading() {

    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
            <img src="/img/spinner.svg" />
        </div>
    )
}