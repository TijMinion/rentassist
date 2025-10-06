import { JSX } from 'react';

export const HomePageSecondFeatures: () => JSX.Element = (): JSX.Element => {
    return (
        <div className="bg-raGreen">
            <div className="mx-auto max-w-9xl px-6 py-24 sm:py-32 lg:px-8">
                <h2 className="w-full text-4xl font-semibold tracking-tight text-balance text-raBlue sm:text-5xl font-sans">
                    Try RentAssist free today - set up your first tenant in minutes.
                </h2>
                <div className="mt-10 flex items-center gap-x-6">
                    <a
                        href="/account/register"
                        className="rounded-md
                        bg-raBlue
                        px-3.5
                        py-2.5
                        text-2xl
                        font-semibold
                        text-white
                        shadow-xs
                        hover:bg-gray-600
                        "
                    >
                        Get started
                    </a>
                    <a href="#" className="text-2xl font-semibold text-gray-900">
                        Learn more <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
        </div>
    )
}