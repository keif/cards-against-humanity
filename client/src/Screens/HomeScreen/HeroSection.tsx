import React from 'react';
import { Link } from 'react-router-dom';

function CreateGame() {
    // TODO: call backend api to create a game and return the party code
    let partyCodeFromServer = Math.random().toString(36).slice(2).substring(5).toLowerCase();
    return partyCodeFromServer;
}

const HeroSection: React.FC = () => {
    return (
        <section
            className="py-18 px-6 md:py-12 text-center w-full mx-auto"
            aria-labelledby="hero-heading"
        >
            <div className="max-w-content-md mx-auto">
                <h1
                    id="hero-heading"
                    className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-4 md:mb-6 text-black"
                >
                    Play Cards Against Humanity Online – Free Multiplayer
                </h1>
                <p className="text-lg md:text-xl leading-relaxed text-brand-gray-dark mb-6 md:mb-8 max-w-content-sm mx-auto">
                    A free party game where terrible people say terrible things.
                    No cards, no login, no limits—just you and your questionable friends.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 items-center justify-center mb-6">
                    <Link
                        to={`/join/${CreateGame()}`}
                        className="inline-block bg-black text-white border-2 border-black rounded-lg px-8 py-4 font-semibold w-full sm:w-auto sm:min-w-[250px] text-lg text-center no-underline transition-colors hover:bg-brand-gray-dark"
                    >
                        Create a Game
                    </Link>
                    <Link
                        to="/join"
                        className="inline-block bg-transparent text-black border-2 border-black rounded-lg px-8 py-4 font-semibold w-full sm:w-auto sm:min-w-[250px] text-lg text-center no-underline transition-all hover:bg-black hover:text-white"
                    >
                        Join with Code
                    </Link>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-2 text-base md:text-sm text-brand-gray">
                    <span className="whitespace-nowrap">✓ Works on any device</span>
                    <span className="whitespace-nowrap">✓ No download required</span>
                    <span className="whitespace-nowrap">✓ 3-20 players</span>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
