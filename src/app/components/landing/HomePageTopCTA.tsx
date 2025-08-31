import { JSX } from "react";
import { BoltIcon, ComputerDesktopIcon, WrenchScrewdriverIcon } from '@heroicons/react/20/solid';

export const HomePageTopCTA: () => JSX.Element = (): JSX.Element =>  {

    const features: { name: string, description: string, icon: any }[] = [
        {
            name: 'Automated Reminders',
            description:
                'Tenants get friendly email or SMS nudges before rent is due, on the day, and if it’s late. No more awkward chasing.',
            icon: BoltIcon,
        },
        {
            name: 'Clear Dashboard',
            description: 'See who’s paid and who hasn’t at a glance. Mark rent as paid with one click.',
            icon: ComputerDesktopIcon,
        },
        {
            name: 'Built for UK Landlords',
            description: 'Simple, compliant, and tailored to the way rent is paid in the UK — no bloated features you’ll never use',
            icon: WrenchScrewdriverIcon,
        },
    ]

    return (
        <div className="overflow-hidden bg-raBlue pb-24 sm:pb-32 lg:h-screen" id="features">
            <div className="mx-auto max-w-8xl px-6 lg:px-8 h-full">
                <div className="w-full ml-auto mr-auto flex items-center justify-center pb-20 pt-32">
                    <span className="text-white lg:text-5xl font-sans" >Everything you need to keep on top of late rental payments</span>
                </div>
                <div className="mx-auto flex max-w-2xl gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none">

                    <div className="lg:ml-auto lg:pt-4 lg:pl-4">
                        <div className="lg:max-w-lg">
                            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-raGreen sm:text-5xl">
                                Why RentAssist?
                            </p>
                            <p className="mt-6 text-lg/8 text-white">
                                Designed for landlords who don’t want the hassle of full property management software or letting agents.
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-white pr-1">
                                            <feature.icon aria-hidden="true" className="absolute top-1 left-0 size-7 text-raGreen" />
                                            {feature.name}
                                        </dt>{' '}
                                        <dd className="inline text-white">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <div className="flex items-start justify-end lg:ml-auto">
                        <img
                            alt="Product screenshot"
                            src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
                            width={2432}
                            height={1442}
                            className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 lg:w-5xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}