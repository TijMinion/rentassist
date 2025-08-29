import { DefaultCustomerPortalLayout } from "@/app/customer/components/DefaultCustomerPortalLayout";
import { SchedulerLayout } from "@/app/customer/scheduler/components/components/SchedulerLayout";

export const SchedulerContainer = (props) => {
    return (
        <DefaultCustomerPortalLayout >
            <SchedulerLayout />
        </DefaultCustomerPortalLayout>
    );
}