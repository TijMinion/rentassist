
import { JSX } from "react"
import { AccountPageFooter } from "@/app/account/components/AccountPagesFooter";

export const DefaultAccountPageWrapper: (props:any) => JSX.Element = (props: any): JSX.Element => {

    return (
        <>
            <div className="w-full  min-h-[94vh] lg:min-h-[96vh] mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center bg-raBlue">
                {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
                <div className="mx-auto relative">
                    <div className="adefault-account-page-container bg-white md:w-full lg:w-4xl rounded-xl shadow-lg p-12 relative">
                        { props.children }
                    </div>
                </div>
            </div>
            <AccountPageFooter />
        </>
    );
}