import React from 'react';
import HeroSection from './HeroSection';
import HowItWorksSection from './HowItWorksSection';
import FeaturesSection from './FeaturesSection';
import CommunitySection from './CommunitySection';
import FooterSection from './FooterSection';

const HomeScreen: React.FC = () => {
    return (
        <main id="main-content" className="w-full min-h-screen m-0 p-0">
            <HeroSection />
            <HowItWorksSection />
            <FeaturesSection />
            <CommunitySection />
            <FooterSection />
        </main>
    );
}

export default HomeScreen;
