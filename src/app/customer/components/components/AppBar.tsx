"use client";
import { useState, useEffect } from "react";
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react';
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
    UserIcon
} from '@heroicons/react/24/outline'
import {ChevronDownIcon, MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import { useSession, signOut } from "next-auth/react";
import { delete_cookie, read_cookie } from "sfcookies";
import { useRouter } from "next/navigation";

const userNavigation = [
    { name: 'Your profile', href: '#' },
]

function getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const AppBar = (props:any) => {
    const session = useSession();
    console.log(session);
    const [userImage, setUserImage] = useState<string>();
    const [userName, setUserName] = useState<string>();
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect( () => {
        console.log(session)
        if (session?.status === "authenticated") {
            let image = session?.data?.user?.image ?? undefined;
            setUserImage( image );
            let name = session?.data?.user?.name ?? 'Unknown';
            setUserName( name );
            if (session?.data?.user) {
                setUser(session.data.user);
            }
        }
    }, [session] );

    async function handleLogout() {
        try {
            const hostUrl: string = getCookie('host_url');
            const token: string = getCookie('authToken');
            const uId: string = getCookie('u_id');
            let url: string = hostUrl +  "customer/logout/logout";
            if (url.includes('local')) {
                if (url.includes('?')) {
                    url += '&XDEBUG_SESSION_START=PHPSTORM';
                } else {
                    url += '?XDEBUG_SESSION_START=PHPSTORM';
                }
            }
            await signOut({ redirect: false })
                .then((res) => {
                    const id: string = uId;
                    const request: Request = new Request(url, {
                        method: "POST",
                        body: JSON.stringify({ id: id }),
                        headers: {
                            "Content-Type": "application/json",
                            'token':  token,
                            'NokNok': 'front'
                        },
                    });
                    fetch(request)
                        .then( async (response: Response) => {
                            delete_cookie('authToken');
                            delete_cookie('host_url');
                            delete_cookie('u_id');
                            router.push('/account');
                        } )

                })

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-[#e7edf3] px-4 sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" onClick={() => props.setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
            </button>

            {/* Separator */}
            <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">

                <div className="flex items-center gap-x-4 lg:gap-x-6 w-full">
                    <form action="#" method="GET" className="grid flex-1 grid-cols-1">
                        <input
                            name="search"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm/6"
                        />
                        <MagnifyingGlassIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
                        />
                    </form>
                    <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">View notifications</span>
                        <BellIcon aria-hidden="true" className="size-6" />
                    </button>

                    {/* Separator */}
                    <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative">
                        <MenuButton className="relative flex items-center cursor-pointer">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <div className="">
                                { (userImage === undefined) &&
                                    <UserIcon />
                                }
                                { (userImage !== undefined) &&
                                    <img
                                        alt=""
                                        src={ userImage }
                                        className="size-8 rounded-full bg-gray-50"
                                    />
                                }
                            </div>


                            {/*<span className="hidden lg:flex lg:items-center">*/}
                            {/*  <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-900">*/}
                            {/*    { userName }*/}
                            {/*  </span>*/}
                            {/*  <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400" />*/}
                            {/*</span>*/}
                        </MenuButton>
                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                            {userNavigation.map((item) => (
                                <MenuItem key={item.name}>
                                    <a
                                        href={item.href}
                                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                    >
                                        {item.name}
                                    </a>
                                </MenuItem>
                            ))}
                            <MenuItem >
                                <span
                                    onClick={ handleLogout }
                                    className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden cursor-pointer"
                                >
                                    { "Sign Out" }
                                </span>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </div>
    );
}