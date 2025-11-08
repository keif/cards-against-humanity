import React from 'react';
import DocumentationLayout from '../../components/DocumentationLayout/DocumentationLayout';
import { Link } from 'react-router-dom';

const ModerationGuidelinesScreen: React.FC = () => {
	return (
		<DocumentationLayout title="Moderation Guidelines">
			<section className="mb-8">
				<p className="text-sm text-brand-gray mb-4">Last Updated: November 8, 2025</p>
				<p className="text-lg leading-relaxed mb-4">
					These guidelines are for moderators and community members who help review submitted cards. Thank you for helping keep the game fun and (relatively) safe!
				</p>
			</section>

			<section className="mb-8 bg-brand-yellow p-6 rounded-lg">
				<h2 className="text-2xl font-bold mb-3">Core Principle</h2>
				<p className="text-lg leading-relaxed m-0">
					<strong>Balance humor with responsibility.</strong> Cards Against Humanity is meant to be edgy and offensive, but that doesn't mean anything goes. Our goal is to maintain a community where dark humor thrives without crossing into genuinely harmful territory.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Moderator Responsibilities</h2>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li>Review submitted cards for policy compliance</li>
					<li>Approve high-quality, funny, and appropriate cards</li>
					<li>Reject cards that violate the <Link to="/content-policy" className="text-brand-blue hover:underline">Content Policy</Link></li>
					<li>Provide rejection reasons when possible (helps submitters improve)</li>
					<li>Respond to community flags and reports</li>
					<li>Maintain consistency with other moderators</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Approval Criteria</h2>

				<h3 className="text-2xl font-semibold mb-3 text-green-600">Approve If:</h3>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li><strong>Funny & Creative:</strong> Card is genuinely humorous or cleverly written</li>
					<li><strong>Fits the Game:</strong> Works well with the game format (question/answer structure)</li>
					<li><strong>Good Quality:</strong> Proper spelling, grammar, and formatting</li>
					<li><strong>Policy Compliant:</strong> Doesn't violate the Content Policy</li>
					<li><strong>Original:</strong> Not a duplicate of existing cards</li>
					<li><strong>Contextually Appropriate:</strong> Dark humor is fine, but should have comedic intent</li>
				</ul>

				<h3 className="text-2xl font-semibold mb-3 text-red-600">Reject If:</h3>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li><strong>Policy Violation:</strong> Violates the <Link to="/content-policy" className="text-brand-blue hover:underline">Content Policy</Link> (illegal content, child exploitation, direct threats)</li>
					<li><strong>Low Quality:</strong> Poor grammar, typos, nonsensical, or single-word entries</li>
					<li><strong>Duplicate:</strong> Card already exists in the deck (check before rejecting)</li>
					<li><strong>Off-Topic:</strong> Doesn't fit the game format or is advertising/spam</li>
					<li><strong>Not Funny:</strong> Lacks humor, creativity, or entertainment value</li>
					<li><strong>Excessively Harmful:</strong> Goes beyond dark humor into genuinely hateful territory</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">The Gray Area: When to Use Judgment</h2>
				<p className="text-lg leading-relaxed mb-4">
					Not every decision is clear-cut. Here's guidance for borderline cases:
				</p>

				<h3 className="text-2xl font-semibold mb-3">Edgy vs. Harmful</h3>
				<div className="bg-brand-gray-light p-6 rounded-lg mb-6">
					<p className="text-base leading-relaxed mb-4">
						<strong>Ask yourself:</strong>
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>Is there clear comedic intent, or is this just mean-spirited?</li>
						<li>Would this punch up (satirize power) or punch down (target vulnerable groups)?</li>
						<li>Is this absurdist humor or genuinely promoting harm?</li>
						<li>Would this card ruin the game for most players, or just some?</li>
					</ul>
				</div>

				<h3 className="text-2xl font-semibold mb-3">When in Doubt</h3>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li><strong>Consult Other Moderators:</strong> Get a second opinion on borderline cards</li>
					<li><strong>Check Community Votes:</strong> If the community heavily downvoted it, that's a signal</li>
					<li><strong>Err on the Side of Caution:</strong> If unsure whether it crosses the line, reject it</li>
					<li><strong>Document Your Reasoning:</strong> Provide a rejection reason to help the submitter understand</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Rejection Reasons</h2>
				<p className="text-lg leading-relaxed mb-4">
					When rejecting cards, select from these standard reasons:
				</p>

				<div className="space-y-4">
					<div className="bg-white border-2 border-brand-gray p-4 rounded-lg">
						<h4 className="text-xl font-semibold mb-2">Policy Violation</h4>
						<p className="text-base">Use for: Illegal content, child exploitation, direct threats, doxxing</p>
					</div>

					<div className="bg-white border-2 border-brand-gray p-4 rounded-lg">
						<h4 className="text-xl font-semibold mb-2">Low Quality</h4>
						<p className="text-base">Use for: Poor grammar, typos, single words, nonsensical entries</p>
					</div>

					<div className="bg-white border-2 border-brand-gray p-4 rounded-lg">
						<h4 className="text-xl font-semibold mb-2">Duplicate</h4>
						<p className="text-base">Use for: Cards that already exist in the deck (verify first)</p>
					</div>

					<div className="bg-white border-2 border-brand-gray p-4 rounded-lg">
						<h4 className="text-xl font-semibold mb-2">Off-Topic</h4>
						<p className="text-base">Use for: Advertising, spam, content unrelated to the game</p>
					</div>

					<div className="bg-white border-2 border-brand-gray p-4 rounded-lg">
						<h4 className="text-xl font-semibold mb-2">Custom Reason</h4>
						<p className="text-base">Use for: Anything else (provide specific explanation)</p>
					</div>
				</div>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Community Voting Signals</h2>
				<p className="text-lg leading-relaxed mb-4">
					Use community votes as one factor (not the only factor) in your decision:
				</p>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li><strong>High Upvotes:</strong> Community thinks it's funny—strong approval signal</li>
					<li><strong>High Downvotes:</strong> Community thinks it's bad—consider rejection</li>
					<li><strong>Many Duplicate Flags:</strong> Verify if the card already exists</li>
					<li><strong>Mixed Votes:</strong> Controversial—use your judgment on quality and policy compliance</li>
				</ul>
				<p className="text-lg leading-relaxed mb-4">
					<strong>Remember:</strong> Popularity doesn't override policy. Reject policy violations even if they're upvoted.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Handling Reports & Flags</h2>

				<h3 className="text-2xl font-semibold mb-3">Respond Promptly</h3>
				<p className="text-lg leading-relaxed mb-6">
					Review flagged content within 24-48 hours when possible. Serious violations (illegal content, threats) should be handled immediately.
				</p>

				<h3 className="text-2xl font-semibold mb-3">Investigate Thoroughly</h3>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li>Read the full context of the card</li>
					<li>Check if it's truly a duplicate (not just similar)</li>
					<li>Review community votes and feedback</li>
					<li>Consult other moderators for serious violations</li>
				</ul>

				<h3 className="text-2xl font-semibold mb-3">Take Action</h3>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li>Approve if the flag was incorrect or overzealous</li>
					<li>Reject if the card violates policy</li>
					<li>Escalate to admins for illegal content or harassment</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Consistency & Collaboration</h2>

				<h3 className="text-2xl font-semibold mb-3">Stay Aligned</h3>
				<p className="text-lg leading-relaxed mb-6">
					Moderators should strive for consistent decisions. If you're unsure how another moderator would handle a case, ask! Collaboration leads to better outcomes.
				</p>

				<h3 className="text-2xl font-semibold mb-3">Discuss Edge Cases</h3>
				<p className="text-lg leading-relaxed mb-6">
					Use moderator channels (Discord, GitHub Discussions, etc.) to discuss borderline cases and establish precedents.
				</p>

				<h3 className="text-2xl font-semibold mb-3">Update Guidelines</h3>
				<p className="text-lg leading-relaxed mb-6">
					If you notice patterns or recurring issues, suggest updates to these guidelines to help future moderators.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Self-Care for Moderators</h2>
				<p className="text-lg leading-relaxed mb-4">
					Moderating can be emotionally taxing, especially when reviewing offensive or disturbing content. Remember to:
				</p>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li><strong>Take Breaks:</strong> Don't review hundreds of cards in one sitting</li>
					<li><strong>Ask for Help:</strong> If content is affecting you, ask another moderator to handle it</li>
					<li><strong>Set Boundaries:</strong> You're a volunteer—moderate at your own pace</li>
					<li><strong>Report Serious Issues:</strong> Escalate illegal or deeply disturbing content immediately</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Escalation Process</h2>

				<h3 className="text-2xl font-semibold mb-3">When to Escalate</h3>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li>Illegal content (child exploitation, threats of violence, etc.)</li>
					<li>Repeated policy violations from the same submitter</li>
					<li>Harassment or coordinated attacks</li>
					<li>Uncertainty about how to handle a serious case</li>
				</ul>

				<h3 className="text-2xl font-semibold mb-3">How to Escalate</h3>
				<p className="text-lg leading-relaxed mb-6">
					Open a{' '}
					<a
						href="https://github.com/keif/cards-against-humanity/issues"
						target="_blank"
						rel="noopener noreferrer"
						className="text-brand-blue hover:underline"
					>
						private GitHub issue
					</a>{' '}
					or contact project admins directly. Include:
				</p>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li>The card ID or submission details</li>
					<li>Why you're escalating (policy violation, illegal content, etc.)</li>
					<li>Any relevant context or evidence</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Becoming a Moderator</h2>
				<p className="text-lg leading-relaxed mb-4">
					Interested in becoming a moderator? We're looking for community members who:
				</p>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li>Understand the game and its humor</li>
					<li>Can balance edginess with responsibility</li>
					<li>Are active and responsive</li>
					<li>Can handle offensive content maturely</li>
					<li>Work well with others</li>
				</ul>
				<p className="text-lg leading-relaxed mb-4">
					Reach out via{' '}
					<a
						href="https://github.com/keif/cards-against-humanity/issues"
						target="_blank"
						rel="noopener noreferrer"
						className="text-brand-blue hover:underline"
					>
						GitHub
					</a>{' '}
					if you're interested!
				</p>
			</section>

			<section className="bg-brand-gray-light p-6 rounded-lg">
				<p className="text-base leading-relaxed m-0">
					<strong>TL;DR for Moderators:</strong> Approve funny, well-written cards that fit the game. Reject policy violations, duplicates, and low-quality submissions. Use judgment for borderline cases, consult other moderators when unsure, and prioritize community safety without killing the edgy humor that makes this game fun.
				</p>
			</section>
		</DocumentationLayout>
	);
};

export default ModerationGuidelinesScreen;
