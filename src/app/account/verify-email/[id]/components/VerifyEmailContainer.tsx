"use client";
import { JSX, useState, useEffect } from "react"
import { DefaultAccountPageWrapper } from "@/app/account/components/DefaultAccountPageWrapper";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import {ArrowPathIcon, ChevronLeftIcon} from "@heroicons/react/16/solid";

export const VerifyEmailContainer: (props: any) => JSX.Element = (props: any): JSX.Element => {
    const [processing, setProcessing] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const router: any = useRouter();
    if (typeof props.urlId !== "string" || props.urlId.length <= 0) {
        router.push('/');
    }

    async function processEmailVerification(): Promise<void> {
        if (!props) {
            return;
        }
        const url: string = '/api/customer/account/verify';
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
                if (data.data.status === 'error') {
                    setProcessing(false)
                    setError(data.data.message);
                    setTimeout( (): void => {
                        router.push('/');
                    }, 5000);
                }
                if (data.data.status === 'success') {
                    setProcessing(false);
                    if (data.data === undefined || data.data.email === undefined ) {
                        setError('Invalid data. Redirecting... ');
                        setTimeout( (): void => {
                            router.push('/');
                        }, 2000);
                    } else {
                        setSuccess(data.data.message);
                        setEmail(data.data.email);
                    }
                }
                if (data.data.status === 'expired') {
                    setProcessing(false);
                    setError('Verification link expired!')
                }
            })
            .catch( (error: Error): void => {
                console.log(error);
            });
    }

    useEffect( (): void => {
        ( async (): Promise<void> => {
            if (processing) {
                await processEmailVerification();
            }
        } )();
    }, [props.urlId] );

    return (
        <DefaultAccountPageWrapper>
            <div className="space-y-12">
                <div className="pb-4">
                    <div className="flex justify-center items-center flex-col">
                        <div className="-mt-4">
                            <Link href="/">
                                <img className="w-[200px] h-auto" src="/image/logo/nn-logo-white.png" alt="Logo Logo"  />
                            </Link>
                        </div>
                        <span className="font-bold text-2xl text-nnTextPurple mt-4 mb-2 w-full text-left">{ "Verify your email" }</span>
                        { (processing) &&
                            <div className="w-full flex items-center">
                                <ArrowPathIcon className=" size-8 animate-spin fill-nnDefaultPink" />
                                <span className="ml-4" >Verifying...</span>
                            </div>
                        }
                        { (!processing && success.length > 0) &&
                            <p className="text-xl text-left w-full text-nnTextPurple" >
                                { `Account verification using '${email}' completed successfully, thank you!` }
                            </p>
                        }
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-between flex-col gap-x-6">
                { (!processing && error.length > 0) &&
                    <div className="w-full px-4 text-center text-[red] mb-4">
                        { error }
                    </div>
                }
                { (!processing && success.length > 0) &&
                    <a  href="/account"
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
                        hover:bg-nnDefaultPink
                        focus-visible:outline-2
                        focus-visible:outline-offset-2
                        focus-visible:outline-nnDefaultPink
                        flex
                        justify-center
                        items-center
                        "
                    >
                        { "Sign In" }
                    </a>
                }
                <div className="w-full flex justify-center items-center mt-7">
                    <ChevronLeftIcon className="w-5 h-5 text-nnDefaultBlue fill-current" />
                    <Link href="/" className="text-md font-semibold text-nnDefaultBlue ml-2 ">
                        { "Back to Home" }
                    </Link>
                </div>
            </div>
        </DefaultAccountPageWrapper>
    );
}