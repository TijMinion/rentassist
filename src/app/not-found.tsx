"use client";
import { JSX } from "react";
import Link from "next/link";
import {ArrowPathIcon, ChevronLeftIcon} from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function Custom404(): JSX.Element {
    const router: AppRouterInstance = useRouter();

    function handleBacKButtonAction(): void {
        if (router) {
            router.back();
        }
    }

    return (
        <div className="w-full  min-h-screen mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center bg-raBlue">
            {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
            <div className="mx-auto relative">
                <div className="adefault-account-page-container bg-white md:w-full lg:w-4xl rounded-xl shadow-lg p-12 relative">
                    <div className="space-y-12">
                        <div className="pb-4">
                            <div className="flex justify-center items-center flex-col">
                                <div className="-mt-4">
                                    <Link href="/">
                                        <img className="w-[300px] h-auto" src="/image/icon/ra-logo.png" alt="Logo Logo"  />
                                    </Link>
                                </div>
                                <span className="font-bold text-5xl text-raBlue mt-8 mb-2 w-full text-center">{ "404 Not Found!" }</span>
                                <p className="text-4xl text-center w-full text-raBlue/80" >
                                    { "Oops! The page you were looking for isn't here." }
                                </p>
                                <p className="text-3xl text-center w-full text-raBlue/80 mt-2" >
                                    { "Please try again or give us a nudge if you can't find what you are looking for" }
                                </p>

                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between flex-col gap-x-6">
                        <div className="w-full flex justify-center items-center mt-7">

                            <button onClick={ handleBacKButtonAction } className="text-2xl font-semibold text-raBlue/80 ml-2  cursor-pointer flex">
                                <ChevronLeftIcon className="size-9 text-raBlue/90 fill-current mr-4" />
                                { "Go Back" }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}