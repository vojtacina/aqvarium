

interface Props {
    className?: string,
    value?: string,
    label?: string,
    placeholder?: string,
    setValue: any,
    type: string
}

export default function Input({ className, value, label, placeholder, setValue, type }: Props) {


    return (
        <div className={(className && className) + " w-full rounded-xl h-60px bg-gray-800 bg-opacity-50 hover:bg-opacity-50 font-semibold focus:ring-2 focus:ring-purple hover:bg-gray-700 flex flex-col items-left justify-center px-24px"}>
            {label &&
                <div className="text-10 -mb-3px text-gray-500">{label}</div>
            }
            <input onChange={(e) => setValue(e.target.value)} value={value} placeholder={placeholder} type={type} className="bg-transparent focus:outline-none border-none text-24 text-center" ></input>
        </div>
    )
}