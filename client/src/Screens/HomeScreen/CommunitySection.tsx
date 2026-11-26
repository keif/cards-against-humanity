import React from 'react';
import { Link } from 'react-router-dom';

// DESIGN.md: the content warning is a voiced insert printed on paper, never a yellow alert box.
const sideEffects = [
    'Contains sex, drugs, death, and your coworkers.',
    'Intended for adults (18+).',
    'May cause involuntary snorting.',
    'May reveal which friend is the problem.',
    'Submitted cards are reviewed by actual people.',
    'Hate isn\'t a joke format. Kick anyone who confuses the two.',
];

const CommunitySection: React.FC = () => {
    return (
        <section className="px-4 md:px-8 py-16 border-t-2 border-table-line" aria-labelledby="community-heading">
            <div className="max-w-content-lg mx-auto grid gap-10 lg:grid-cols-[1fr_1.2fr] items-start">
                <div>
                    <h2
                        id="community-heading"
                        className="font-display font-extrabold [font-stretch:80%] text-[clamp(2rem,5vw,3rem)] leading-none tracking-[-0.015em] m-0 mb-4"
                    >
                        Play responsibly (or don't)
                    </h2>
                    <p className="text-muted max-w-[52ch] m-0 mb-3 leading-normal">
                        This game is deliberately offensive. That's the point. Private rooms mean you control who
                        plays, and if someone's ruining the vibe, kick them.
                    </p>
                    <p className="m-0">
                        <Link to="/content-policy" className="text-riso-yellow underline underline-offset-4 font-bold">
                            Read the content policy
                        </Link>
                    </p>
                </div>

                <aside
                    className="bg-paper text-ink rounded-lg border-2 border-ink p-5 text-sm leading-snug"
                    aria-label="Content warning"
                >
                    <h3 className="font-display font-extrabold [font-stretch:80%] uppercase text-xl m-0 mb-3 pb-2 border-b-2 border-ink">
                        Warnings &amp; side effects
                    </h3>
                    <ul className="m-0 pl-[1.1em] sm:columns-2 gap-6">
                        {sideEffects.map((effect) => (
                            <li key={effect} className="mb-1.5 break-inside-avoid">{effect}</li>
                        ))}
                    </ul>
                    <p className="m-0 mt-3 font-bold">We're terrible people with standards.</p>
                </aside>
            </div>
        </section>
    );
};

export default CommunitySection;
