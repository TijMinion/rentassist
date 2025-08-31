import { JSX } from 'react';
import { TopRowTiles } from "@/app/customer/dashboard/components/components/tiles/TopRowTiles";
import { BottomRowTiles } from "@/app/customer/dashboard/components/components/tiles/BottomRowTiles";

export const DashboardLayout:  () => JSX.Element = (): JSX.Element => {

    return (
        <div className="
                w-full
                flex
                flex-col
                pb-20
            "
        >
            <div className="w-full mb-20 ">
                <h2 className="dark:text-white text-5xl mt-2" >Dashboard</h2>
                <h3 className="dark:text-white text-2xl mt-5" >At a glance status of rent and reminders</h3>
            </div>
            <div className="grid
                xs:grid-cols-1
                lg:grid-cols-4
                gap-4

                "
            >
                <TopRowTiles />
            </div>
            <div className="grid
                xs:grid-cols-1
                lg:grid-cols-2
                gap-4
                mt-4
                "
            >
                <BottomRowTiles />
            </div>
        </div>
    );
}