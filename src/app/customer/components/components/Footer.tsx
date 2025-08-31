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

export const Footer: () => JSX.Element = (): JSX.Element => {
    const today = new Date();

    function scrollToSection(section: string): void {
        const element = document.getElementById(section);
        element?.scrollIntoView({ behavior: 'smooth' });
    }


    return (
        <footer className="bg-raGreen dark:bg-raBlueDarker__30_percent">
            <div className="mx-auto max-w-7xl overflow-hidden px-8 py-10 sm:py-4 lg:px-8">
                <nav aria-label="Footer" className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6">
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
                <p className="mt-10 text-center text-sm/6 text-white">&copy; { ` ${ today.getFullYear() } DigiHall trading as RentAssist. All rights reserved.` } </p>
            </div>
        </footer>
    )
}