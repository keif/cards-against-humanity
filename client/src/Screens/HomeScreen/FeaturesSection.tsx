import React from 'react';

const FeaturesSection: React.FC = () => {
    return (
        <section
            className="py-18 px-6 md:py-12 bg-white"
            aria-labelledby="features-heading"
        >
            <h2
                id="features-heading"
                className="text-4xl md:text-6xl font-bold text-center mb-8 md:mb-12 text-black"
            >
                All the Chaos, Zero Setup
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-content-lg mx-auto">
                <div className="text-center p-4 md:p-6">
                    <div className="text-5xl md:text-6xl mb-4">🌍</div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 text-black">
                        Play Anywhere
                    </h3>
                    <p className="text-base leading-relaxed text-brand-gray">
                        Friends across the country? Just send them the link.
                    </p>
                </div>

                <div className="text-center p-4 md:p-6">
                    <div className="text-5xl md:text-6xl mb-4">💸</div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 text-black">
                        Free Forever
                    </h3>
                    <p className="text-base leading-relaxed text-brand-gray">
                        No ads, no paywalls, no "premium" nonsense. Just play.
                    </p>
                </div>

                <div className="text-center p-4 md:p-6">
                    <div className="text-5xl md:text-6xl mb-4">🎲</div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 text-black">
                        Always Fresh
                    </h3>
                    <p className="text-base leading-relaxed text-brand-gray">
                        1,300+ cards from base game, expansions, and user submissions.
                    </p>
                </div>

                <div className="text-center p-4 md:p-6">
                    <div className="text-5xl md:text-6xl mb-4">📱</div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 text-black">
                        Works Everywhere
                    </h3>
                    <p className="text-base leading-relaxed text-brand-gray">
                        Phone, tablet, laptop—if it has a browser, you're in.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
