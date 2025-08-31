import { JSX } from 'react';


export const BottomRowTiles: () => JSX.Element = (): JSX.Element => {

    return (
        <>
            <div className="w-full
            aspect-square
            dark:bg-raBlue
            dark:text-white
            rounded-lg
            border
            border-raGreen
            dark:border-none
            p-4
            "
            >
                Upcoming Reminders
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
                Late Rent
            </div>

        </>
    );
}