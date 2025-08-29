"use client";
import { useState, useEffect } from "react";
import Link from 'next/link'
import { useCmsBlock } from "@/app/components/cms/cms.hooks";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import DOMPurify from 'dompurify';
import '../styles/footer-terms.scss';

export const AccountPagesFooterTerms = () => {
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState<string>('')
    const { data, loading, error } = useCmsBlock("privacy_t_c");

    function handleButtonToggle(): void {
        setOpen(!open);
    }

    useEffect( () => {
        if (data !== undefined) {
            setContent(data.content)
        }
    }, [data] );

    return (
        <>
            <div className="ml-4 text-nnTextPurple cursor-pointer" onClick={ handleButtonToggle } >
                <span>{ "Privacy Policy" }</span>
            </div>
            <Dialog open={open} onClose={ handleButtonToggle } className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto">
                    <div className="flex min-h-full max-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="footer-terms
                            relative
                            transform
                            overflow-hidden
                            bg-white
                            px-4
                            pt-5
                            pb-4
                            text-left
                            shadow-xl
                            transition-all
                            data-closed:translate-y-4
                            data-closed:opacity-0
                            data-enter:duration-300
                            data-enter:ease-out
                            data-leave:duration-200
                            data-leave:ease-in
                            sm:my-8
                            sm:w-full
                            sm:max-w-lg
                            sm:p-6
                            lg:max-w-[49%]
                            data-closed:sm:translate-y-0
                            data-closed:sm:scale-95
                            "
                        >
                            <div className="sm:flex sm:items-start">

                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-nnDefaultBlue">
                                        { "Privacy policy & terms"  }
                                    </DialogTitle>
                                    <div className="mt-2 overflow-y-auto h-[40vh]">
                                        { (loading) &&
                                            <div className="">
                                                Loading...
                                            </div>
                                        }
                                        { (!loading) &&
                                            <div className="text-sm text-gray-5000" dangerouslySetInnerHTML={ { __html: DOMPurify.sanitize(content) } }  />
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={ handleButtonToggle }
                                    className="inline-flex w-full justify-center rounded-md border border-nnDefaultBlue cursor-pointer bg-nnDefaultBlue px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-white hover:text-nnDefaultBlue sm:ml-3 sm:w-auto"
                                >
                                    Agree
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={ handleButtonToggle }
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>

    );
}
