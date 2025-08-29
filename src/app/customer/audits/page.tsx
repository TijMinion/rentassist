"use client";
import { AuditContainer } from "@/app/customer/audits/components/AuditContainer";
import { SessionProvider } from "next-auth/react";

export default function Page() {
    return (
        <AuditContainer />
    );
}