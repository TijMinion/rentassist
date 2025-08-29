import { SubscriptionBlock } from "@/app/customer/profile/components/components/tabs/components/billing/SubscriptionBlock";
import { PaymentMethodsBlock } from "@/app/customer/profile/components/components/tabs/components/billing/PaymentMethodsBlock";
import { BillingAddressBlock } from "@/app/customer/profile/components/components/tabs/components/billing/BillingAddressBlock";

export const BillingTab = () => {

    return (
        <>
            <SubscriptionBlock />
            <PaymentMethodsBlock />
            <BillingAddressBlock />
        </>
    );
}