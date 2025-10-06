"use client";
import { useEffect, JSX } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { delete_cookie, read_cookie } from "sfcookies";
import Image from 'next/image';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const LayoutWrapper: (props: any) => JSX.Element = (props: any): JSX.Element => {
    const session: any = useSession();
    const router: AppRouterInstance = useRouter();
    // console.log(read_cookie('authToken'));
    useEffect( () => {
        if (session?.status === 'unauthenticated'  ) {
            delete_cookie('authToken');
            delete_cookie('next-auth.callback-url');
            delete_cookie('next-auth.csrf-token');
            delete_cookie('next-auth.session-token');
            router.replace('/');
        }
    }, [session, router] );

    return (
        <div className="dark:bg-raBlueDarker__30_percent ">
            { (session?.status === "authenticated" ) &&
                <>
                    { props.children }
                </>
            }
            { (session?.status === "loading")  &&
                <div className="w-full h-screen flex justify-center items-center">
                    <Image className="animate-bounce w-[260px] h-[90px] dark:hidden"
                           src="/image/icon/ra-logo.png" alt="Logo Logo" width={45} height={45} priority />
                    <Image className="animate-bounce w-[260px] h-[90px] not-dark:hidden"
                           src="/image/icon/ra-logo-white.png" alt="Logo Logo" width={45} height={45} priority />
                </div>
            }

        </div>
    );
}