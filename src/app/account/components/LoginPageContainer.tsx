"use client";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

import { LandingFooter } from "@/app/components/footer/LandingFooter";
import Link from 'next/link'
import { DefaultLandingLayout } from "@/app/components/landing/DefaultLandingLayout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import IconTop from './images/top-image.svg';
import IconBottom from './images/bottom-image.svg';
import { EyeSlashIcon } from "@heroicons/react/16/solid";
import { EyeIcon }  from "@heroicons/react/16/solid";
import { AccountPageFooter } from "@/app/account/components/AccountPagesFooter";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

export const LoginPageContainer = () => {
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [errors, setErrors] = useState<string>();
    const [loggingIn, setLoggingIn] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const session = useSession();
    const router: AppRouterInstance = useRouter()

    useEffect(() => {
        if (session?.status === "authenticated") {
            router.replace("/customer/dashboard");
        }
    }, [session, router]);


    const loginUser = async (e : any) => {
        e.preventDefault();
        setLoggingIn(true);
        if (!password || password === "") {
            setLoggingIn(false);
            setErrors('Invalid email or password');
            return;
        }

        await signIn(
            "credentials",
            {
                redirect: false,
                username: email,
                password: password,
            }
        )
            .then( (res) => {
                console.log(res);
                if (res?.error) {
                    // console.log(res.error);
                    setErrors('Invalid email or password')
                    //if (res?.url) router.replace("/dashboard");
                } else {
                    setErrors(undefined);
                }
                setLoggingIn(false);
            })
            .catch((err) => {
                console.log(err);
            })


    }

    function handleEmailChange(e: any): void {
        const email: string = e.target.value;
        setEmail(email)
    }

    function handlePasswordChange(e: any): void {
        const password: string = e.target.value;
        setPassword(password)
    }

    function handleShowPasswordClick(): void {
        setShowPassword(!showPassword);
    }

    return (
        <>
            <div className="w-full h-screen mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center bg-nnBackground">
                {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
                <div className="mx-auto relative">
                    <div className="hidden lg:block absolute lg:left-[-66px] lg:top-[-80px]">
                        <IconTop />
                    </div>
                    <div className="hidden lg:block absolute lg:right-[-54px] lg:bottom-[-100px]">
                        <IconBottom />
                    </div>
                    <div className="login-container bg-white md:w-full lg:w-[600px] rounded shadow-lg p-12 relative">
                        <form onSubmit={ loginUser }>
                            <div className="space-y-12">
                                <div className="pb-4">
                                    <div className="flex justify-center items-center flex-col">

                                        <div className="-mt-4">
                                            <Link href="/">
                                                <img className="w-[200px] h-[200px]" src="/image/logo/nn-logo-white.png" alt="Logo Logo"  />
                                            </Link>

                                        </div>
                                        <span className="font-bold text-5xl text-nnDefaultBlue -mt-4 mb-[30px]">{ "Who's there?" }</span>
                                        <p className="text-xl text-left w-full text-nnTextPurple" >Please sign in to your account and start the adventure</p>
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

                                        <div className="col-span-full">
                                            <div className="w-full flex justify-between">
                                                <label htmlFor="password" className="block text-sm/6 font-medium text-nnTextPurple">
                                                    Password
                                                </label>
                                                <Link href="/account/forgot-password" className="text-sm/6 font-semibold text-nnDefaultBlue">
                                                    { "Forgot Password?" }
                                                </Link>
                                            </div>

                                            <div className="mt-2">
                                                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                                    <input
                                                        id="password"
                                                        name="password"
                                                        type={ !showPassword ? "password" : 'text' }
                                                        autoComplete="password"
                                                        value={ password }
                                                        onChange={ handlePasswordChange }
                                                        placeholder="Enter your password"
                                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 h-[48px]"
                                                    />
                                                    <div className="w-[60px] flex justify-center items-center cursor-pointer" onClick={ handleShowPasswordClick }>
                                                        { !showPassword &&
                                                            <EyeSlashIcon className="h-full text-nnTextPurple fill-current w-[28px] h-[28px]" />
                                                        }
                                                        { showPassword &&
                                                            <EyeIcon className="h-full text-nnTextPurple fill-current w-[28px] h-[28px]" />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="remember-check w-full flex items-center">
                                <div className="group grid size-4 grid-cols-1 mr-4">
                                    <input
                                        id="remember"
                                        name="remember"
                                        type="checkbox"
                                        aria-describedby="comments-description"
                                        className="col-start-1
                                        row-start-1
                                        appearance-none
                                        rounded-sm
                                        border
                                        border-gray-300
                                        bg-white
                                        checked:border-nnDefaultBlue
                                        checked:bg-nnDefaultBlue
                                        indeterminate:border-nnDefaultBlue
                                        indeterminate:bg-nnDefaultBlue
                                        focus-visible:outline-2
                                        focus-visible:outline-offset-2
                                        focus-visible:outline-nnDefaultBlue
                                        disabled:border-gray-300
                                        disabled:bg-gray-100
                                        disabled:checked:bg-gray-100
                                        forced-colors:appearance-auto"
                                    />
                                    <svg
                                        fill="none"
                                        viewBox="0 0 14 14"
                                        className="pointer-events-none
                                        col-start-1
                                        row-start-1
                                        size-3.5
                                        self-center
                                        justify-self-center
                                        stroke-white
                                        group-has-disabled:stroke-gray-950/25"
                                    >
                                        <path
                                            d="M3 8L6 11L11 3.5"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="opacity-0 group-has-checked:opacity-100"
                                        />
                                        <path
                                            d="M3 7H11"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="opacity-0 group-has-indeterminate:opacity-100"
                                        />
                                    </svg>
                                </div>
                                <span className="text-nnTextPurple" >{ "Remember Me" }</span>
                            </div>
                            <div className="mt-6 flex items-center justify-between flex-col gap-x-6">
                                { (errors !== undefined) &&
                                    <span className="w-full px-4 text-center text-red">
                                        { errors }
                                    </span>
                                }
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
                                    focus-visible:outline-indigo-600
                                    flex
                                    items-center
                                    justify-center
                                    "
                                >
                                    <span>{ "Sign in" }</span>
                                    { (loggingIn) &&
                                        <ArrowPathIcon className="animate-spin w-8 h-8 text-white fill-current ml-4" />
                                    }
                                </button>
                                <div className="w-full flex justify-center items-center mt-7">
                                    <span className="text-nnTextPurple" >{ "New on our platform?" }</span>
                                    <Link href="/account/sign-up" className="text-sm/6 font-semibold text-nnDefaultBlue ml-2">
                                        { "Create an Account" }
                                    </Link>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <AccountPageFooter />
        </>

    );
}