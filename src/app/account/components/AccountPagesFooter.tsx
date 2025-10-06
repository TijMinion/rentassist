import { AccountPagesFooterTerms } from "@/app/account/components/components/AccountPagesFooterTerms";

export const AccountPageFooter = () => {


    const today = new Date();

    return (
        <>
            <div className="w-full bg-raBlue">
                <div className="footer-container mx-auto lg:max-w-9xl flex justify-between py-2">
                    <span className="text-white text-2xl"  >&copy; { today.getFullYear() + ", made by " } <span className="text-nnDefaultBlue font-bold" >{ "RentAssist" }</span> </span>
                    <div className="flex text-2xl">
                        <div className="ml-5 text-white">
                            <a href="#">{ "Terms of Use" }</a>
                        </div>
                        <div className="ml-5 text-white">
                            <a href="#">{ "Privacy" }</a>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}