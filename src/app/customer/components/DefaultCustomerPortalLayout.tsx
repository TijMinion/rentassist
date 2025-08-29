'use client'

import { useState } from "react";
import { Navigation } from "@/app/customer/components/components/Navigation";
import { MobileNavigation } from "@/app/customer/components/components/MobileNavigation";
import { AppBar } from "@/app/customer/components/components/AppBar";
import { SessionProvider } from "next-auth/react";
import { LayoutWrapper } from "@/app/customer/components/components/LayoutWrapper";


export const DefaultCustomerPortalLayout = (props: any) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <SessionProvider >
            <LayoutWrapper>
                <MobileNavigation sidebarOpen={ sidebarOpen }  setSidebarOpen={ setSidebarOpen } />
                <Navigation />
                <div className="lg:pl-30">
                    <AppBar setSidebarOpen={ setSidebarOpen } />
                    <main className="pt-4 pb-10">
                        <div className="px-4 sm:px-6 lg:px-8">
                            { props.children }
                        </div>
                    </main>
                </div>
            </LayoutWrapper>
        </SessionProvider>
    );
}