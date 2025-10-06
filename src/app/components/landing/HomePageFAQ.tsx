import { JSX } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'

const faqs = [
    {
        question: 'Do my tenants need to download an app?',
        answer:
            'No. RentAssist sends reminders by email or SMS — your tenants don’t need to install or sign up for anything.',
    },
    {
        question: 'What if my tenants already pay by standing order?',
        answer:
            'That’s great! RentAssist still helps by sending reminders and giving you a clear dashboard so you know who’s paid and who hasn’t.',
    },
    {
        question: 'Can RentAssist check my bank for payments automatically?',
        answer:
            'At the moment, landlords mark rent as paid with one click. We’re working on secure Open Banking integration to confirm payments automatically.',
    },
    {
        question: 'Is my data secure?',
        answer:
            'Yes. All data is encrypted and stored securely. We never share tenant details with third parties.',
    },
    {
        question: 'How much does it cost?',
        answer:
            'RentAssist is free for 1 tenant. For more, it’s just £9/month for up to 20 tenants.',
    },
    {
        question: 'What if I manage more than 20 tenants?',
        answer:
            'We’re building a Pro+ plan for larger landlords and property managers — join the waitlist to get early access.',
    },
]

export const HomePageFAQ: () => JSX.Element = (): JSX.Element => {
    return (
        <div className="bg-white" id="faq">
            <div className="mx-auto max-w-9xl px-6 py-24 sm:py-24 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-6xl font-semibold tracking-tight text-raBlue sm:text-6xl">
                        Frequently asked questions
                    </h2>
                    <dl className="mt-16 divide-y divide-gray-900/10">
                        {faqs.map((faq) => (
                            <Disclosure key={faq.question} as="div" className="py-6 first:pt-0 last:pb-0">
                                <dt>
                                    <DisclosureButton className="group flex w-full items-start justify-between text-left text-raBlue  cursor-pointer">
                                        <span className="text-2xl font-semibold">{faq.question}</span>
                                        <span className="ml-6 flex h-7 items-center">
                                          <PlusIcon aria-hidden="true" className="size-6 group-data-open:hidden" />
                                          <MinusIcon aria-hidden="true" className="size-6 group-not-data-open:hidden" />
                                        </span>
                                    </DisclosureButton>
                                </dt>
                                <DisclosurePanel as="dd" className="mt-2 pr-12">
                                    <p className="text-xl text-raBlue/80">{faq.answer}</p>
                                </DisclosurePanel>
                            </Disclosure>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}