import Image from 'next/image'
import Input from '../../components/Inputs/Input'
import Button from '../../components/Inputs/Button'
import { getCsrfToken } from 'next-auth/client'

import { signIn, signOut, useSession, providers } from 'next-auth/client'

import { useState, useEffect } from 'react'

export default function Login({ providers }) {

    const [session, loading] = useSession()
    const [rendProviders, setRendProviders] = useState([])
    const [csrfToken, setCsrfToken] = useState(null as any)

    async function getProviders() {
        let data = await providers()
        setCsrfToken(await getCsrfToken())
        setRendProviders(data)
    }

    useEffect(() => {
        getProviders()
    }, [])

    return (
        <div className="absolute top-0 bottom-0 left-0 right-0  flex justify-center items-center">
            <div className="w-250px md:w-300px appear">
                <div className="w-250px md:w-300px h-120px relative select-none">
                    <Image src="/img/logo_long.svg" layout="fill" objectFit="contain" priority={true} className="select-none" />
                </div>
                <div className="w-250px md:w-300px">
                    <div>

                        <form method="post" action="/api/auth/callback/credentials">
                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                            <label>
                                Email
                                <input className="text-black" name="email" type="text" />
                            </label>
                            <label>
                                Password
                                <input className="text-black" name="password" type="text" />
                            </label>
                            <button type="submit">Sign in</button>
                        </form>

                    </div>
                    {(rendProviders != null && rendProviders != []) &&
                        (

                            Object.values(rendProviders).map(provider => (
                                <div key={provider.name} onClick={() => signIn(provider.id)}>
                                    <Button value={"Přihlásit se " + provider.name + "em"} />
                                </div>
                            ))
                        )
                    }

                </div>


            </div>
        </div>
    )
}