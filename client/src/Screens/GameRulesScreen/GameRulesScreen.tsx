import React from 'react';
import DocumentationLayout from '../../components/DocumentationLayout/DocumentationLayout';

const GameRulesScreen: React.FC = () => {
	return (
		<DocumentationLayout title="Game Rules">
			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Official Rules</h2>
				<p className="text-lg leading-relaxed mb-4">
					These rules are based on{' '}
					<a
						href="https://www.cardsagainsthumanity.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-brand-blue hover:underline"
					>
						Cards Against Humanity
					</a>, a simple game with simple rules. Here's everything you need to know to play like a pro (or at least not embarrass yourself).
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Setup</h2>
				<ul className="list-disc pl-6 mb-4 space-y-2 text-lg">
					<li><strong>Minimum players:</strong> 3 (but 4-8 players is ideal)</li>
					<li><strong>Maximum players:</strong> 10</li>
					<li><strong>Winning score:</strong> First player to 10 Awesome Points wins</li>
					<li><strong>Starting hand:</strong> Each player begins with 10 White Cards</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">The Cards</h2>

				<div className="bg-black text-white p-6 rounded-lg mb-6">
					<h3 className="text-2xl font-semibold mb-3">Black Cards (Questions)</h3>
					<p className="text-lg leading-relaxed">
						Black Cards contain questions or fill-in-the-blank statements. The Card Czar reads these aloud each round. Some Black Cards require multiple White Cards to complete (indicated by the number of blank spaces).
					</p>
				</div>

				<div className="bg-white border-4 border-black p-6 rounded-lg mb-6">
					<h3 className="text-2xl font-semibold mb-3 text-black">White Cards (Answers)</h3>
					<p className="text-lg leading-relaxed text-black">
						White Cards contain words, phrases, or concepts that players use to answer the Black Card. These range from silly to deeply inappropriate. Choose wisely (or not).
					</p>
				</div>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">How to Play</h2>

				<div className="mb-6">
					<h3 className="text-2xl font-semibold mb-3">Round Structure</h3>
					<ol className="list-decimal pl-6 space-y-4 text-lg">
						<li>
							<strong>Card Czar draws a Black Card</strong><br />
							<span className="text-base">The Card Czar reads the question or fill-in-the-blank statement aloud to the group.</span>
						</li>
						<li>
							<strong>Players select their answers</strong><br />
							<span className="text-base">All other players choose one White Card from their hand that best (or worst) completes the Black Card. Click your chosen card to submit it.</span>
						</li>
						<li>
							<strong>Card Czar reviews submissions</strong><br />
							<span className="text-base">Once all players have submitted, the Card Czar sees all answers shuffled together (anonymous). The Czar reads each combination aloud and picks the funniest one.</span>
						</li>
						<li>
							<strong>Winner gets an Awesome Point</strong><br />
							<span className="text-base">The player who submitted the winning White Card earns 1 Awesome Point.</span>
						</li>
						<li>
							<strong>Cards are replenished</strong><br />
							<span className="text-base">All players (except the Card Czar) draw back up to 10 White Cards in their hand.</span>
						</li>
						<li>
							<strong>Next round begins</strong><br />
							<span className="text-base">The Card Czar role rotates to the next player, and a new Black Card is drawn.</span>
						</li>
					</ol>
				</div>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Special Rules</h2>

				<h3 className="text-2xl font-semibold mb-3">Pick 2 or Pick 3</h3>
				<p className="text-lg leading-relaxed mb-6">
					Some Black Cards require players to submit 2 or 3 White Cards to fill in multiple blanks. When you see "Pick 2" or "Pick 3" on a Black Card, select that many White Cards from your hand. The order matters—arrange them to create the funniest combination!
				</p>

				<h3 className="text-2xl font-semibold mb-3">Rebooting the Universe</h3>
				<p className="text-lg leading-relaxed mb-6">
					At any time, players may trade in 1 Awesome Point to discard their entire hand and draw 10 new White Cards. Use this when your hand is terrible (which happens more often than you'd think).
				</p>

				<h3 className="text-2xl font-semibold mb-3">Haiku Rules (Optional House Rule)</h3>
				<p className="text-lg leading-relaxed mb-6">
					If a Black Card asks for a haiku, it must be read aloud in haiku form (5 syllables, 7 syllables, 5 syllables). The Card Czar judges based on both humor and adherence to haiku structure.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Winning the Game</h2>
				<p className="text-lg leading-relaxed mb-4">
					The first player to collect <strong>10 Awesome Points</strong> wins. Celebrate their victory, then immediately question their morality and life choices.
				</p>
				<p className="text-lg leading-relaxed mb-4">
					<strong>Alternative winning conditions:</strong>
				</p>
				<ul className="list-disc pl-6 mb-4 space-y-2 text-lg">
					<li>Most points after a set number of rounds (if you have limited time)</li>
					<li>Keep playing forever until friendships are destroyed (not recommended but common)</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">House Rules (Optional)</h2>
				<p className="text-lg leading-relaxed mb-4">
					Cards Against Humanity is flexible. Feel free to create your own house rules:
				</p>
				<ul className="list-disc pl-6 mb-4 space-y-2 text-lg">
					<li><strong>Happy Ending:</strong> After the winning card is chosen, everyone else plays one more card for a second, lesser prize</li>
					<li><strong>God is Dead:</strong> Play without a Card Czar; everyone votes on the funniest card each round</li>
					<li><strong>Survival of the Fittest:</strong> The player with the fewest points at the end of each round must discard a random card</li>
					<li><strong>Never Have I Ever:</strong> Any player who has done what the card describes must discard an Awesome Point</li>
				</ul>
			</section>

			<section className="mb-8 bg-brand-gray-light p-6 rounded-lg">
				<h2 className="text-2xl font-bold mb-4">Etiquette & Fair Play</h2>
				<ul className="list-disc pl-6 space-y-2 text-lg">
					<li>The Card Czar's decision is final (even if they're clearly wrong)</li>
					<li>Don't reveal which card is yours until after judging</li>
					<li>Don't take it personally if your card doesn't win—humor is subjective</li>
					<li>Don't be that person who argues with the Card Czar for 5 minutes</li>
					<li>Play within your group's comfort level—not every card is appropriate for every audience</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Questions?</h2>
				<p className="text-lg leading-relaxed">
					If you're still confused (or need to settle a dispute), check the{' '}
					<a
						href="https://www.cardsagainsthumanity.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-brand-blue hover:underline"
					>
						official Cards Against Humanity website
					</a>{' '}
					or just make up a rule that sounds right. That's what everyone else does.
				</p>
			</section>
		</DocumentationLayout>
	);
};

export default GameRulesScreen;
