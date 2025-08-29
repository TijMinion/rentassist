import { DefaultCustomerPortalLayout } from "@/app/customer/components/DefaultCustomerPortalLayout";
import { ProfileLayout } from "@/app/customer/profile/components/components/ProfileLayout";

export const ProfileContainer = () => {

    return (
        <DefaultCustomerPortalLayout>
            <ProfileLayout />
        </DefaultCustomerPortalLayout>
    );
}