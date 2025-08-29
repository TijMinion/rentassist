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
        <div className="bg-[#e7edf3]">
            { (session?.status === "authenticated" ) &&
                <>
                    { props.children }
                </>
            }
            { (session?.status === "loading")  &&
                <div className="w-full h-screen flex justify-center items-center">
                    <Image className="animate-bounce w-[60px] h-[60px]" src="/image/logo/nn-logo.png" alt="Logo Logo" width={45} height={45} />
                </div>
            }

        </div>
    );
}