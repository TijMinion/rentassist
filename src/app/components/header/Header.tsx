'use client';
import { JSX } from 'react';
import Image from "next/image";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {Dialog, DialogPanel} from "@headlessui/react";
import {useState} from "react";



type NavItem = {
    name: string,
    href: string,
    link: boolean,
    pill: boolean
}

const navigation: NavItem[] = [
    { name: 'Features', href: 'features', link: false, pill: false },
    { name: 'Pricing', href: 'pricing', link: false, pill: false },
    { name: 'FAQ', href: 'faq', link: false, pill: false },
    { name: 'Sign in', href: '/account', link: true, pill: false },
    { name: 'Get Started', href: '/account/register', link: true, pill: true },
]

export const Header: () => JSX.Element = (): JSX.Element => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    function scrollToSection(section: string): void {
        const element = document.getElementById(section);
        element?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <div className="mx-auto max-w-7xl">
                <div className="px-6 pt-6 lg:pr-0 lg:pl-8 w-full">
                    <nav aria-label="Global" className="flex items-center justify-between lg:justify-start">
                        <a href="/" className="">
                            <span className="sr-only">RentAssist</span>
                            <Image src="/image/icon/ra-logo.png" alt="Logo Logo" width={200} height={80} />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700 lg:hidden"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                        <div className="hidden lg:ml-12 lg:flex lg:gap-x-14 w-full items-center">
                            { navigation.map((item: NavItem, index: number) => {
                                let lastLink: boolean = false;
                                if ((index + 1) === (navigation.length - 1)) {
                                    lastLink = true;
                                }

                                let classes: string = "text-sm/6 font-semibold text-raBlue hover:text-raGreen cursor-pointer";
                                if (item.pill) {
                                    classes = "rounded-md bg-raGreen px-3.5 py-2.5 text-sm font-semibold font-sans text-white shadow-xs hover:bg-raBlue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-raBlue"
                                }

                                if (item.link) {
                                    return (
                                        <a key={item.name}
                                              href={item.href}
                                              className={ classes + (lastLink ? ' ml-auto' : ''  ) }>
                                            {item.name}
                                        </a>
                                    );
                                }

                                return (
                                    <span key={item.name}
                                          onClick={ () => scrollToSection(item.href) }
                                          className={ "text-sm/6 font-semibold text-raBlue hover:text-raGreen cursor-pointer" + (lastLink ? ' ml-auto' : ''  ) }>
                                        {item.name}
                                    </span>
                                );
                            })}
                        </div>
                    </nav>
                </div>
            </div>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">NokNok</span>
                            <img
                                alt=""
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}