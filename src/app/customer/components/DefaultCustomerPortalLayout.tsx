'use client'

import { useState } from "react";
import { Navigation } from "@/app/customer/components/components/Navigation";
import { MobileNavigation } from "@/app/customer/components/components/MobileNavigation";
import { AppBar } from "@/app/customer/components/components/AppBar";
import { SessionProvider } from "next-auth/react";
import { LayoutWrapper } from "@/app/customer/components/components/LayoutWrapper";
import { Disclosure } from "@headlessui/react";
import { Footer } from "@/app/customer/components/components/Footer";

export const DefaultCustomerPortalLayout = (props: any) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <SessionProvider >
            <LayoutWrapper>
                <div className="min-h-full">
                    <Disclosure as="nav" className="bg-raGreen dark:bg-raBlue">
                        <MobileNavigation sidebarOpen={ sidebarOpen }  setSidebarOpen={ setSidebarOpen } />
                        <Navigation />
                    </Disclosure>
                    {/*<AppBar setSidebarOpen={ setSidebarOpen } />*/}
                    <main>
                        <div className="mx-auto max-w-9xl px-4 py-6 sm:px-6 lg:px-8">
                            { props.children }
                        </div>
                    </main>
                    <Footer />
                    {/*<main className="pt-4 pb-10">*/}
                    {/*    <div className="px-4 sm:px-6 lg:px-8">*/}
                    {/*        */}
                    {/*    </div>*/}
                    {/*</main>*/}
                </div>
            </LayoutWrapper>
        </SessionProvider>
    );
}