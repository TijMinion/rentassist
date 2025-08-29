import { DefaultCustomerPortalLayout } from "@/app/customer/components/DefaultCustomerPortalLayout";
import { ContactsLayout } from "@/app/customer/contacts/components/components/ContactsLayout";

export const ContactsContainer = (props: any) => {

    return (
        <DefaultCustomerPortalLayout >
            <ContactsLayout />
        </DefaultCustomerPortalLayout>
    );
}