"use client";
import { useState } from 'react';

import IconTop from "@/app/account/components/images/top-image.svg";
import IconBottom from "@/app/account/components/images/bottom-image.svg";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";

export const ForgotPasswordContainer = () => {
    const [email, setEmail] = useState<string>('');

    function handleEmailChange(e: any): void {
        const email: string = e.target.value;
        setEmail(email)
    }

    async function handleForgotPasswordReset() {

    }


    return (
        <>
            <div className="w-full h-screen mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center bg-nnBackground">
                <div className="mx-auto relative">
                    <div className="hidden lg:block absolute lg:left-[-66px] lg:top-[-80px]">
                        <IconTop />
                    </div>
                    <div className="hidden lg:block absolute lg:right-[-54px] lg:bottom-[-100px]">
                        <IconBottom />
                    </div>
                    <div className="login-container bg-white md:w-full lg:w-[600px] rounded shadow-lg p-12 relative">
                        <form onSubmit={ handleForgotPasswordReset }>
                            <div className="space-y-12">
                                <div className="pb-4">
                                    <div className="flex justify-center items-center flex-col">

                                        <div className="-mt-4">
                                            <Link href="/">
                                                <img className="w-[200px] h-[200px]" src="/image/logo/nn-logo-white.png" alt="Logo Logo"  />
                                            </Link>

                                        </div>
                                        <span className="font-bold text-2xl text-nnTextPurple -mt-4 mb-2 w-full text-left">{ "Forgot Password?" }</span>
                                        <p className="text-xl text-left w-full text-nnTextPurple" >{ "Enter your email and we'll send you instructions to reset your password" }</p>
                                    </div>
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="col-span-full">
                                            <label htmlFor="email" className="block text-sm/6 font-medium text-nnTextPurple">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="text"
                                                        autoComplete="email"
                                                        value={ email }
                                                        onChange={ handleEmailChange }
                                                        placeholder="Enter your email address"
                                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 h-[48px]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between flex-col gap-x-6">
                                <button
                                    type="submit"
                                    className="rounded-md
                                    bg-nnDefaultBlue
                                    w-full
                                    h-[50px]
                                    px-3
                                    py-2
                                    text-lg
                                    font-semibold
                                    text-white
                                    shadow-xs
                                    hover:bg-indigo-500
                                    focus-visible:outline-2
                                    focus-visible:outline-offset-2
                                    focus-visible:outline-indigo-600"
                                >
                                    { "Send Reset Link" }
                                </button>
                                <div className="w-full flex justify-center items-center mt-7">
                                    <ChevronLeftIcon className="w-5 h-5 text-nnDefaultBlue fill-current" />
                                    <Link href="/account" className="text-md font-semibold text-nnDefaultBlue ml-2 ">
                                        { "Back to log in" }
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}