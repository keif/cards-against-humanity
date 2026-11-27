import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { parsePartyCode } from '@/utils/partyCode';

function CreateGame() {
    // TODO: call backend api to create a game and return the party code
    const partyCodeFromServer = Math.random().toString(36).slice(2).substring(5).toLowerCase();
    return partyCodeFromServer;
}

// Static hero artwork: real card copy is the illustration (DESIGN.md).
const HeroCard = ({ kind, text, number, className }: { kind: 'prompt' | 'answer'; text: string; number: string; className: string }) => (
    <div
        className={`absolute rounded-lg p-4 card-text leading-[1.18] shadow-card flex flex-col justify-between ${kind === 'prompt' ? 'bg-pink text-ink' : 'bg-paper text-ink'} ${className}`}
    >
        <span>{text}</span>
        <span className="flex justify-between font-mono font-bold text-[11px] tracking-[0.06em] opacity-70">
            <span>{kind === 'prompt' ? 'PHUCKING CARDS' : 'PC'}</span>
            <span>Nº {number}</span>
        </span>
    </div>
);

const HeroSection: React.FC = () => {
    const navigate = useNavigate();
    // Generated once: the join field re-renders this component on every keystroke.
    const [newPartyCode] = useState(CreateGame);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleJoin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const partyCode = parsePartyCode(code);
        if (!partyCode) {
            setError('That doesn\'t look like a party code. Check it with whoever sent it.');
            return;
        }
        navigate(`/join/${encodeURIComponent(partyCode)}`);
    };

    return (
        <section className="grain px-4 md:px-8 pt-6 pb-16 md:pb-24" aria-labelledby="hero-heading">
            <div className="max-w-content-lg mx-auto">
                <p className="m-0 mb-10 font-display font-extrabold text-[22px] [font-stretch:80%]">
                    Phucking <span className="text-pink">Cards</span>
                </p>

                <div className="grid gap-12 items-center lg:grid-cols-[1.15fr_1fr]">
                    <div>
                        <h1
                            id="hero-heading"
                            className="font-display-tight text-[clamp(3rem,9vw,5.75rem)] leading-[0.92] m-0 mb-5"
                        >
                            Fill in the blank.<br />
                            <span className="text-pink [text-shadow:3px_-2px_0_rgba(0,120,191,.9)]">Ruin a friendship.</span>
                        </h1>
                        <p className="text-[19px] leading-normal text-muted max-w-[34ch] m-0 mb-7">
                            A free party card game for 3 to 20 people with questionable judgment. Send a link,
                            everyone plays from their phone, nobody installs anything.
                        </p>

                        <div className="flex flex-wrap gap-3 max-w-[520px]">
                            <Link
                                to={`/join/${newPartyCode}`}
                                className="inline-flex items-center justify-center min-h-[52px] px-6 bg-pink text-ink rounded-lg shadow-press font-bold text-[17px] no-underline hover:bg-pink-hover active:translate-y-0.5 active:shadow-none transition-transform"
                            >
                                Start a party
                            </Link>
                            <form className="flex flex-1 basis-[220px]" onSubmit={handleJoin} noValidate>
                                <label htmlFor="hero-party-code" className="sr-only">Party code</label>
                                <input
                                    id="hero-party-code"
                                    value={code}
                                    onChange={(event) => { setCode(event.target.value); setError(''); }}
                                    placeholder="Party code"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    spellCheck={false}
                                    aria-invalid={error ? true : undefined}
                                    aria-describedby={error ? 'hero-party-code-error' : undefined}
                                    className="flex-1 min-w-0 min-h-[52px] px-4 font-mono font-bold text-xl tracking-[0.14em] bg-table-raised text-paper border-2 border-r-0 border-table-line rounded-l-lg placeholder:text-muted placeholder:font-sans placeholder:font-normal placeholder:text-base placeholder:tracking-normal"
                                />
                                <button
                                    type="submit"
                                    className="min-h-[52px] px-5 bg-paper text-ink font-bold text-[17px] rounded-r-lg border-0 cursor-pointer hover:bg-paper-shade"
                                >
                                    Join
                                </button>
                            </form>
                        </div>
                        {error && (
                            <p id="hero-party-code-error" role="alert" className="mt-3 mb-0 flex items-start gap-2 text-sm">
                                <span className="font-mono font-bold text-xs bg-error text-ink px-1.5 py-0.5 rounded-sm">NOPE</span>
                                {error}
                            </p>
                        )}

                        <p className="mt-5 mb-0 text-sm text-muted">
                            18+ · Free, no ads · No account · Fan-made, not affiliated with Cards Against Humanity
                        </p>
                    </div>

                    <div className="relative h-[340px] sm:h-[420px]" aria-hidden="true">
                        <HeroCard
                            kind="prompt"
                            number="0412"
                            text="The group chat went silent after I sent ____."
                            className="left-0 sm:left-[4%] top-2.5 w-[170px] h-[234px] sm:w-[220px] sm:h-[302px] text-[18px] sm:text-[22px] -rotate-[4deg] z-[2] shadow-[-6px_5px_0_rgba(0,120,191,0.55)]"
                        />
                        <HeroCard
                            kind="answer"
                            number="1187"
                            text="A voice memo of me crying in a Costco."
                            className="left-[38%] sm:left-[40%] top-[110px] sm:top-[120px] w-[150px] h-[206px] sm:w-[200px] sm:h-[275px] text-[17px] sm:text-[20px] rotate-3 z-[3]"
                        />
                        <HeroCard
                            kind="answer"
                            number="0960"
                            text="My extremely detailed opinions on soup."
                            className="left-[50%] sm:left-[58%] top-0 sm:top-5 w-[150px] h-[206px] sm:w-[200px] sm:h-[275px] text-[17px] sm:text-[20px] -rotate-[1.5deg] z-[1]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
