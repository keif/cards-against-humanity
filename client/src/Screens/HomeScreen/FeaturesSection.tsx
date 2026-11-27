import React from 'react';

const facts = [
    { term: 'Play anywhere', detail: 'Friends across the country? Send them the link and get on a call.' },
    { term: 'Free forever', detail: 'No ads, no paywalls, no "premium" nonsense. Just play.' },
    { term: '1,300+ cards', detail: 'The base game, expansions, and player submissions that survived moderation.' },
    { term: 'Any device', detail: 'Phone, tablet, laptop. If it has a browser, you\'re in.' },
];

const FeaturesSection: React.FC = () => {
    return (
        <section className="px-4 md:px-8 py-16 border-t-2 border-table-line" aria-labelledby="features-heading">
            <div className="max-w-content-lg mx-auto grid gap-10 lg:grid-cols-[1fr_1.4fr] items-start">
                <h2
                    id="features-heading"
                    className="font-display font-extrabold [font-stretch:80%] text-[clamp(2rem,5vw,3rem)] leading-none tracking-[-0.015em] m-0"
                >
                    All the chaos, zero setup
                </h2>
                <dl className="m-0 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                    {facts.map((fact) => (
                        <div key={fact.term}>
                            <dt className="font-display font-bold text-[22px] leading-tight mb-1">{fact.term}</dt>
                            <dd className="m-0 text-muted leading-normal">{fact.detail}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
};

export default FeaturesSection;
