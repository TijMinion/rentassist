"use client";
import { useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { delete_cookie, read_cookie } from "sfcookies";
import Image from 'next/image';

export const LayoutWrapper = (props: any) => {
    const session = useSession();
    const router = useRouter();
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
                           src="/image/icon/ra-logo.png" alt="Logo Logo" width={45} height={45} />
                    <Image className="animate-bounce w-[260px] h-[90px] not-dark:hidden"
                           src="/image/icon/ra-logo-white.png" alt="Logo Logo" width={45} height={45} />
                </div>
            }

        </div>
    );
}