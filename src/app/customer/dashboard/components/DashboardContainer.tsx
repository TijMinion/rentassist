import { DefaultCustomerPortalLayout } from "@/app/customer/components/DefaultCustomerPortalLayout";
import { DashboardLayout } from "@/app/customer/dashboard/components/components/DashboardLayout";

export const DashboardContainer = () => {

    return (
        <DefaultCustomerPortalLayout >
            <DashboardLayout />
        </DefaultCustomerPortalLayout>
    );
};