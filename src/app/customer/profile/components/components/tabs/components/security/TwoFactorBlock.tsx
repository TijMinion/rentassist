

export const TwoFactorBlock = () => {

    return (
        <div className="security-tab w-full lg:shadow-md rounded bg-white p-[32px] border-1 border-gray-400 lg:h-[315px] mt-6">
            <div className="flex flex-col">
                <span className="w-full text-xl text-nnTextPurple mb-8" >{ "Two-step verification" }</span>
                <span className="w-full mb-7 text-nnTextPurple text-lg">{ "Two-factor authentication is not enabled yet" }</span>
                <p className="w-1/2 mb-11" >Two-factor authentication adds a layer of security to you account by requiring more than just a password to login</p>
                <div className="">
                    <button type="submit" className="bg-nnDefaultBlue
                                px-7
                                py-2
                                cursor-pointer
                                text-white
                                rounded
                                hover:bg-white
                                hover:text-nnDefaultBlue
                                border
                                border-nnDefaultBlue">
                        <span>{ "Enable two-factor authentication" }</span>
                    </button>
                </div>
            </div>
        </div>
    );
}