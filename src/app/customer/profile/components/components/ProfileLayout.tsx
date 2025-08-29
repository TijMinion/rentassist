import { ProfileBox } from "@/app/customer/profile/components/components/ProfileBox";
import { ProfileControls } from "@/app/customer/profile/components/components/ProfileControls";
import { AccountProgress } from "@/app/customer/profile/components/components/AccountProgress";

export const ProfileLayout = () => {
    const hostUrl: string = process.env.HOST_URL ?? '';

    return (
        <div className="grid md:grid-cols-1 lg:grid-cols-[28%_72%] gap-4 overflow-x-hidden overflow-y-auto">
            <div className="flex flex-col">
                <ProfileBox hostUrl={ hostUrl } />
                <AccountProgress />
            </div>

            <ProfileControls />
        </div>
    );
}