import React from 'react';

const HowItWorksSection: React.FC = () => {
    return (
        <section
            className="py-18 px-6 md:py-12 bg-brand-gray-light"
            aria-labelledby="how-it-works-heading"
        >
            <h2
                id="how-it-works-heading"
                className="text-4xl md:text-6xl font-bold text-center mb-8 md:mb-12 text-black"
            >
                Three Clicks to Chaos
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 max-w-content-lg mx-auto">
                <div className="text-center p-6 lg:p-6">
                    <div className="text-5xl md:text-6xl mb-4">🎮</div>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-black">
                        Start a Party
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed text-brand-gray">
                        Click "Create a Game" and get your shareable party code instantly.
                    </p>
                </div>

                <div className="text-center p-6 lg:p-6">
                    <div className="text-5xl md:text-6xl mb-4">👥</div>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-black">
                        Share the Code
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed text-brand-gray">
                        Text, Discord, carrier pigeon—however you invite your terrible friends.
                    </p>
                </div>

                <div className="text-center p-6 lg:p-6">
                    <div className="text-5xl md:text-6xl mb-4">😈</div>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-black">
                        Judge the Worst Answers
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed text-brand-gray">
                        Take turns being the judge. Pick the funniest answer. Ruin friendships.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
