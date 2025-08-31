import {
    CalendarIcon,
    ChartPieIcon, Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon
} from "@heroicons/react/24/outline";
import {Dialog, DialogBackdrop, DialogPanel, TransitionChild} from "@headlessui/react";
import {useState, JSX, useEffect} from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {Bars3Icon, BellIcon, UserIcon, XMarkIcon} from '@heroicons/react/24/outline'
import { useSession } from "next-auth/react";

const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, count: '5', current: true },
    { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Projects', href: '#', icon: FolderIcon, count: '12', current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, count: '20+', current: false },
    { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]
const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]

const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Settings', href: '#' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const MobileNavigation: (props: any) => JSX.Element = (props:any): JSX.Element => {
    const session: any = useSession();
    const [user, setUser] = useState<any>(null);
    const [userImage, setUserImage] = useState<string>();
    const [userName, setUserName] = useState<string>();

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

    return (
        <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {navigation.map((item) => (
                    <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                            item.current
                                ? 'bg-indigo-700 text-white dark:bg-indigo-950/40'
                                : 'text-white hover:bg-indigo-500/75 dark:hover:bg-indigo-700/75',
                            'block rounded-md px-3 py-2 text-base font-medium',
                        )}
                    >
                        {item.name}
                    </DisclosureButton>
                ))}
            </div>
            <div className="border-t border-indigo-700 pt-4 pb-3 dark:border-indigo-800">
                <div className="flex items-center px-5">
                    <div className="shrink-0">
                        { (userImage === undefined) &&
                            <UserIcon className="size-10 fill-white border-white" />
                        }
                        { (userImage !== undefined) &&
                            <img
                                alt=""
                                src={ userImage }
                                className="size-10 rounded-full outline -outline-offset-1 outline-white/10"
                            />
                        }
                    </div>
                    <div className="ml-3">
                        <div className="text-base font-medium text-white">{user?.fullName}</div>
                        <div className="text-sm font-medium text-indigo-300">{user?.email}</div>
                    </div>
                    <button
                        type="button"
                        className="relative ml-auto shrink-0 rounded-full p-1 text-indigo-200 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-white"
                    >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                    { userNavigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500/75 dark:hover:bg-indigo-700/75"
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </div>
        </DisclosurePanel>
    );

    // return (
    //     <Dialog open={props.sidebarOpen} onClose={props.setSidebarOpen} className="relative z-50 lg:hidden">
    //         <DialogBackdrop
    //             transition
    //             className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
    //         />
    //
    //         <div className="fixed inset-0 flex">
    //             <DialogPanel
    //                 transition
    //                 className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
    //             >
    //                 <TransitionChild>
    //                     <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
    //                         <button type="button" onClick={() => props.setSidebarOpen(false)} className="-m-2.5 p-2.5">
    //                             <span className="sr-only">Close sidebar</span>
    //                             <XMarkIcon aria-hidden="true" className="size-6 text-white" />
    //                         </button>
    //                     </div>
    //                 </TransitionChild>
    //
    //                 {/* Sidebar component, swap this element with another sidebar if you like */}
    //                 <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
    //                     <div className="flex h-16 shrink-0 items-center">
    //                         <img
    //                             alt="Your Company"
    //                             src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
    //                             className="h-8 w-auto"
    //                         />
    //                     </div>
    //                     <nav className="flex flex-1 flex-col">
    //                         <ul role="list" className="flex flex-1 flex-col gap-y-7">
    //                             <li>
    //                                 <ul role="list" className="-mx-2 space-y-1">
    //                                     {navigation.map((item) => (
    //                                         <li key={item.name}>
    //                                             <a
    //                                                 href={item.href}
    //                                                 className={classNames(
    //                                                     item.current
    //                                                         ? 'bg-gray-50 text-indigo-600'
    //                                                         : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
    //                                                     'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
    //                                                 )}
    //                                             >
    //                                                 <item.icon
    //                                                     aria-hidden="true"
    //                                                     className={classNames(
    //                                                         item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
    //                                                         'size-6 shrink-0',
    //                                                     )}
    //                                                 />
    //                                                 {item.name}
    //                                             </a>
    //                                         </li>
    //                                     ))}
    //                                 </ul>
    //                             </li>
    //                             <li>
    //                                 <div className="text-xs/6 font-semibold text-gray-400">Your teams</div>
    //                                 <ul role="list" className="-mx-2 mt-2 space-y-1">
    //                                     {teams.map((team) => (
    //                                         <li key={team.name}>
    //                                             <a
    //                                                 href={team.href}
    //                                                 className={classNames(
    //                                                     team.current
    //                                                         ? 'bg-gray-50 text-indigo-600'
    //                                                         : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
    //                                                     'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
    //                                                 )}
    //                                             >
    //                           <span
    //                               className={classNames(
    //                                   team.current
    //                                       ? 'border-indigo-600 text-indigo-600'
    //                                       : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
    //                                   'flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
    //                               )}
    //                           >
    //                             {team.initial}
    //                           </span>
    //                                                 <span className="truncate">{team.name}</span>
    //                                             </a>
    //                                         </li>
    //                                     ))}
    //                                 </ul>
    //                             </li>
    //                             <li className="mt-auto">
    //                                 <a
    //                                     href="#"
    //                                     className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
    //                                 >
    //                                     <Cog6ToothIcon
    //                                         aria-hidden="true"
    //                                         className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
    //                                     />
    //                                     Settings
    //                                 </a>
    //                             </li>
    //                         </ul>
    //                     </nav>
    //                 </div>
    //             </DialogPanel>
    //         </div>
    //     </Dialog>
    // );
}