import { JSX } from 'react';
import { VerifyEmailContainer } from "@/app/account/verify-email/[id]/components/VerifyEmailContainer";

export default async function Page({ params }: { params: { id: string } }): Promise<JSX.Element> {
    const { id } = await params;
    return (
        <VerifyEmailContainer urlId={ id } />
    );
}