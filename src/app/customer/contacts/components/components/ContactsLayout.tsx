

export const ContactsLayout = () => {

    return (
        <div className="w-full flex flex-col">
            <div className="grid grid-cols-4 gap-6">
                <div className="w-full lg:shadow-md rounded bg-white p-[32px] border-1 border-gray-400 lg:h-[185px]">
                    1
                </div>
                <div className="w-full lg:shadow-md rounded bg-white p-[32px] border-1 border-gray-400 lg:h-[185px]">
                    2
                </div>
                <div className="w-full lg:shadow-md rounded bg-white p-[32px] border-1 border-gray-400 lg:h-[185px]">
                    3
                </div>
                <div className="w-full lg:shadow-md rounded bg-white p-[32px] border-1 border-gray-400 lg:h-[185px]">
                    4
                </div>
            </div>
            <div className="w-full lg:shadow-md rounded bg-white p-[32px] border-1 border-gray-400 lg:h-[983px] mt-6">
                Contacts List
            </div>
        </div>
    );
}