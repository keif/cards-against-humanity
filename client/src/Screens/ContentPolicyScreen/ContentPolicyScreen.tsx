import React from 'react';
import DocumentationLayout from '../../components/DocumentationLayout/DocumentationLayout';
import { Link } from 'react-router-dom';

const ContentPolicyScreen: React.FC = () => {
	return (
		<DocumentationLayout title="Content Policy">
			<section className="mb-8">
				<p className="text-sm text-brand-gray mb-4">Last Updated: November 8, 2025</p>
				<p className="text-lg leading-relaxed mb-4">
					Cards Against Humanity is a game designed for mature audiences and features offensive humor. This content policy outlines what's acceptable on our platform and what crosses the line.
				</p>
			</section>

			<section className="mb-8 bg-brand-yellow p-6 rounded-lg">
				<h2 className="text-2xl font-bold mb-3">Content Warning</h2>
				<p className="text-lg leading-relaxed m-0">
					This game contains mature humor that may be offensive to some audiences. By using this platform, you acknowledge that you are at least 17 years old and comfortable with adult-oriented content.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Acceptable Content</h2>
				<p className="text-lg leading-relaxed mb-4">
					Cards Against Humanity is intentionally edgy and provocative. The following types of content are allowed within the spirit of the game:
				</p>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li>Dark humor and satire</li>
					<li>Crude or sexual references</li>
					<li>Profanity and vulgar language</li>
					<li>References to controversial topics (politics, religion, pop culture)</li>
					<li>Absurdist or nonsensical humor</li>
					<li>Parody and social commentary</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Prohibited Content</h2>
				<p className="text-lg leading-relaxed mb-4">
					Even in a game about terrible people, there are lines we don't cross. The following content is strictly prohibited:
				</p>

				<h3 className="text-2xl font-semibold mb-3 text-red-600">Absolutely Forbidden</h3>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li><strong>Illegal Content:</strong> Anything that violates US federal law, including content depicting or promoting illegal activities</li>
					<li><strong>Child Exploitation:</strong> Any sexualization of minors or references to child abuse (zero tolerance)</li>
					<li><strong>Threats of Violence:</strong> Direct threats against individuals or groups</li>
					<li><strong>Personal Information:</strong> Doxxing, sharing private information, or targeting specific individuals</li>
					<li><strong>Spam & Malware:</strong> Links to malicious sites, spam, or disruptive content</li>
				</ul>

				<h3 className="text-2xl font-semibold mb-3">Subject to Review</h3>
				<p className="text-lg leading-relaxed mb-4">
					The following content may be removed if deemed excessively harmful or not within the spirit of the game:
				</p>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li><strong>Hate Speech:</strong> Content that promotes violence or discrimination based on race, ethnicity, religion, disability, gender, age, veteran status, or sexual orientation</li>
					<li><strong>Graphic Violence:</strong> Overly detailed descriptions of violence without humor or satire</li>
					<li><strong>Harassment:</strong> Content targeting specific individuals in a harmful way</li>
					<li><strong>Non-Game Content:</strong> Advertising, political campaigning, or content unrelated to gameplay</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Submitted Card Guidelines</h2>
				<p className="text-lg leading-relaxed mb-4">
					When submitting custom cards for community review:
				</p>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li><strong>Be Creative:</strong> Avoid submitting duplicate or near-duplicate cards</li>
					<li><strong>Follow the Format:</strong> Cards should fit the game's format (questions for Black Cards, answers for White Cards)</li>
					<li><strong>Stay on Theme:</strong> Cards should be humorous, absurd, or thought-provoking</li>
					<li><strong>Avoid Low Effort:</strong> Single words or gibberish typically won't be approved</li>
					<li><strong>Check Grammar:</strong> While humor is subjective, basic spelling and grammar help cards get approved</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Moderation Process</h2>

				<h3 className="text-2xl font-semibold mb-3">Community Voting</h3>
				<p className="text-lg leading-relaxed mb-6">
					Submitted cards go through community voting where players can upvote, downvote, or flag cards as duplicates. This helps surface the best content and filter out low-quality submissions.
				</p>

				<h3 className="text-2xl font-semibold mb-3">Moderator Review</h3>
				<p className="text-lg leading-relaxed mb-6">
					Moderators review flagged content and submissions for final approval. Cards that violate this content policy will be rejected with a reason provided when possible.
				</p>

				<h3 className="text-2xl font-semibold mb-3">Rejection Reasons</h3>
				<p className="text-lg leading-relaxed mb-4">
					Cards may be rejected for:
				</p>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li>Policy Violation (content violates this policy)</li>
					<li>Low Quality (poor grammar, nonsensical, or low effort)</li>
					<li>Duplicate (card already exists in the deck)</li>
					<li>Off-Topic (doesn't fit the game format)</li>
					<li>Spam (automated or repetitive submissions)</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">In-Game Behavior</h2>
				<p className="text-lg leading-relaxed mb-4">
					While playing, please remember:
				</p>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li><strong>Consent Matters:</strong> Make sure everyone in your game is comfortable with the humor level</li>
					<li><strong>Respect Boundaries:</strong> If someone asks to skip a card or change topics, listen</li>
					<li><strong>No Harassment:</strong> Don't use the game as a vehicle to attack other players</li>
					<li><strong>Keep It Fun:</strong> The goal is laughter, not making people genuinely uncomfortable</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Reporting Violations</h2>
				<p className="text-lg leading-relaxed mb-4">
					If you encounter content that violates this policy:
				</p>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li><strong>Flag Cards:</strong> Use the "Flag as Duplicate" or downvote feature on submitted cards</li>
					<li><strong>Report Issues:</strong> Open a{' '}
						<a
							href="https://github.com/keif/cards-against-humanity/issues"
							target="_blank"
							rel="noopener noreferrer"
							className="text-brand-blue hover:underline"
						>
							GitHub issue
						</a>{' '}
						for serious violations
					</li>
					<li><strong>Leave the Game:</strong> If a private game has inappropriate content, you can always leave</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Enforcement</h2>
				<p className="text-lg leading-relaxed mb-4">
					Violations of this content policy may result in:
				</p>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li>Card rejection and removal from the community deck</li>
					<li>Temporary or permanent ban from submitting cards</li>
					<li>Reporting to law enforcement for illegal content</li>
				</ul>
				<p className="text-lg leading-relaxed mb-4">
					We reserve the right to remove content and restrict access to users who violate this policy.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Attribution & Copyright</h2>
				<p className="text-lg leading-relaxed mb-4">
					Cards Against Humanity game content is licensed under{' '}
					<a
						href="https://creativecommons.org/licenses/by-nc-sa/2.0/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-brand-blue hover:underline"
					>
						CC BY-NC-SA 2.0
					</a>.
				</p>
				<p className="text-lg leading-relaxed mb-4">
					By submitting custom cards, you agree to license your submissions under the same Creative Commons license and affirm that:
				</p>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li>You own the content or have the right to submit it</li>
					<li>Your submission does not infringe on anyone else's copyright or trademark</li>
					<li>Your submission can be used freely by this project and its users</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Changes to This Policy</h2>
				<p className="text-lg leading-relaxed mb-4">
					We may update this content policy as the community grows and new issues arise. Continued use of the platform constitutes acceptance of the current policy.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Questions?</h2>
				<p className="text-lg leading-relaxed mb-4">
					See also:{' '}
					<Link to="/moderation-guidelines" className="text-brand-blue hover:underline">
						Moderation Guidelines
					</Link>{' '}
					for moderators and{' '}
					<Link to="/privacy" className="text-brand-blue hover:underline">
						Privacy Policy
					</Link>{' '}
					for data practices.
				</p>
			</section>

			<section className="bg-brand-gray-light p-6 rounded-lg">
				<p className="text-base leading-relaxed m-0">
					<strong>TL;DR:</strong> Be funny, not harmful. Dark humor is expected, but illegal content, harassment, and child exploitation will result in immediate removal and potential legal action. Use common sense, respect boundaries, and remember this is a game meant to bring people together (even if it's to laugh at terrible things).
				</p>
			</section>
		</DocumentationLayout>
	);
};

export default ContentPolicyScreen;
