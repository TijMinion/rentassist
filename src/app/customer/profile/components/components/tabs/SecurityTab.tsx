import { PasswordResetBlock } from "@/app/customer/profile/components/components/tabs/components/security/PasswordResetBlock";
import { TwoFactorBlock } from "@/app/customer/profile/components/components/tabs/components/security/TwoFactorBlock";
import { RecentDevicesBlock } from "@/app/customer/profile/components/components/tabs/components/security/RecentDevicesBlock";

export const SecurityTab = () => {

    return (
        <>
            <PasswordResetBlock />
            <TwoFactorBlock />
            <RecentDevicesBlock />
        </>
    );
}