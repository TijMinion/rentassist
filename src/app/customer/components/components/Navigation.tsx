"use client";
import { useState, useEffect, JSX } from "react";
import './styles/navigation.scss';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSession, signOut } from "next-auth/react";
import { delete_cookie, read_cookie } from "sfcookies";
import { useRouter } from "next/navigation";
import { LightDarkModeToggle } from "@/app/customer/dashboard/components/components/tiles/components/LightDarkModeToggle";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type NavItem = {
    name: string,
    href: string,
    icon: string,
    count?: string,
    current: boolean,
    base_url?: string
}

const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Settings', href: '#' },
]
const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/customer/dashboard', icon: 'dashboard', count: '5', current: true },
    { name: 'Properties', href: '/customer/properties', icon: 'postbox', current: false, base_url: 'customer/audit' },
    { name: 'Reminders', href: '/customer/rents', icon: 'scheduler', count: '12', current: false },
    { name: 'Payments', href: '/customer/payments', icon: 'scheduler', count: '12', current: false },
    { name: 'Settings', href: '/customer/settings', icon: 'users', count: '20+', current: false },
    // { name: 'Forms', href: '/customer/forms', icon: 'form', current: false },
    // { name: 'Files', href: '/customer/files', icon: 'file', current: false },
    // { name: 'Dots', href: '/customer/dots', icon: 'three-dots', current: false },
]
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

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


