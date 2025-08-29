"use client";
import {FormEvent, useEffect, useState} from 'react';
import { useSession } from "next-auth/react";
import { UserIcon } from "@heroicons/react/24/outline";
import { useForm } from 'react-hook-form';

export const ProfileBox = (props: any) => {
    const session = useSession();
    const [ enableEdit, setEnableEdit ] = useState<boolean>(true);
    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: session?.data?.user?.email ?? '',
            phone: '01234 567891',
            address: '1 A Street, Somewhere AA1 1AA',
            country: 'A Country'
        }
    });

    async function handleFormSubmit(data: any) {
        console.log(data);
    }

    function handleFormEditClick() {
        setEnableEdit(!enableEdit);
    }

    return (
        <div className="w-full bg-white lg:h-[73%] border-1 border-gray-400 p-[32px] rounded-md lg:shadow-md flex flex-col lg:min-h-[678px] lg:max-h-[678px]">
            <div className="profile-avatar-container w-full h-[51%]">
                { (session?.status === 'authenticated') &&
                    <div className="w-full h-full flex justify-center items-center flex-col">
                        <div className="image-container relative w-[135px] h-[135px] rounded-md oveflow-hidden">
                            <div className="absolute w-[135px] h-[135px] bg-[#525d91] rounded-md oveflow-hidden"></div>
                            <div className="absolute w-[108px] h-[108px] bg-[#868eb2] top-[13.5px] left-[13.5px] rounded-md oveflow-hidden"></div>
                            <div className="absolute w-[135px] h-[135px] rounded-md oveflow-hidden">
                                { (session?.data?.user?.image) &&
                                    <div className="w-full h-full flex justify-center items-center rounded-md overflow-hidden">
                                        <img src={ ( session.data.user.image ) }
                                             className="max-w-[100%] max-h-[100%]"
                                             alt="" />
                                    </div>

                                }
                                { (!session?.data?.user?.image) &&
                                    <div className="w-full h-full flex justify-center items-center">
                                        <UserIcon className="max-w-[70%] max-h-[70%] fill-white"/>
                                    </div>

                                }
                            </div>
                        </div>
                        <div className="w-full pt-[30px] text-center text-[24px]">
                            <span className="">{ session?.data?.user?.name }</span>
                        </div>
                        <div className="w-full text-center pt-[27px]">
                            <span className="bg-gray-100 rounded-sm px-[15px] py-[8px] text-gray-300" >{ 'Author' }</span>
                        </div>
                    </div>
                }
            </div>
            <div className="w-full h-[2px] bg-gray-200" />
            <div className="w-full h-[49%]">
                <div className="form-container w-full h-full flex flex-col">
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="w-full flex flex-col pt-[40px]">
                            <div className="w-full flex justify-between">
                                <span className="text-gray-500" >{ "Details" }</span>
                                <button type="button"
                                        onClick={ handleFormEditClick }
                                        className="cursor-pointer">
                                    <span className="text-nnTextPurple" >{ "Edit Profile" }</span>
                                </button>
                            </div>
                            <div className="w-full flex mt-[24px]">
                                <span className="mr-[10px] font-bold text-nnTextPurple" >{ "Email:" }</span>
                                <input type="text"
                                       disabled={ enableEdit }
                                       className={ (!enableEdit ? 'border-gray-300' : 'border-white') + ' border-b  px-2 w-full text-gray-600' }
                                       { ...register('email') } />
                            </div>
                            <div className="w-full flex mt-[24px]">
                                <span className="mr-[10px] font-bold text-nnTextPurple" >{ "Contact:" }</span>
                                <input type="text"
                                       disabled={ enableEdit }
                                       className={ (!enableEdit ? 'border-gray-300' : 'border-white') + ' border-b  px-2 w-full text-gray-600' }
                                       { ...register("phone") }
                                />
                            </div>
                            <div className="w-full flex  mt-[24px]">
                                <span className="mr-[10px] font-bold text-nnTextPurple" >{ "Address:" }</span>
                                <input type="text"
                                       className={ (!enableEdit ? ' border-gray-300' : 'border-white') + ' border-b  px-2 w-full text-gray-600' }
                                       disabled={ enableEdit }
                                       { ...register("address") }
                                />
                            </div>
                            <div className="w-full flex mt-[24px]">
                                <span className="mr-[10px] font-bold text-nnTextPurple" >{ "Status:" }</span>
                                <div className="">
                                    <span>{ "Active" }</span>
                                </div>
                            </div>
                            <div className="w-full flex mt-[24px]">
                                <span className="mr-[10px] font-bold text-nnTextPurple" >{ "Country:" }</span>
                                <input type="text"
                                       disabled={ enableEdit }
                                       className={ (!enableEdit ? 'border-gray-300' : 'border-white') + ' border-b  px-2 w-full text-gray-600' }
                                       { ...register("country") }
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}