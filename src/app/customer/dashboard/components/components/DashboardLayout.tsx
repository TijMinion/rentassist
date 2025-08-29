import { DepartmentPerformanceTile } from "@/app/customer/dashboard/components/components/tiles/DepartmentPerformanceTile";
import { PerformanceGraphTile } from "@/app/customer/dashboard/components/components/tiles/PerformanceGraphTile";
import { ContactsTile } from "@/app/customer/dashboard/components/components/tiles/ContactsTile";
import { TotalEmailCountTile } from "@/app/customer/dashboard/components/components/tiles/TotalEmailCountTile";
import { DiagnosisTile } from "@/app/customer/dashboard/components/components/tiles/DiagnosisTile";
import { AuditTiles } from "@/app/customer/dashboard/components/components/tiles/AuditTiles";

export const DashboardLayout = () => {

    return (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 overflow-x-hidden overflow-y-auto">
            <div>
                <DepartmentPerformanceTile />
                <PerformanceGraphTile />
                <ContactsTile />
            </div>
            <div>
                <TotalEmailCountTile />
                <DiagnosisTile />
                <AuditTiles />
            </div>
        </div>
    );
}