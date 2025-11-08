import React from 'react';
import DocumentationLayout from '../../components/DocumentationLayout/DocumentationLayout';
import { Link } from 'react-router-dom';

const HowToPlayScreen: React.FC = () => {
	return (
		<DocumentationLayout title="How to Play">
			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Getting Started</h2>
				<p className="text-lg leading-relaxed mb-4">
					This is a free online version based on{' '}
					<a
						href="https://www.cardsagainsthumanity.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-brand-blue hover:underline"
					>
						Cards Against Humanity
					</a>, a party game for horrible people. Each round, one player asks a question from a Black Card, and everyone else answers with their funniest White Card.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Three Steps to Chaos</h2>

				<div className="bg-brand-gray-light p-6 rounded-lg mb-6">
					<div className="flex items-start mb-4">
						<div className="text-4xl mr-4">🎮</div>
						<div>
							<h3 className="text-2xl font-semibold mb-2">1. Start a Party</h3>
							<p className="text-lg leading-relaxed">
								Click "Create a Game" on the home page. You'll get a unique party code instantly. Share this code with your friends so they can join your game.
							</p>
						</div>
					</div>
				</div>

				<div className="bg-brand-gray-light p-6 rounded-lg mb-6">
					<div className="flex items-start mb-4">
						<div className="text-4xl mr-4">👥</div>
						<div>
							<h3 className="text-2xl font-semibold mb-2">2. Share the Code</h3>
							<p className="text-lg leading-relaxed">
								Send your party code to friends via text, Discord, Slack, or carrier pigeon. They can join by clicking "Join a Game" and entering the code. You need at least 3 players to start.
							</p>
						</div>
					</div>
				</div>

				<div className="bg-brand-gray-light p-6 rounded-lg mb-6">
					<div className="flex items-start mb-4">
						<div className="text-4xl mr-4">😈</div>
						<div>
							<h3 className="text-2xl font-semibold mb-2">3. Judge the Worst Answers</h3>
							<p className="text-lg leading-relaxed">
								Each round, the Card Czar reads the question (Black Card) and everyone else plays their funniest answer (White Card). The Card Czar picks the winning answer. First to 10 points wins!
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Gameplay Basics</h2>

				<h3 className="text-2xl font-semibold mb-3">For Players</h3>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li>You'll start with 10 White Cards in your hand</li>
					<li>Each round, select the funniest card from your hand to answer the Black Card</li>
					<li>Wait for the Card Czar to choose the winning answer</li>
					<li>Your hand will automatically refill after each round</li>
				</ul>

				<h3 className="text-2xl font-semibold mb-3">For the Card Czar</h3>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li>Read the Black Card question out loud (or in Discord voice chat)</li>
					<li>Wait for all players to submit their answers</li>
					<li>Review all submitted answers and pick the funniest one</li>
					<li>The winning player gets 1 Awesome Point</li>
					<li>The Card Czar role rotates to the next player</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Tips for Maximum Chaos</h2>
				<ul className="list-disc pl-6 mb-4 space-y-2 text-lg">
					<li><strong>Voice chat recommended:</strong> This game is way better with Discord, Zoom, or in-person play</li>
					<li><strong>Read cards dramatically:</strong> The delivery matters as much as the answer</li>
					<li><strong>Don't take it seriously:</strong> The most offensive answer usually wins</li>
					<li><strong>Custom cards:</strong> Submit your own cards to make the game even more personalized</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Need More Info?</h2>
				<p className="text-lg leading-relaxed mb-4">
					Check out the <Link to="/game-rules" className="text-brand-blue hover:underline">full game rules</Link> for detailed gameplay mechanics, or <Link to="/submit-cards" className="text-brand-blue hover:underline">submit your own cards</Link> to customize your experience.
				</p>
			</section>

			<div className="bg-brand-yellow p-6 rounded-lg text-center">
				<p className="text-xl font-semibold mb-4">Ready to start?</p>
				<Link
					to="/"
					className="inline-block bg-black text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-brand-gray transition-colors no-underline"
				>
					Create a Game Now
				</Link>
			</div>
		</DocumentationLayout>
	);
};

export default HowToPlayScreen;
