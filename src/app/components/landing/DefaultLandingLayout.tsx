import { JSX } from 'react';
import { Header } from "@/app/components/header/Header";
import { LandingFooter } from "@/app/components/footer/LandingFooter";

export const DefaultLandingLayout: (props: any) => JSX.Element = (props: any): JSX.Element => {
    return (
        <>
            <Header />
            { props.children }
            <LandingFooter />
        </>
    );
}