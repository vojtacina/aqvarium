

export default function FormField(props) {

    const {type, name, value, label, id, autoComplete, onChange, ...rest} = props


    return (
        <div className="my-8px">
            <label htmlFor={name} className="block text-sm font-medium">
                {label}
            </label>
            <input
                type={type}
                name={name}
                id={id}
                autoComplete={autoComplete}
                value={value}
                onChange={onChange}
                className="mt-1 p-8px ring-1 focus:ring-2 ring-gray-200 focus:ring-purple dark:bg-black dark:ring-gray-900 bg-white focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />

        </div>
    )
}