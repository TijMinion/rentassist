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
            <div className="w-full h-screen mx-auto px-4 sm:px-6 lg:px-0 flex justify-center items-center">
                <div className="w-full grid sm:grid-cols-1 md:grid-cols-[50%_50%] h-full 3xl:grid-cols-[32%_68%] ">
                    <div className="forgot-password-container bg-white w-full p-12 relative h-full flex items-center blur-none">
                        <form onSubmit={ handleForgotPasswordReset } className="w-full">
                            <div className="space-y-12">
                                <div className="pb-4">
                                    <div className="flex justify-center items-center flex-col">

                                        <div className="mt-4 mb-20">
                                            <Link href="/">
                                                <img className="w-[200px] h-[80px]" src="/image/icon/ra-logo.png" alt="Logo Logo"  />
                                            </Link>

                                        </div>
                                        <span className="font-bold text-2xl text-raBlue -mt-4 mb-2 w-full text-left">{ "Forgot Password?" }</span>
                                        <p className="text-xl text-left w-full text-raBlue" >{ "Enter your email and we'll send you instructions to reset your password" }</p>
                                    </div>
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="col-span-full">
                                            <label htmlFor="email" className="block text-sm/6 font-medium text-raBlue">
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
                                    bg-raGreen
                                    w-full
                                    h-[50px]
                                    px-3
                                    py-2
                                    text-lg
                                    font-semibold
                                    text-white
                                    shadow-xs
                                    hover:bg-raBlue
                                    focus-visible:outline-2
                                    focus-visible:outline-offset-2
                                    focus-visible:outline-raBlue
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    "
                                >
                                    { "Send Reset Link" }
                                </button>
                                <div className="w-full flex justify-center items-center mt-7">
                                    <ChevronLeftIcon className="w-5 h-5 text-raBlue fill-current" />
                                    <Link href="/account" className="text-md font-semibold text-raBlue ml-2 ">
                                        { "Back to log in" }
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="w-full bg-raBlue justify-center items-center xs:hidden hidden lg:flex" >
                        <div className="w-[300px] h-[300px] rounded-md flex justify-center items-center bg-white blur">
                            <img className="" src="/image/icon/ra-fav.png" alt="Logo Logo"  />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}