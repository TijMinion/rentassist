"use client";
import { useState, JSX, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AccountPageFooter } from "@/app/account/components/AccountPagesFooter";
import IconTop from "@/app/account/components/images/top-image.svg";
import IconBottom from "@/app/account/components/images/bottom-image.svg";
import Link from "next/link";
import {ChevronLeftIcon, EyeIcon, EyeSlashIcon, ArrowPathIcon} from "@heroicons/react/16/solid";

export const ResetPasswordContainer: (props: any) => JSX.Element = (props: any): JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [disableAll, setDisableAll] = useState<boolean>(false);
    const [userData, setUserData] = useState<any>();
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const router: any = useRouter();
    if (typeof props.urlId !== "string" || props.urlId.length <= 0) {
        router.push('/');
    }

    function handlePasswordChange(e: any): void {
        const pass: string = e.target.value;
        setPassword(pass)
    }

    function handlePasswordConfirmChange(e: any): void {
        const pass: string = e.target.value;
        setConfirmPassword(pass);
    }

    function handleShowPasswordClick(): void {
        setShowPassword(!showPassword);
    }

    function handleShowPasswordConfirmClick(): void {
        setShowPasswordConfirm(!showPasswordConfirm);
    }

    function handleForgotPasswordReset(e: any): void {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Both passwords need to match!')
        } else {
            if (password === undefined || password === '' || userData === undefined || loading) {
                return;
            }


            const url: string = '/api/password/reset';
            let payload = {
                password: password,
                userData: userData
            };
            const request: Request = new Request(url,{
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' },
            });

            fetch(request)
                .then( (response: Response): Promise<any> => {
                    return response.json()
                })
                .then( (data: any): void => {
                    if (data.status === 'error') {
                        setLoading(false)
                        setError(data.message)
                        setTimeout( (): void => {
                            router.push('/');
                        }, 1500);
                    }
                    if (data.status === 'success') {
                        setLoading(false);
                        setSuccess('Password reset successfully! Redirecting to login...');
                        setTimeout( (): void => {
                            router.push('/account');
                        }, 3000);
                    }
                })
                .catch( (error: Error): void => {
                    console.log(error);
                });
        }
    }

    async function handleAuthentication(): Promise<void> {
        if (!props) {
            return;
        }

        const url: string = '/api/password/reset/process';
        const request: Request = new Request(url,{
            method: 'POST',
            body: JSON.stringify({ 'payload': props.urlId }),
            headers: { 'Content-Type': 'application/json' },
        });

        fetch(request)
            .then( (response: Response): Promise<any> => {
                return response.json()
            })
            .then( (data: any): void => {
                if (data.status === 'error') {
                    setLoading(false)
                    setError(data.message);
                    setTimeout( (): void => {
                        router.push('/');
                    }, 5000);
                }
                if (data.status === 'success') {
                    setLoading(false);
                    if (data.data === undefined || data.data.email === undefined ) {
                        setError('Invalid data. Redirecting... ');
                        setEmail('Unknown');
                        setTimeout( (): void => {
                            router.push('/');
                        }, 2000);
                    } else {
                        setEmail(data.data.email);
                        setUserData(data.data);
                    }
                }
                if (data.status === 'expired') {
                    setLoading(false);
                    setDisableAll(true);
                }
            })
            .catch( (error: Error): void => {
                console.log(error);
            });
    }

    useEffect( (): void => {
        ( async (): Promise<void> => {
            if (userData === undefined && props.urlId !== "") {
                await handleAuthentication();
            }
        } )();
    }, [props.urlId] );

    return (
        <>
            <div className="w-full h-screen mx-auto px-4 sm:px-6 lg:px-0 flex justify-center items-center">
                <div className="w-full grid sm:grid-cols-1 md:grid-cols-[50%_50%] h-full 3xl:grid-cols-[32%_68%] ">
                    <div className="reset-password-container bg-white  w-full lg:max-w-[600px] lg:min-w-[600px] rounded shadow-lg p-12 relative">
                        <form onSubmit={ handleForgotPasswordReset }>
                            <div className="space-y-12 w-full">
                                <div className="pb-4">
                                    <div className="flex justify-center items-center flex-col">
                                        <div className="mt-4 mb-20">
                                            <Link href="/">
                                                <img className="w-[200px] h-[80px]" src="/image/icon/ra-logo.png" alt="Logo Logo"  />
                                            </Link>
                                        </div>
                                        { (!disableAll) &&
                                            <>
                                                <span className="font-bold text-2xl text-raBlue mt-4 mb-2 w-full text-left">{ "Reset Password" }</span>
                                                { (loading) &&
                                                    <div className="w-full flex items-center">
                                                        <ArrowPathIcon className=" size-8 animate-spin fill-raGreen" />
                                                        <span className="ml-4" >Loading...</span>
                                                    </div>

                                                }
                                                { (!loading) &&
                                                    <p className="text-xl text-left w-full text-raBlue" >
                                                        { `for ${email}` }
                                                    </p>
                                                }
                                            </>
                                        }
                                    </div>
                                    { (!disableAll) &&
                                        <>
                                            <div className="col-span-full mt-4">
                                                <div className="w-full flex justify-between">
                                                    <label htmlFor="password" className="block text-sm/6 font-medium text-raBlue">
                                                        New Password
                                                    </label>
                                                </div>

                                                <div className="mt-2">
                                                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                                        <input
                                                            id="password"
                                                            name="password"
                                                            type={ !showPassword ? "password" : 'text' }
                                                            autoComplete="password"
                                                            value={ password }
                                                            disabled={ loading || (success.length > 0) }
                                                            onChange={ handlePasswordChange }
                                                            placeholder="Enter your password"
                                                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 h-[48px]"
                                                        />
                                                        <div className="w-[60px] flex justify-center items-center cursor-pointer" onClick={ handleShowPasswordClick }>
                                                            { !showPassword &&
                                                                <EyeSlashIcon className="h-full fill-raBlue fill-current w-[28px] h-[28px]  hover:fill-raGreen" />
                                                            }
                                                            { showPassword &&
                                                                <EyeIcon className="h-full fill-raBlue fill-current w-[28px] h-[28px]  hover:fill-raGreen" />
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-full mt-4">
                                                <div className="w-full flex justify-between">
                                                    <label htmlFor="password" className="block text-sm/6 font-medium text-raBlue">
                                                        Confirm Password
                                                    </label>
                                                </div>

                                                <div className="mt-2">
                                                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                                        <input
                                                            id="password"
                                                            name="password"
                                                            type={ !showPasswordConfirm ? "password" : 'text' }
                                                            autoComplete="password"
                                                            value={ confirmPassword }
                                                            onChange={ handlePasswordConfirmChange }
                                                            placeholder="Enter your password"
                                                            disabled={ loading || (success.length > 0) }
                                                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 h-[48px]"
                                                        />
                                                        <div className="w-[60px] flex justify-center items-center cursor-pointer" onClick={ handleShowPasswordConfirmClick }>
                                                            { !showPasswordConfirm &&
                                                                <EyeSlashIcon className="h-full fill-raBlue fill-current w-[28px] h-[28px] hover:fill-raGreen" />
                                                            }
                                                            { showPasswordConfirm &&
                                                                <EyeIcon className="h-full fill-raBlue fill-current w-[28px] h-[28px] hover:fill-raGreen" />
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }

                                    { (disableAll) &&
                                        <div className="w-full text-[red] mt-6 text-center">
                                            <span>{ "Unfortunately, the reset link has expired, please follow reset at sign in " }</span>
                                        </div>
                                    }

                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between flex-col gap-x-6">
                                { (error !== '') &&
                                    <span className="w-full px-4 text-center text-[red] mb-4">
                                        { error }
                                    </span>
                                }
                                { (success !== '') &&
                                    <span className="w-full px-4 text-center text-[green] mb-4">
                                        { success }
                                    </span>
                                }
                                { (!disableAll) &&
                                    <button
                                        type="submit"
                                        disabled={ loading || (success.length > 0) }
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
                                        { "Set New Password" }
                                    </button>
                                }

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