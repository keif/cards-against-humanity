import React from 'react';

// One round, told in order: prompt, answers, verdict.
const steps = [
    {
        title: 'The judge reads the pink card.',
        body: 'Somebody starts a party and sends the code. Each round, one player is the judge and reads a prompt with a blank in it.',
        card: { text: 'My therapist says I need to stop ____.', className: 'bg-pink text-ink' },
    },
    {
        title: 'Everyone else plays their worst.',
        body: 'You hold ten answer cards. Play the one that makes the prompt as bad as possible. Nobody sees who played what.',
        card: { text: 'A tasteful amount of crime.', className: 'bg-paper text-ink' },
    },
    {
        title: 'The judge picks a winner.',
        body: 'The funniest answer scores a point, the judge role moves on, and somebody in the room regrets everything.',
        card: { text: 'Grandma\'s search history.', className: 'bg-paper text-ink', winner: true },
    },
];

const HowItWorksSection: React.FC = () => {
    return (
        <section className="px-4 md:px-8 py-16 border-t-2 border-table-line" aria-labelledby="how-it-works-heading">
            <div className="max-w-content-lg mx-auto">
                <h2
                    id="how-it-works-heading"
                    className="font-display font-extrabold [font-stretch:80%] text-[clamp(2rem,5vw,3rem)] leading-none tracking-[-0.015em] m-0 mb-3"
                >
                    One round, start to finish
                </h2>
                <p className="text-muted max-w-[60ch] m-0 mb-10">Three clicks to chaos. A round takes about a minute.</p>

                <ol className="list-none p-0 m-0 grid gap-10 md:gap-8 md:grid-cols-3">
                    {steps.map((step) => (
                        <li key={step.title} className="flex gap-5 md:flex-col">
                            <div
                                className={`relative shrink-0 w-[112px] h-[154px] md:w-[144px] md:h-[198px] rounded-lg p-3 card-text text-[15px] md:text-[17px] leading-[1.15] shadow-card ${step.card.className}`}
                                aria-hidden="true"
                            >
                                {step.card.winner && (
                                    <span className="absolute -top-3 left-3 -rotate-3 bg-riso-yellow text-ink font-mono font-extrabold text-xs tracking-[0.08em] px-2 py-1 rounded-sm">
                                        WINNER
                                    </span>
                                )}
                                {step.card.text}
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-[22px] leading-tight m-0 mb-2">{step.title}</h3>
                                <p className="text-muted m-0 leading-normal">{step.body}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
};

export default HowItWorksSection;
