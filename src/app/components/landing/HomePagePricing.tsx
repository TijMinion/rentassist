import { Fragment } from 'react'
import { CheckIcon, MinusIcon, PlusIcon } from '@heroicons/react/16/solid'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

const tiers = [
    {
        name: 'Free',
        description: 'Perfect to try it out',
        priceMonthly: 'Free',
        href: '/account/register',
        highlights: [
            { description: '1 tenant', disabled: false },
            { description: 'Automated email reminders', disabled: false },
            { description: 'Landlord dashboard', disabled: false },
            { description: 'Email support', disabled: false },
        ],
    },
    {
        name: 'Pro',
        description: 'For small landlords who want peace of mind.',
        priceMonthly: '£9.00',
        href: '/account/register',
        highlights: [
            { description: 'Up to 20 tenants', disabled: false },
            { description: 'Email + SMS reminders', disabled: false },
            { description: 'Landlord dashboard & reports', disabled: false },
            { description: 'Priority support', disabled: false },
        ],
    },
    {
        name: 'Pro+',
        description: 'Coming soon — join the waitlist.',
        priceMonthly: 'TBD',
        href: '/account/register',
        highlights: [
            { description: 'Unlimited tenants', disabled: true },
            { description: 'Advanced notifications (WhatsApp, custom messages)', disabled: true },
            { description: 'Compliance reminders (gas safety, EPC)', disabled: true },
            { description: 'Open Banking payment checks', disabled: true }
        ],
    },
]
const sections = [
    {
        name: 'Features',
        features: [
            { name: 'Edge content delivery', tiers: { Starter: true, Growth: true, Scale: true } },
            { name: 'Custom domains', tiers: { Starter: '1', Growth: '3', Scale: 'Unlimited' } },
            { name: 'Team members', tiers: { Starter: '3', Growth: '20', Scale: 'Unlimited' } },
            { name: 'Single sign-on (SSO)', tiers: { Starter: false, Growth: false, Scale: true } },
        ],
    },
    {
        name: 'Reporting',
        features: [
            { name: 'Advanced analytics', tiers: { Starter: true, Growth: true, Scale: true } },
            { name: 'Basic reports', tiers: { Starter: false, Growth: true, Scale: true } },
            { name: 'Professional reports', tiers: { Starter: false, Growth: false, Scale: true } },
            { name: 'Custom report builder', tiers: { Starter: false, Growth: false, Scale: true } },
        ],
    },
    {
        name: 'Support',
        features: [
            { name: '24/7 online support', tiers: { Starter: true, Growth: true, Scale: true } },
            { name: 'Quarterly workshops', tiers: { Starter: false, Growth: true, Scale: true } },
            { name: 'Priority phone support', tiers: { Starter: false, Growth: false, Scale: true } },
            { name: '1:1 onboarding tour', tiers: { Starter: false, Growth: false, Scale: true } },
        ],
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const HomePagePricing = () => {
    return (
        <div className="bg-white py-24 sm:py-32" id="pricing">
            <div className="mx-auto max-w-4xl px-6 max-lg:text-center lg:max-w-7xl lg:px-8">
                <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-950 sm:text-6xl lg:text-pretty">
                    Simple pricing, no hidden fees.
                </h1>
                <p className="mt-6 max-w-2xl text-lg font-medium text-pretty text-gray-600 max-lg:mx-auto sm:text-xl/8">
                    Start free today — no card required.
                </p>
            </div>
            <div className="relative pt-16 sm:pt-24">
                <div className="absolute
                inset-x-0
                top-48
                bottom-0
                bg-[radial-gradient(circle_at_center_center,#0c2548,#0c2548,#030712_70%)]
                lg:bg-[radial-gradient(circle_at_center_150%,#0c2548,#0c2548,#030712_70%)]
                " />
                <div className="relative mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 pb-60" >
                        {tiers.map((tier, index: number) => (
                            <div
                                key={tier.name}
                                className="-m-2 grid grid-cols-1 rounded-4xl bg-white/2.5 shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-raGreen/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md"
                            >
                                <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/5">
                                    <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
                                        <h2 className="text-md font-semibold text-raGreen">
                                            {tier.name} <span className="sr-only">plan</span>
                                        </h2>
                                        <p className="mt-2 text-sm/6 text-pretty text-gray-600">{tier.description}</p>
                                        <div className="mt-8 flex items-center gap-4">
                                            <div className="text-5xl font-semibold text-gray-950">{tier.priceMonthly}</div>
                                            { (index == 1) &&
                                                <div className="text-sm text-gray-600">
                                                    <p>per month</p>
                                                </div>
                                            }

                                        </div>
                                        <div className="mt-8">
                                            <a
                                                href={tier.href}
                                                aria-label={`Start a free trial on the ${tier.name} plan`}
                                                className="inline-block
                                                rounded-md
                                                bg-raGreen
                                                px-3.5
                                                py-2
                                                text-center
                                                text-sm/6
                                                font-semibold
                                                text-white
                                                shadow-xs
                                                hover:bg-raBlue
                                                focus-visible:outline-2
                                                focus-visible:outline-offset-2
                                                focus-visible:outline-raBlue
                                                "
                                            >
                                                Get Started
                                            </a>
                                        </div>
                                        <div className="mt-8">
                                            <h3 className="text-sm/6 font-medium text-gray-950">Start selling with:</h3>
                                            <ul className="mt-3 space-y-3">
                                                {tier.highlights.map((highlight) => (
                                                    <li
                                                        key={highlight.description}
                                                        data-disabled={highlight.disabled}
                                                        className={ "group flex items-start gap-4 text-sm/6 text-gray-600 " + (highlight.disabled ? ' data-disabled:text-gray-400': '' ) }
                                                    >
                                                        <span className="inline-flex h-6 items-center">
                                                          <PlusIcon
                                                              aria-hidden="true"
                                                              className="size-4 fill-gray-400 group-data-disabled:fill-gray-300"
                                                          />
                                                        </span>
                                                        {highlight.disabled ? <span className="sr-only">Not included:</span> : null}
                                                        {highlight.description}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    )
}