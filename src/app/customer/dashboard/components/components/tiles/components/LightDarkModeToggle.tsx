import { JSX, useState, useEffect } from 'react';
import { SunIcon } from "@heroicons/react/24/solid";
import { MoonIcon } from "@heroicons/react/24/solid";

export const LightDarkModeToggle: () => JSX.Element = (): JSX.Element => {
    const [dark, setDark] = useState<boolean>(false)

    function toggleDark(): void {
        const newDark: boolean = !dark
        setDark(newDark);
        if (window?.localStorage !== undefined) {
            let mode: any = {
                'mode': newDark ? 'dark' : 'light',
            };
            window?.localStorage.setItem('view_mode', JSON.stringify(mode));
            if (newDark) {
                document?.getElementById('html')?.classList.add('dark');
            } else {
                document?.getElementById('html')?.classList.remove('dark');
            }

        }
    }

    useEffect( (): void => {
        if (window?.localStorage !== undefined) {
            let mode: string = window?.localStorage.getItem('view_mode') ?? '';
            if (mode !== '') {
                const modeItem = JSON.parse(mode);
                if (modeItem.mode === 'dark') {
                    document?.getElementById('html')?.classList.add('dark');
                    setDark(true);
                }
            }
        }
    }, [window] );

    return (
        <div className="group
        relative
        inline-flex
        w-11
        shrink-0
        rounded-full
        bg-gray-200
        p-0.5
        inset-ring
        inset-ring-gray-900/5
        outline-offset-2
        outline-indigo-600
        transition-colors
        duration-200
        ease-in-out
        has-checked:bg-raGreen
        has-focus-visible:outline-2
        dark:bg-white/5
        dark:inset-ring-white/10
        dark:outline-indigo-500
        dark:has-checked:raGreen
        cursor-pointer
        ">
          <span className="relative
          size-5
          rounded-full
          bg-white
          shadow-xs
          ring-1
          ring-gray-900/5
          transition-transform
          duration-200
          ease-in-out
          group-has-checked:translate-x-5
            cursor-pointer
          ">
            <span
                aria-hidden="true"
                className="absolute
                inset-0
                flex
                size-full
                items-center
                justify-center
                opacity-100
                transition-opacity
                duration-200
                ease-in
                group-has-checked:opacity-0
                group-has-checked:duration-100
                group-has-checked:ease-out

                "
            >
                <SunIcon className="size-5 fill-raGreen cursor-pointer" />
              {/*<svg fill="none" viewBox="0 0 12 12" className="size-3 text-gray-400 dark:text-gray-600">*/}
              {/*  <path*/}
              {/*      d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"*/}
              {/*      stroke="currentColor"*/}
              {/*      strokeWidth={2}*/}
              {/*      strokeLinecap="round"*/}
              {/*      strokeLinejoin="round"*/}
              {/*  />*/}
              {/*</svg>*/}
            </span>
            <span
                aria-hidden="true"
                className="absolute
                inset-0
                flex
                size-full
                items-center
                justify-center
                opacity-0
                transition-opacity
                duration-100
                ease-out
                group-has-checked:opacity-100
                group-has-checked:duration-200
                group-has-checked:ease-in

                "
            >
                <MoonIcon className="size-5 fill-raBlue" />
            </span>
          </span>
            <input
                name="setting"
                type="checkbox"
                checked={ dark }
                aria-label="Use setting"
                onChange={toggleDark}
                className="absolute inset-0 appearance-none focus:outline-hidden"
            />
        </div>
    );
}