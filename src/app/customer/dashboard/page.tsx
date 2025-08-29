"use client";
import { DashboardContainer } from "@/app/customer/dashboard/components/DashboardContainer";
import { SessionProvider } from "next-auth/react";

export default function Page() {
    return (
        <DashboardContainer />
    );
}