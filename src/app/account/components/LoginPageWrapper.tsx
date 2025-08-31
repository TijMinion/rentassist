import { SessionProvider } from "next-auth/react";
import { LoginPageContainer } from "@/app/account/components/LoginPageContainer";
import { JSX } from "react";

export const LogInPageContainer: () => JSX.Element = (): JSX.Element => {
    return (
        <SessionProvider>
            <LoginPageContainer />
        </SessionProvider>
    );
}