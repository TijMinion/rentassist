"use client";
import { JSX, SVGProps } from "react"
import Image from "next/image";

type NavItem = {
    name: string,
    href: string,
}


const navigation: NavItem[] = [
        { name: 'Features', href: 'features' },
        { name: 'Pricing', href: 'pricing' },
        { name: 'FAQ', href: 'faq' },
    ];

export const LandingFooter = () => {
    const today = new Date();

    function scrollToSection(section: string): void {
        const element = document.getElementById(section);
        element?.scrollIntoView({ behavior: 'smooth' });
    }


    return (
        <footer className="bg-raGreen">
            <div className="mx-auto max-w-9xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
                <nav aria-label="Footer" className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-xl">
                    { navigation.map((item: NavItem, index: number): JSX.Element => {
                        return (
                            <span key={item.name}
                                  onClick={ () => scrollToSection(item.href) }
                                  className="text-white hover:text-raBlue cursor-pointer">
                                {item.name}
                            </span>
                        );
                    })}
                </nav>
                <p className="mt-10 text-center text-xl text-white">&copy; { ` ${ today.getFullYear() } DigiHall trading as RentAssist. All rights reserved.` } </p>
            </div>
        </footer>
    )
}