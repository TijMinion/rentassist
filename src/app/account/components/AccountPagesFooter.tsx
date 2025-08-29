import { AccountPagesFooterTerms } from "@/app/account/components/components/AccountPagesFooterTerms";

export const AccountPageFooter = () => {


    const today = new Date();

    return (
        <>
            <div className="w-full bg-nnBackground">
                <div className="footer-container mx-auto lg:max-w-7xl flex justify-between py-2">
                    <span className="text-nnTextPurple"  >&copy; { today.getFullYear() + ", made by " } <span className="text-nnDefaultBlue font-bold" >{ "NokNok" }</span> </span>
                    <div className="flex">
                        <div className="ml-5">
                            <span>{ "Terms of Use" }</span>
                        </div>
                        <AccountPagesFooterTerms />
                    </div>
                </div>
            </div>
        </>

    );
}