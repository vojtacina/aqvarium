import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession, providers } from 'next-auth/client'
import router from 'next/router'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SelectCity() {


    return (
        <Menu as="div" className="relative inline-block text-left z-10">
            <div>
                <Menu.Button className="inline-flex items-center justify-center w-full rounded-lg px-4 py-2  text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    <span className="whitespace-nowrap">🇨🇿 Celá ČR</span>
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
                    <div className="py-16px">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-1 text-sm'
                                    )}
                                >
                                    Praha
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
                                    Brno
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
                                    Ostrava
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                    
            


                </Menu.Items>
            </Transition>
        </Menu>
    )
}