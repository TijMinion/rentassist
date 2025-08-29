import { HomePageHero } from '@/app/components/landing/HomePageHero';
import { HomePageTopCTA } from "@/app/components/landing/HomePageTopCTA";
import { HomePageFeatures } from "@/app/components/landing/HomePageFeatures";
import { HomePageSecondFeatures } from "@/app/components/landing/HomePageSecondFeatures";
import { HomePagePricing } from "@/app/components/landing/HomePagePricing";
import { HomePageFAQ } from "@/app/components/landing/HomePageFAQ";
import { DefaultLandingLayout } from "@/app/components/landing/DefaultLandingLayout";

export const HomePage = () => {

    return (
        <DefaultLandingLayout>
            <HomePageHero />
            <HomePageTopCTA />
            <HomePageSecondFeatures />
            <HomePagePricing />
            <HomePageFAQ />
            <HomePageFeatures />
        </DefaultLandingLayout>
    );
}