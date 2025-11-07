import React from 'react';

const CommunitySection: React.FC = () => {
    return (
        <section
            className="py-18 px-6 md:py-12 bg-brand-gray-light"
            aria-labelledby="community-heading"
        >
            <div className="max-w-content-md mx-auto text-center">
                <h2
                    id="community-heading"
                    className="text-4xl md:text-6xl font-bold text-center mb-8 md:mb-12 text-black"
                >
                    Play Responsibly (or Don't)
                </h2>

                <div className="mb-8">
                    <p className="text-base md:text-lg leading-relaxed text-brand-gray-dark mb-4">
                        This game is deliberately offensive. That's the point.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed text-brand-gray-dark mb-4">
                        Private rooms mean you control who plays. If someone's ruining the vibe, kick them.
                        User-submitted cards are moderated to keep things funny, not hateful.
                    </p>
                    <p className="text-base md:text-lg font-semibold italic text-black">
                        We're terrible people with standards.
                    </p>
                </div>

                <div
                    className="inline-flex flex-col md:flex-row items-center gap-3 md:gap-3 px-4 md:px-6 py-4 bg-brand-warning rounded-lg text-sm md:text-base font-semibold text-brand-gray-dark"
                    role="alert"
                >
                    <span className="text-xl">⚠️</span>
                    <span className="text-center md:text-left">
                        Contains mature humor and NSFW content. 18+ recommended.
                    </span>
                </div>
            </div>
        </section>
    );
};

export default CommunitySection;
