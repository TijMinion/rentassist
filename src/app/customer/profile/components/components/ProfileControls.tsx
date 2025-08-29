"use client";
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import './styles/profile-menu.scss';

import IconAccount from './images/account-icon.svg';
import IconSecurity from './images/lock-icon.svg';
import IconBilling from './images/money-icon.svg';
import IconNotifications from './images/notifications-icon.svg';
import IconConnections from './images/connections-icon.svg';

import { AccountTab } from "@/app/customer/profile/components/components/tabs/AccountTab";
import { SecurityTab } from "@/app/customer/profile/components/components/tabs/SecurityTab";
import { BillingTab } from "@/app/customer/profile/components/components/tabs/BillingTab";
import { NotificationsTab } from "@/app/customer/profile/components/components/tabs/NotificationsTab";
import { ConnectionsTab } from "@/app/customer/profile/components/components/tabs/ConnectionsTab";

const tabs = [
    { name: 'Account', icon: <IconAccount /> },
    { name: 'Security', icon: <IconSecurity /> },
    { name: 'Billing & Plans', icon: <IconBilling /> },
    { name: 'Notifications', icon: <IconNotifications /> },
    { name: 'Connections', icon: <IconConnections /> },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export const ProfileControls = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    function handleTabClick(index: number) {
        setActiveTab(index);
    }

    return (
        <div className="w-full flex flex-col pr-5">
            <div>
                <div className="grid grid-cols-1 sm:hidden">
                    {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                    <select
                        onChange={ (e) => handleTabClick(parseInt(e.target.value)) }
                        defaultValue={ activeTab }
                        aria-label="Select a tab"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    >
                        {tabs.map((tab: any, index:number) => (
                            <option
                                value={ index }
                                key={tab.name}>{tab.name}</option>
                        ))}
                    </select>
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
                    />
                </div>
                <div className="hidden sm:block mb-[25px]">
                    <nav aria-label="Tabs" className="flex space-x-4 profile-nav">
                        {tabs.map((tab: any, index: number) => (
                            <span
                                onClick={ () => handleTabClick(index) }
                                key={tab.name}
                                // href={tab.href}
                                aria-current={ activeTab === index  ? 'page' : undefined}
                                className={classNames(
                                    (activeTab === index ) ? 'bg-nnDefaultBlue text-white active-menu' : 'text-gray-500 hover:text-gray-700',
                                    'rounded-md px-3 py-2 text-sm font-medium cursor-pointer flex',
                                )}
                            >
                                { tab.icon }
                                <span className="ml-2" >{tab.name}</span>

                            </span>
                        ))}
                    </nav>
                </div>
            </div>

            { (activeTab === 0) &&
                <AccountTab />
            }
            { (activeTab === 1) &&
                <SecurityTab />
            }
            { (activeTab === 2) &&
                <BillingTab />
            }
            { (activeTab === 3) &&
                <NotificationsTab />
            }
            { (activeTab === 4) &&
                <ConnectionsTab />
            }

        </div>
    );
}