import { JSX } from 'react';
import { SessionProvider } from "next-auth/react";
import { SignUpPageContainer } from "@/app/account/register/components/SignUpPageContainer";

export const SignUpPageWrapper: () => JSX.Element = (): JSX.Element => {
    return (
        <SessionProvider>
            <SignUpPageContainer />
        </SessionProvider>
    );
}