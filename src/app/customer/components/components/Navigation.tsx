"use client";
import { useState, useEffect, Component } from "react";
import './styles/navigation.scss';
import IconDashboard from '../images/dashboard-icon.svg';
import IconAudit from '../images/postbox-icon.svg';
import IconSchedular from '../images/calendar-icon.svg';
import IconContacts from '../images/users-icon.svg';
import IconForms from '../images/form-icon.svg';
import IconFiles from '../images/file-icon.svg';
import IconProfile from '../images/profile-icon.svg';
import IconDots from '../images/three-dots-icon.svg';


const navigation: any = [
    { name: 'Dashboard', href: '/customer/dashboard', icon: 'dashboard', count: '5', current: true },
    { name: 'Audit', href: '/customer/audits', icon: 'postbox', current: false, base_url: 'customer/audit' },
    { name: 'Scheduler', href: '/customer/scheduler', icon: 'scheduler', count: '12', current: false },
    { name: 'Contacts', href: '/customer/contacts', icon: 'users', count: '20+', current: false },
    { name: 'Forms', href: '/customer/forms', icon: 'form', current: false },
    { name: 'Files', href: '/customer/files', icon: 'file', current: false },
    { name: 'Dots', href: '/customer/dots', icon: 'three-dots', current: false },
]
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export const Navigation = () => {
    const [activeTab, setActiveTab] = useState<string>('');


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


    return (
        <>
            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[116px] lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white pb-4 w-[116px] shadow-md">
                    <div className="flex items-center flex-col">
                        <img
                            alt="Nok Nok Ltd"
                            src="/image/logo/nn-logo-white.png"
                            className="size-[116px]"
                        />
                        <div className="  border-t border-gray-200 mt-6 w-3/4 mx-auto">{}</div>
                    </div>
                    <nav className="flex flex-col h-full desktop-nav">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7 ">
                            <li >
                                <ul role="list" className="space-y-1">
                                    { navigation.map((item: any) => {
                                        // TODO - Make this better
                                        let icon = undefined;
                                        switch (item.name) {
                                            case 'Dashboard':
                                                icon = <IconDashboard  className={classNames(
                                                    ( item.href === activeTab) ? 'active-svg scale-150 ' : 'scale-125'
                                                )}
                                                />;
                                                break;
                                            case 'Audit':
                                                icon =  <IconAudit  className={classNames(
                                                    ( item.href === activeTab) ? 'active-svg scale-150 ' : 'scale-125'
                                                )} />;
                                                break;
                                            case 'Scheduler':
                                                icon =  <IconSchedular  className={classNames(
                                                    ( item.href === activeTab) ? 'active-svg scale-150 ' : 'scale-125'
                                                )} />;
                                                break;
                                            case 'Contacts':
                                                icon =  <IconContacts  className={classNames(
                                                    ( item.href === activeTab) ? 'active-svg scale-150 ' : 'scale-125'
                                                )} />;
                                                break;
                                            case 'Files':
                                                icon =  <IconFiles  className={classNames(
                                                    ( item.href === activeTab) ? 'active-svg scale-150 ' : 'scale-125'
                                                )} />;
                                                break;
                                            case 'Forms':
                                                icon =  <IconForms  className={classNames(
                                                    ( item.href === activeTab) ? 'active-svg scale-150 ' : 'scale-125'
                                                )} />;
                                                break;
                                            case 'Dots':
                                                icon =  <IconDots  className={classNames(
                                                    ( item.href === activeTab) ? 'active-svg scale-150 ' : 'scale-125'
                                                )} />;
                                                break;
                                        }

                                        return (
                                            <li key={item.name} className="w-full flex items-center justify-center">

                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                    ( item.href === activeTab)
                                                            ? 'bg-gray-50 text-indigo-600 bg-linear-to-r from-[#233a7f] to-[#0658bd] '
                                                            : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                                        'group flex items-center justify-center gap-x-3 rounded-md p-2 text-sm/6 font-semibold w-[76px] h-[54px] fill-current',
                                                    )}
                                                >
                                                    { icon }
                                                </a>
                                            </li>
                                        );
                                    } ) }
                                </ul>
                            </li>

                            <li className="mt-auto lg:mb-[116px] w-full">
                                <div className="flex items-center justify-center">
                                    <div className="space-y-1">
                                        <div className="w-full flex items-center justify-center">
                                            <a
                                                href="/customer/profile"
                                                className={classNames(
                                                    ( activeTab === 'customer/profile')
                                                        ? 'bg-gray-50 text-indigo-600 bg-linear-to-r from-[#233a7f] to-[#0658bd] '
                                                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                                    'group flex items-center justify-center gap-x-3 rounded-md p-2 text-sm/6 font-semibold w-[76px] h-[54px]',
                                                )}
                                            >
                                                <IconProfile
                                                    className={
                                                        ( activeTab === 'customer/profile' ? 'active-svg scale-150 ' : ' scale-125') + ' '
                                                    }
                                                     />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}