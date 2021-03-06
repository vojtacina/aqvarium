import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession, providers } from 'next-auth/client'
import router from 'next/router'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function UserButton() {

    const [session, loading] = useSession()

    console.log(session)

    async function logout() {
        const response = await signOut({redirect: false})
        if(response) {
            router.push("/")
        }
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex items-center justify-center w-full rounded-lg px-4 py-2  text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    {session.user.name}&nbsp;<span className="px-6px bg-red-500 rounded-full text-white font-semibold">1</span>
                    <ChevronDownIcon className="-mr-1 ml-2 h-20px w-20px" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white  divide-y divide-gray-100 focus:outline-none">
                    <div className="pb-8px pt-16px">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-1 text-sm'
                                    )}
                                >
                                    <div className="flex items-center gap-x-8px">
                                        <span>Zpr??vy</span>
                                        <span className="px-6px bg-red-500 rounded-full text-white font-semibold">1</span>
                                    </div>
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-1 text-sm'
                                    )}
                                >
                                    Moje p????b??hy
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="py-8px">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-1 text-sm'
                                    )}
                                >
                                    M??j profil
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-1 text-sm'
                                    )}
                                >
                                    Nastaven??
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="pt-8px pb-16px cursor-pointer">
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    onClick={() => logout()}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-1 text-sm'
                                    )}
                                >
                                    Odhl??sit se
                                </div>
                            )}
                        </Menu.Item>

                    </div>


                </Menu.Items>
            </Transition>
        </Menu>
    )
}