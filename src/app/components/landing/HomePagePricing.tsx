import { JSX } from 'react'
import { PlusIcon } from '@heroicons/react/16/solid';

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

export const HomePagePricing: () => JSX.Element = (): JSX.Element => {
    return (
        <div className="bg-white pt-24 sm:pt-24" id="pricing">
            <div className="mx-auto max-w-9xl px-6 max-lg:text-center lg:max-w-9xl lg:px-8">
                <h1 className="text-5xl font-semibold tracking-tight text-balance text-raBlue sm:text-7xl lg:text-pretty">
                    { "Simple pricing, no hidden fees." }
                </h1>
                <p className="mt-6 max-w-2xl text-lg font-medium text-pretty text-raBlue/80 max-lg:mx-auto sm:text-4xl">
                    { "Start free today — no card required." }
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
                <div className="relative mx-auto max-w-2xl px-6 lg:max-w-9xl lg:px-8">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 pb-60" >
                        {tiers.map((tier, index: number) => (
                            <div
                                key={tier.name}
                                className="-m-2
                                grid
                                grid-cols-1
                                rounded-4xl
                                bg-white/2.5
                                shadow-[inset_0_0_2px_1px_#ffffff4d]
                                ring-1
                                ring-raGreen
                                max-lg:mx-auto
                                max-lg:w-full
                                max-lg:max-w-md
                                hover:ring-raBlue
                                "
                            >
                                <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/5">
                                    <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
                                        <h2 className="text-4xl font-semibold text-raGreen">
                                            {tier.name} <span className="sr-only">plan</span>
                                        </h2>
                                        <p className="mt-2 text-2xl text-pretty text-raBlue/80 h-15">{tier.description}</p>
                                        <div className="mt-8 flex items-center gap-4">
                                            <div className="text-5xl font-semibold text-raBlue">{tier.priceMonthly}</div>
                                            { (index == 1) &&
                                                <div className="text-2xl text-raBlue/80">
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
                                                text-2xl
                                                font-semibold
                                                text-white
                                                shadow-xs
                                                hover:bg-raBlue
                                                focus-visible:outline-2
                                                focus-visible:outline-offset-2
                                                focus-visible:outline-raBlue
                                                "
                                            >
                                                { "Get Started" }
                                            </a>
                                        </div>
                                        <div className="mt-8">
                                            <h3 className="text-2xl font-medium text-raBlue">{ "Start selling with:" }</h3>
                                            <ul className="mt-3 space-y-3">
                                                {tier.highlights.map((highlight) => (
                                                    <li
                                                        key={highlight.description}
                                                        data-disabled={highlight.disabled}
                                                        className={ "group flex items-start gap-4 text-2xl text-raBlue/80 " + (highlight.disabled ? ' data-disabled:text-gray-400': '' ) }
                                                    >
                                                        <span className="inline-flex h-6 items-center">
                                                          <PlusIcon
                                                              aria-hidden="true"
                                                              className="size-6 text-raGreen group-data-disabled:fill-raGreen"
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