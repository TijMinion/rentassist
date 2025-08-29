import { DefaultCustomerPortalLayout } from "@/app/customer/components/DefaultCustomerPortalLayout";
import { AuditsLayout } from "@/app/customer/audits/components/components/AuditsLayout";

export const AuditContainer = () => {

    return (
        <DefaultCustomerPortalLayout >
            <AuditsLayout />
        </DefaultCustomerPortalLayout>
    );
}