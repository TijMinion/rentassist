'use client'
import { JSX } from 'react';

export const  HomePageHero: () => JSX.Element = (): JSX.Element => {

    function scrollToSection(section: string): void {
        const element: HTMLElement|null = document.getElementById(section);
        element?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className="bg-[url(/image/rent-assist-hero-background.jpg)] bg-center bg-cover bg-white/80 bg-blend-overlay">
            <div className="relative isolate px-6 pt-14 lg:px-8 h-full">
                {/*<div*/}
                {/*    aria-hidden="true"*/}
                {/*    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"*/}
                {/*>*/}
                {/*    <div*/}
                {/*        style={{*/}
                {/*            clipPath:*/}
                {/*                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',*/}
                {/*        }}*/}
                {/*        className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"*/}
                {/*    />*/}
                {/*</div>*/}
                <div className="mx-auto max-w-9xl pt-32 pb-12 sm:py-48 lg:py-56 h-full flex items-center">
                    <div className="text-center mx-auto">
                        <h1 className="text-8xl font-semibold tracking-tight text-raBlue sm:text-8xl font-sans">
                            Never chase <span className="text-raGreen" >rent</span> again
                        </h1>
                        <p className="mt-8 text-lg font-medium text-pretty text-raBlue/80 sm:text-4xl font-sans max-w-7xl mx-auto">
                            { "RentAssist automatically reminds tenants when rent is due and alerts you if it’s late - saving landlords time, stress, and awkward conversations." }
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="/account/register"
                                className="rounded-md
                                bg-raGreen
                                px-3.5
                                py-2.5
                                text-2xl
                                font-semibold
                                font-sans
                                text-white
                                shadow-xs
                                hover:bg-raBlue
                                focus-visible:outline-2
                                focus-visible:outline-offset-2
                                focus-visible:outline-raBlue"
                            >
                                Get started
                            </a>
                            <a href="#" onClick={ () => scrollToSection('features') } className="text-3xl font-semibold text-gray-900 font-sans">
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>
                        <p className="mt-40 text-xl font-medium text-pretty text-raBlue/80 sm:text-2xl font-sans">
                            Perfect for <span className="text-raGreen font-semibold" >UK landlords with 1 - 20 properties.</span> No complicated software, just simple reminders that work.
                        </p>
                    </div>
                </div>
                {/*<div*/}
                {/*    aria-hidden="true"*/}
                {/*    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"*/}
                {/*>*/}
                {/*    <div*/}
                {/*        style={{*/}
                {/*            clipPath:*/}
                {/*                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',*/}
                {/*        }}*/}
                {/*        className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"*/}
                {/*    />*/}
                {/*</div>*/}
            </div>
        </div>
    )
}