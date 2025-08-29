import { Header } from "@/app/components/header/Header";
import { LandingFooter } from "@/app/components/footer/LandingFooter";

export const DefaultLandingLayout = (props: any) => {


    return (
        <>
            <Header />
            { props.children }
            <LandingFooter />
        </>
    );

}