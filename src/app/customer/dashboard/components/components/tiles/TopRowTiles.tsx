import { JSX } from 'react';


export const TopRowTiles: () => JSX.Element = (): JSX.Element => {

    return (
        <>
            <div className="w-full
            aspect-square
            dark:bg-raBlue
            dark:text-white
            border
            border-raGreen
            dark:border-none
            rounded-lg
            p-4
            "
            >
                Paid this month
            </div>

            <div className="w-full
            aspect-square
            dark:bg-raBlue
            dark:text-white
            border
            border-raGreen
            dark:border-none
            rounded-lg
            p-4
            ">
                Due Today
            </div>

            <div className="w-full
            aspect-square
            dark:bg-raBlue
            dark:text-white
            border
            border-raGreen
            dark:border-none
            rounded-lg
            p-4
            ">
                Overdue
            </div>

            <div className="w-full
            aspect-square
            dark:bg-raBlue
            dark:text-white
            rounded-lg
            border
            border-raGreen
            dark:border-none
            p-4
            ">
                Failed Messages
            </div>

        </>
    );
}