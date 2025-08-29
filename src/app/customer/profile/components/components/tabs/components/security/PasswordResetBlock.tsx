"use client";
import { useForm } from 'react-hook-form';

export const PasswordResetBlock = () => {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            password: '',
            newPassword: '',
            confirmPassword: '',
        }
    });

    async function handleFormSubmit(data: any) {
        console.log(data);
        alert('Form Submitted - no data was changed')
    }
    return (
        <div className="security-tab w-full lg:shadow-md rounded bg-white p-[32px] border-1 border-gray-400 lg:h-[555px]">
            <form onSubmit={ handleSubmit(handleFormSubmit) }>
                <div className="flex flex-col">
                    <span className="text-2xl font-bold text-nnTextPurple" >{ "Profile Details" }</span>
                    <div className="flex flex-col mb-5 mt-10">
                        <div className="grid md:grid-cols-1 lg:grid-cols-2 w-full gap-4 mb-5">
                            <div className="w-full flex flex-col">
                                <span className="mb-2 text-lg text-nnTextPurple" >{ "Current Password" }</span>
                                <input
                                    className="w-full border border-gray-300 h-[48px] border border-gray-300 rounded-md px-4"
                                    type="text"
                                       { ...register("password") }
                                />
                            </div>
                        </div>
                        <div className="flex w-full">
                            <div className="grid md:grid-cols-1 lg:grid-cols-2 w-full gap-4 mb-5">
                                <div className="flex flex-col w-full">
                                    <span className="mb-2 text-lg text-nnTextPurple" >{ "New Password" }</span>
                                    <input
                                        className="w-full border border-gray-300 h-[48px] border border-gray-300 rounded-md px-4"
                                        type="text"
                                           { ...register("newPassword") }
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <span className="mb-2 text-lg text-nnTextPurple" >{ "Confirm New Password" }</span>
                                    <input
                                        className="w-full border border-gray-300 h-[48px] border border-gray-300 rounded-md px-4"
                                        type="text"
                                           { ...register("confirmPassword") }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-actions ">
                    <div className="flex flex-col">
                        <span className="mb-1 text-md text-nnTextPurple font-bold">{ "Password Requirements" }</span>
                        <ul className="list-disc pl-4 mt-5">
                            <li>
                                <span className="text-nnTextPurple text-md" >{ "Minimum 8 characters long - the more the better" }</span>
                            </li>
                            <li>
                                <span className="text-nnTextPurple text-md" >{ "At least one lowercase character" }</span>
                            </li>
                            <li>
                                <span className="text-nnTextPurple text-md" >{ "At least one number or symbol" }</span>
                            </li>
                        </ul>
                    </div>
                    <div className="form-actions w-full flex mt-7 ">
                        <button type="submit" className="bg-nnDefaultBlue
                                px-7
                                py-2
                                mr-4
                                cursor-pointer
                                text-white
                                rounded
                                hover:bg-white
                                hover:text-nnDefaultBlue
                                border
                                border-nnDefaultBlue">
                            <span>{ "Save Changes" }</span>
                        </button>
                        <button type="button" className="bg-gray-200
                                cursor-pointer
                                px-7
                                py-2
                                mr-2
                                text-gray-400
                                rounded hover:text-nnDefaultBlue">
                            <span>{ "Cancel" }</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}