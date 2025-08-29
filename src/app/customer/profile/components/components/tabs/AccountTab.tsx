"use client";
import { useForm } from 'react-hook-form';

import IconCompany from '../images/account/company-icon.svg';
import IconWebsite from '../images/account/website-icon.svg';
import IconVat from '../images/account/vat-icon.svg';
import IconIndustry from '../images/account/industry-icon.svg';
import IconSicCode from '../images/account/sicCode-icon.svg';
import IconNumEmployees from '../images/account/employees-icon.svg';
import IconContact from '../images/account/contact-icon.svg';
import IconEmail from '../images/account/email-icon.svg';
import IconOther from '../images/account/other-icon.svg';

export const AccountTab = () => {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            company: '',
            vat: '',
            sicCode: '',
            website: '',
            industry: '',
            numberOfEmployees: '',
            contact: '',
            email: '',
            otherInformation: ''
        }
    });

    async function handleFormSubmit(data: any) {
        console.log(data);
        alert('Form Submitted - no data was changed')
    }

    return (
        <div className="account-tab w-full lg:shadow-md rounded bg-white p-[32px] border-1 border-gray-400">
            <div className="w-full">
                <span className="text-[#a8a4af]" >{ "About" }</span>
                <div className="w-full pt-6">
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="flex flex-col">
                            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="top-item w-full border border-gray-200 flex h-[44px] rounded-md">
                                    <div className="w-[32%] flex h-full items-center pl-4 border-r border-gray-200">
                                        <IconCompany />
                                        <span className="pl-4" >{ "Company" }</span>
                                    </div>
                                    <div className="h-full flex w-[68%]">
                                        <input className="w-full"
                                            type="text" autoComplete="off"
                                               { ...register('company') }
                                        />
                                    </div>
                                </div>
                                <div className="top-item w-full border border-gray-200 flex h-[44px] rounded-md">
                                    <div className="w-[32%] flex h-full items-center pl-4 border-r border-gray-200">
                                        <IconWebsite />
                                        <span className="pl-4" >{ "Website" }</span>
                                    </div>
                                    <div className="h-full flex w-[68%]">
                                        <input className="w-full" type="text" autoComplete="off"
                                               { ...register('website') }
                                        />
                                    </div>
                                </div>
                                <div className="top-item w-full border border-gray-200 flex h-[44px] rounded-md">
                                    <div className="w-[32%] flex h-full items-center pl-4 border-r border-gray-200">
                                        <IconVat />
                                        <span className="pl-4" >{ "VAT Number" }</span>
                                    </div>
                                    <div className="h-full flex w-[68%]">
                                        <input className="w-full" type="text" autoComplete="off"
                                               { ...register('vat') }
                                        />
                                    </div>
                                </div>
                                <div className="top-item w-full border border-gray-200 flex h-[44px] rounded-md">
                                    <div className="w-[32%] flex h-full items-center pl-4 border-r border-gray-200">
                                        <IconIndustry />
                                        <span className="pl-4" >{ "Industry" }</span>
                                    </div>
                                    <div className="h-full flex w-[68%]">
                                        <input className="w-full" type="text" autoComplete="off"
                                               { ...register('industry') }
                                        />
                                    </div>
                                </div>
                                <div className="top-item w-full border border-gray-200 flex h-[44px] rounded-md">
                                    <div className="w-[32%] flex h-full items-center pl-4 border-r border-gray-200">
                                        <IconSicCode />
                                        <span className="pl-4" >{ "SIC Code" }</span>
                                    </div>
                                    <div className="h-full flex w-[68%]">
                                        <input className="w-full" type="text" autoComplete="off"
                                               { ...register('sicCode') }
                                        />
                                    </div>
                                </div>
                                <div className="top-item w-full border border-gray-200 flex h-[44px] rounded-md">
                                     <div className="w-[42%] flex h-full items-center pl-4 border-r border-gray-200">
                                        <IconNumEmployees />
                                        <span className="pl-4" >{ "Number of Employees" }</span>
                                    </div>
                                    <div className="h-full flex w-[58%]">
                                        <input className="w-full" type="text" autoComplete="off"
                                               { ...register('numberOfEmployees') }
                                        />
                                    </div>
                                </div>
                            </div>
                            <span className="mt-[40px] mb-[25px] text-[#a8a4af]" >{ "CONTACTS" }</span>
                            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="bottom-item  w-full border border-gray-200 flex h-[44px] rounded-md">
                                    <div className="w-[32%] flex h-full items-center pl-4 border-r border-gray-200">
                                        <IconContact />
                                        <span className="pl-4" >{ "Contact" }</span>
                                    </div>
                                    <div className="h-full flex w-[68%]">
                                        <input className="w-full" type="text" autoComplete="off"
                                               { ...register('contact') }
                                        />
                                    </div>
                                </div>
                                <div className="bottom-item  w-full border border-gray-200 flex h-[44px] rounded-md">
                                    <div className="w-[32%] flex h-full items-center pl-4 border-r border-gray-200">
                                        <IconEmail />
                                        <span className="pl-4" >{ "Email" }</span>
                                    </div>
                                    <div className="h-full flex w-[68%]">
                                        <input className="w-full" type="text" autoComplete="off"
                                               { ...register('email') }
                                        />
                                    </div>
                                </div>
                                <div className="bottom-item  w-full border border-gray-200 flex h-[44px] rounded-md">
                                    <div className="w-[42%] flex h-full items-center pl-4 border-r border-gray-200">
                                        <IconOther />
                                        <span className="pl-4" >{ "Other Information" }</span>
                                    </div>
                                    <div className="h-full flex w-[58%]">
                                        <input className="w-full" type="text" autoComplete="off"
                                               { ...register('otherInformation') }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-actions w-full flex mt-9 justify-end">
                                <button type="button" className="bg-gray-200
                                cursor-pointer
                                px-7
                                py-2
                                mr-4
                                text-gray-400
                                rounded hover:text-nnDefaultBlue">
                                    <span>{ "Cancel" }</span>
                                </button>
                                <button type="submit" className="bg-nnDefaultBlue
                                px-7
                                py-2
                                cursor-pointer
                                text-white
                                rounded
                                hover:bg-white
                                hover:text-nnDefaultBlue
                                border
                                border-nnDefaultBlue">
                                    <span>{ "Save Changes" }</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}