export const Navigation: () => JSX.Element = (): JSX.Element => {
    const [activeTab, setActiveTab] = useState<string>('');
    const session: any = useSession();
    const [userImage, setUserImage] = useState<string>();
    const [userName, setUserName] = useState<string>();
    const [user, setUser] = useState<any>(null);
    const router: AppRouterInstance = useRouter();


    useEffect( () => {
        const locations: string[] = [
            'customer/profile'
        ];
        for (const nav of navigation) {
            locations.push(nav.href);
        }

        const currentPageUrl = window?.location?.href;
        for (const location of locations) {
            if (currentPageUrl.includes(location)) {
                setActiveTab(location);
                break;
            }
        }

    }, [window?.location] );

    useEffect( (): void => {
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
            // TODO - move this to a api/ route logout
            const hostUrl: string|undefined = process.env.HOST_URL;
            const token: string = getCookie('authToken');
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
                    const id: string = session?.data?.user?.id;
                    const request: Request = new Request(url, {
                        method: "POST",
                        body: JSON.stringify({ id: id }),
                        headers: {
                            "Content-Type": "application/json",
                            'token':  token,
                            'RentAssist': 'front'
                        },
                    });
                    fetch(request)
                        .then( async (response: Response) => {
                            delete_cookie('authToken');
                            router.push('/');
                        } )

                })

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8 py-1">
            <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                    <div className="shrink-0">
                        <img
                            alt="Your Company"
                            src="/image/icon/ra-logo-white-assist.png"
                            className="w-50 h-auto dark:hidden"
                        />
                        <img
                            alt="Your Company"
                            src="/image/icon/ra-logo-white.png"
                            className="w-50 h-auto not-dark:hidden"
                        />
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            { navigation.map((item: NavItem) => {
                                let current: boolean = false;
                                if (window?.location.href.includes(item.href)) {
                                    current = true;
                                }

                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={ classNames(
                                            current
                                                ? 'bg-raBlue/40 text-white dark:bg-raGreen/40'
                                                : 'text-white hover:bg-raBlue/75 dark:hover:bg-raGreen/75',
                                            'rounded-md px-3 py-2 text-xl font-medium',
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                        <button
                            type="button"
                            className="relative rounded-full p-1 text-indigo-200 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-white"
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Toggle Light or Dark Mode</span>
                            <LightDarkModeToggle />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <MenuButton className="relative flex max-w-xs items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                { (userImage === undefined) &&
                                    <UserIcon className="size-9 fill-white border-white" />
                                }
                                { (userImage !== undefined) &&
                                    <img
                                        alt=""
                                        src={ userImage }
                                        className="size-9 rounded-full outline -outline-offset-1 outline-white/10"
                                    />
                                }

                            </MenuButton>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
                            >
                                {userNavigation.map((item) => (
                                    <MenuItem key={item.name}>
                                        <a
                                            href={item.href}
                                            className="block
                                            px-4
                                            py-2
                                            text-xl
                                            text-raBlue
                                            data-focus:bg-gray-100
                                            data-focus:outline-hidden
                                            dark:text-gray-200
                                            dark:data-focus:bg-white/5"
                                        >
                                            {item.name}
                                        </a>
                                    </MenuItem>
                                ))}
                                <MenuItem >
                                    <span
                                        onClick={ handleLogout }
                                        className="block
                                        px-4
                                        py-2
                                        text-xl
                                        text-raBlue/80
                                        data-focus:bg-gray-100
                                        data-focus:outline-hidden
                                        dark:text-gray-200
                                        dark:data-focus:bg-white/5

                                        "
                                    >
                                        { "Sign Out" }
                                    </span>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500/75 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-white dark:bg-indigo-800 dark:hover:bg-indigo-700/75">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                        <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                    </DisclosureButton>
                </div>
            </div>
        </div>
    );

    // return (
    //     <>
    //         {/* Static sidebar for desktop */}
    //         <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[116px] lg:flex-col">
    //             <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white pb-4 w-[116px] shadow-md">
    //                 <div className="flex items-center flex-col">
    //                     <img
    //                         alt="Nok Nok Ltd"
    //                         src="/image/logo/nn-logo-white.png"
    //                         className="size-[116px]"
    //                     />
    //                     <div className="  border-t border-gray-200 mt-6 w-3/4 mx-auto">{}</div>
    //                 </div>
    //                 <nav className="flex flex-col h-full desktop-nav">
    //                     <ul role="list" className="flex flex-1 flex-col gap-y-7 ">
    //                         <li >
    //                             <ul role="list" className="space-y-1">
    //                                 { navigation.map((item: any) => {
    //                                     // TODO - Make this better
    //                                     let icon = undefined;
    //                                     switch (item.name) {
    //                                         case 'Dashboard':
    //                                             icon = <IconDashboard  className={classNames(
    //                                                 ( item.href === activeTab) ? 'active-svg scale-150 ' : 'scale-125'
    //                                             )}
    //                                             />;
    //                                             break;
    //                                         case 'Audit':
    //                                             icon =  <IconAudit  className={classNames(
    //                                                 ( item.href === activeTab) ? 'active-svg scale-150 ' : 'scale-125'
    //                                             )} />;
    //                                             break;
    //                                         case 'Scheduler':
    //                                             icon =  <IconSchedular  className={classNames(
    //                                                 ( item.href === activeTab) ? 'active-svg scale-150 ' : 'scale-125'
    //                                             )} />;
    //                                             break;
    //                                         case 'Contacts':
    //                                             icon =  <IconContacts  className={classNames(
    //                                                 ( item.href === activeTab) ? 'active-svg scale-150 ' : 'scale-125'
    //                                             )} />;
    //                                             break;
    //                                         case 'Files':
    //                                             icon =  <IconFiles  className={classNames(
    //                                                 ( item.href === activeTab) ? 'active-svg scale-150 ' : 'scale-125'
    //                                             )} />;
    //                                             break;
    //                                         case 'Forms':
    //                                             icon =  <IconForms  className={classNames(
    //                                                 ( item.href === activeTab) ? 'active-svg scale-150 ' : 'scale-125'
    //                                             )} />;
    //                                             break;
    //                                         case 'Dots':
    //                                             icon =  <IconDots  className={classNames(
    //                                                 ( item.href === activeTab) ? 'active-svg scale-150 ' : 'scale-125'
    //                                             )} />;
    //                                             break;
    //                                     }
    //
    //                                     return (
    //                                         <li key={item.name} className="w-full flex items-center justify-center">
    //
    //                                             <a
    //                                                 href={item.href}
    //                                                 className={classNames(
    //                                                 ( item.href === activeTab)
    //                                                         ? 'bg-gray-50 text-indigo-600 bg-linear-to-r from-[#233a7f] to-[#0658bd] '
    //                                                         : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
    //                                                     'group flex items-center justify-center gap-x-3 rounded-md p-2 text-sm/6 font-semibold w-[76px] h-[54px] fill-current',
    //                                                 )}
    //                                             >
    //                                                 { icon }
    //                                             </a>
    //                                         </li>
    //                                     );
    //                                 } ) }
    //                             </ul>
    //                         </li>
    //
    //                         <li className="mt-auto lg:mb-[116px] w-full">
    //                             <div className="flex items-center justify-center">
    //                                 <div className="space-y-1">
    //                                     <div className="w-full flex items-center justify-center">
    //                                         <a
    //                                             href="/customer/profile"
    //                                             className={classNames(
    //                                                 ( activeTab === 'customer/profile')
    //                                                     ? 'bg-gray-50 text-indigo-600 bg-linear-to-r from-[#233a7f] to-[#0658bd] '
    //                                                     : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
    //                                                 'group flex items-center justify-center gap-x-3 rounded-md p-2 text-sm/6 font-semibold w-[76px] h-[54px]',
    //                                             )}
    //                                         >
    //                                             <IconProfile
    //                                                 className={
    //                                                     ( activeTab === 'customer/profile' ? 'active-svg scale-150 ' : ' scale-125') + ' '
    //                                                 }
    //                                                  />
    //                                         </a>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </li>
    //                     </ul>
    //                 </nav>
    //             </div>
    //         </div>
    //     </>
    // );
}