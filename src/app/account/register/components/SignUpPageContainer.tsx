"use client";
import { useEffect, useState, JSX } from "react";
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
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { createCustomerAccount } from "@/app/account/register/components/hooks/sign-up-page-container";

export const SignUpPageContainer: () => JSX.Element = (): JSX.Element => {
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [errors, setErrors] = useState<string>();
    const [loggingIn, setLoggingIn] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const session: any = useSession();
    const router: AppRouterInstance = useRouter()

    useEffect( (): void => {
        if (session?.status === "authenticated") {
            router.replace("/customer/dashboard");
        }
    }, [session, router]);


    const createUser: (e: any) => Promise<void> = async (e : any) => {
        e.preventDefault();
        setLoggingIn(true);
        setErrors(undefined);
        if (!password || password === "") {
            setLoggingIn(false);
            setErrors('Invalid email or password');
            return;
        }

        await createCustomerAccount(
            (firstName + ' ' + lastName),
            email,
            password
        )
            .then( async (data: any) => {
                if (data?.status !== undefined && data?.status === 'success') {
                    await signIn(
                        'credentials',
                        {
                            redirect: false,
                            username: email,
                            password: password,
                        }
                    )
                        .then( (res) => {
                            if (res?.error) {
                                setErrors('Something has gone wrong!');
                            } else {
                                setErrors(undefined);
                            }
                            setLoggingIn(false);
                        })
                        .catch( (err: Error) => {
                            console.log(err);
                        })
                } else {
                    setLoggingIn(false);
                    setErrors(data?.message ?? 'Something went wrong!');
                }
            })
            .catch((err) => {
                console.log(err);
            });
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

    function handleFirstNameChange(e: any): void {
        setFirstName(e.target.value);
    }
    function handleLastNameChange(e: any): void {
        setLastName(e.target.value);
    }

    return (
        <>
            <div className="w-full h-screen mx-auto px-4 sm:px-6 lg:px-0 flex justify-center items-center bg-nnBackground">
                {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
                <div className="w-full grid sm:grid-cols-1 md:grid-cols-[50%_50%] h-full 3xl:grid-cols-[32%_68%] ">
                    <div className="login-container bg-white w-full p-12 relative h-full flex items-center blur-none">
                        <form onSubmit={ createUser } className="w-full" >
                            <div className="space-y-12 w-full">
                                <div className="pb-4">
                                    <div className="flex justify-center items-center flex-col">
                                        <div className="mt-4 mb-20">
                                            <Link href="/">
                                                <img className="w-[240px] h-auto" src="/image/icon/ra-logo.png" alt="Logo Logo"  />
                                            </Link>
                                        </div>
                                        <span className="font-bold text-5xl text-raBlue -mt-4 mb-[30px] font-sans">{ "Get started for free!" }</span>
                                    </div>
                                    <div className="w-full flex items-center mt-7">
                                        <span className="text-raBlue font-sans text-xl" >{ "Already have an account?" }</span>
                                        <Link href="/account" className="text-xl font-semibold text-raGreen ml-2">
                                            { "Sign in" }
                                        </Link>
                                    </div>
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="col-span-full">
                                            <div className="w-full flex">
                                                <div className="w-1/2 pr-2 flex flex-col">
                                                    <label htmlFor="firstName" className="block text-xl font-medium text-raBlue">
                                                        First Name
                                                    </label>
                                                    <div className="mt-2">
                                                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                                            <input
                                                                id="firstName"
                                                                name="firstName"
                                                                type="text"
                                                                autoComplete="firstName"
                                                                value={ firstName }
                                                                onChange={ handleFirstNameChange }
                                                                placeholder="Enter your first name"
                                                                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-raBlue/80 placeholder:text-gray-400 focus:outline-none sm:text-xl h-[48px]"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-1/2 ml-2">
                                                    <label htmlFor="email" className="block text-xl font-medium text-raBlue">
                                                        Surname
                                                    </label>
                                                    <div className="mt-2">
                                                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                                            <input
                                                                id="surnam"
                                                                name="surname"
                                                                type="text"
                                                                autoComplete="surnam"
                                                                value={ lastName }
                                                                onChange={ handleLastNameChange }
                                                                placeholder="Surname"
                                                                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-raBlue/80 placeholder:text-gray-400 focus:outline-none sm:text-xl h-[48px]"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-full">
                                            <label htmlFor="email" className="block text-xl font-medium text-raBlue">
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
                                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-xl h-[48px]"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <div className="w-full flex justify-between">
                                                <label htmlFor="password" className="block text-xl font-medium text-raBlue">
                                                    Password
                                                </label>
                                                <Link href="/account/forgot-password" className="text-xl font-semibold text-raBlue hover:text-raGreen">
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
                                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-xl h-[48px]"
                                                    />
                                                    <div className="w-[60px] flex justify-center items-center cursor-pointer" onClick={ handleShowPasswordClick }>
                                                        { !showPassword &&
                                                            <EyeSlashIcon className="h-full text-raBlue fill-current w-[28px] h-[28px] hover:text-raGreen" />
                                                        }
                                                        { showPassword &&
                                                            <EyeIcon className="h-full text-raBlue fill-current w-[28px] h-[28px] hover:text-raGreen" />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                    bg-raGreen
                                    w-full
                                    h-[50px]
                                    px-3
                                    py-2
                                    text-3xl
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
                                    <span>{ "Create Account" }</span>
                                    { (loggingIn) &&
                                        <ArrowPathIcon className="animate-spin w-9 text-white fill-current ml-4" />
                                    }
                                    { (!loggingIn) &&
                                        <ArrowLongRightIcon className="w-9 pl-2 mt-1" />
                                    }
                                </button>

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