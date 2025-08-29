

export const AuditsLayout  = () => {

    return (
        <div className="flex overflow-x-hidden overflow-y-auto">
            <div className="w-[15%] lg:shadow-md rounded bg-white p-[32px] border-1 border-gray-400 lg:h-[415px]">
                Audit Control
            </div>
            <div className="w-[85%] lg:shadow-md rounded bg-white p-[32px] border-1 border-gray-400 ml-[15px] h-[89vh]">
                Audit Emails
            </div>
        </div>
    );
}