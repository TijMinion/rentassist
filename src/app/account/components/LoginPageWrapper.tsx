import { SessionProvider } from "next-auth/react";
import { LoginPageContainer } from "@/app/account/components/LoginPageContainer";

export const LogInPageContainer = () => {
    return (
        <SessionProvider>
            <LoginPageContainer />
        </SessionProvider>
    );
}