import React, { useState } from 'react';
import DocumentationLayout from '../../components/DocumentationLayout/DocumentationLayout';
import { Link } from 'react-router-dom';

const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:8080';

interface SubmissionResult {
	success: boolean;
	message?: string;
	cardId?: number;
	error?: string;
	duplicate?: {
		id: number;
		text: string;
		source: string;
		expansion?: string;
	};
}

const SubmitCardsScreen: React.FC = () => {
	const [cardText, setCardText] = useState('');
	const [cardType, setCardType] = useState<'A' | 'Q'>('A');
	const [numAnswers, setNumAnswers] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [result, setResult] = useState<SubmissionResult | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!cardText.trim()) {
			setResult({
				success: false,
				error: 'Card text is required'
			});
			return;
		}

		setIsSubmitting(true);
		setResult(null);

		try {
			const response = await fetch(`${SERVER_URL}/api/cards/submit`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include', // Include session cookie
				body: JSON.stringify({
					text: cardText.trim(),
					cardType,
					numAnswers: cardType === 'Q' ? numAnswers : undefined
				}),
			});

			const data = await response.json();

			if (response.ok) {
				setResult({
					success: true,
					message: data.message || 'Card submitted successfully!',
					cardId: data.cardId
				});
				// Clear form
				setCardText('');
				setNumAnswers(1);
			} else {
				setResult({
					success: false,
					error: data.error || 'Failed to submit card',
					duplicate: data.duplicate
				});
			}
		} catch (error) {
			setResult({
				success: false,
				error: 'Network error. Please try again.'
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const characterCount = cardText.length;
	const maxLength = 500;

	return (
		<DocumentationLayout title="Submit Cards">
			<section className="mb-8">
				<p className="text-lg leading-relaxed mb-4">
					Help expand the game with your own cards! Submit your funniest, most creative, or most absurd card ideas for community review and potential inclusion in the game.
				</p>
			</section>

			<section className="mb-8 bg-brand-yellow p-6 rounded-lg">
				<h2 className="text-2xl font-bold mb-3">Before You Submit</h2>
				<ul className="list-disc pl-6 space-y-2">
					<li>Read the <Link to="/content-policy" className="text-brand-blue hover:underline">Content Policy</Link> to understand what's acceptable</li>
					<li>Check for spelling and grammar - well-written cards are more likely to be approved</li>
					<li>Be creative! Avoid submitting variations of existing cards</li>
					<li>Make sure your card fits the game format and tone</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Submission Form</h2>

				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Card Type Selection */}
					<div>
						<label className="block text-lg font-semibold mb-3">Card Type</label>
						<div className="flex gap-4">
							<button
								type="button"
								onClick={() => setCardType('A')}
								className={`flex-1 p-4 rounded-lg border-2 font-semibold transition-all ${
									cardType === 'A'
										? 'bg-white border-black text-black shadow-lg'
										: 'bg-brand-gray-light border-brand-gray text-brand-gray hover:border-black'
								}`}
							>
								<div className="text-xl mb-2">Answer Card (White)</div>
								<div className="text-sm font-normal">A word, phrase, or concept used to answer questions</div>
							</button>
							<button
								type="button"
								onClick={() => setCardType('Q')}
								className={`flex-1 p-4 rounded-lg border-2 font-semibold transition-all ${
									cardType === 'Q'
										? 'bg-black border-black text-white shadow-lg'
										: 'bg-brand-gray-light border-brand-gray text-brand-gray hover:border-black'
								}`}
							>
								<div className="text-xl mb-2">Question Card (Black)</div>
								<div className="text-sm font-normal">A question or fill-in-the-blank statement</div>
							</button>
						</div>
					</div>

					{/* Card Text */}
					<div>
						<label htmlFor="card-text" className="block text-lg font-semibold mb-2">
							Card Text
						</label>
						<textarea
							id="card-text"
							value={cardText}
							onChange={(e) => setCardText(e.target.value)}
							maxLength={maxLength}
							rows={4}
							placeholder={
								cardType === 'A'
									? 'Example: Puppies! or Being on fire. or A micropenis.'
									: 'Example: What\'s that smell? or During sex, I like to think about _____.'
							}
							className="w-full p-4 border-2 border-brand-gray rounded-lg text-lg focus:border-black focus:outline-none"
							required
						/>
						<div className="flex justify-between items-center mt-2">
							<p className="text-sm text-brand-gray m-0">
								{cardType === 'Q' && 'Tip: Use _____ for blank spaces that need to be filled in'}
							</p>
							<p className={`text-sm m-0 ${characterCount > maxLength * 0.9 ? 'text-red-600 font-semibold' : 'text-brand-gray'}`}>
								{characterCount} / {maxLength}
							</p>
						</div>
					</div>

					{/* Number of Answers (for Question Cards only) */}
					{cardType === 'Q' && (
						<div>
							<label htmlFor="num-answers" className="block text-lg font-semibold mb-2">
								Number of Answers Required
							</label>
							<select
								id="num-answers"
								value={numAnswers}
								onChange={(e) => setNumAnswers(parseInt(e.target.value))}
								className="w-full p-3 border-2 border-brand-gray rounded-lg text-lg focus:border-black focus:outline-none"
							>
								<option value={1}>1 answer (standard)</option>
								<option value={2}>2 answers (Pick 2)</option>
								<option value={3}>3 answers (Pick 3)</option>
							</select>
							<p className="text-sm text-brand-gray mt-2 m-0">
								{numAnswers === 1 && 'Most questions require 1 answer'}
								{numAnswers === 2 && 'Example: "_____ and _____. Name a more iconic duo."'}
								{numAnswers === 3 && 'Example: "Step 1: _____. Step 2: _____. Step 3: Profit."'}
							</p>
						</div>
					)}

					{/* Submission Result */}
					{result && (
						<div
							className={`p-4 rounded-lg ${
								result.success
									? 'bg-green-100 border-2 border-green-600 text-green-800'
									: 'bg-red-100 border-2 border-red-600 text-red-800'
							}`}
						>
							{result.success ? (
								<div>
									<p className="font-semibold m-0 mb-2">Success!</p>
									<p className="m-0">{result.message}</p>
									<p className="text-sm mt-2 m-0">
										Your card is now pending community review and moderator approval.
									</p>
								</div>
							) : (
								<div>
									<p className="font-semibold m-0 mb-2">Submission Failed</p>
									<p className="m-0">{result.error}</p>
									{result.duplicate && (
										<div className="mt-3 p-3 bg-white rounded border border-red-400">
											<p className="text-sm font-semibold m-0 mb-1">This card already exists:</p>
											<p className="m-0 italic">"{result.duplicate.text}"</p>
											<p className="text-xs mt-1 m-0">
												Source: {result.duplicate.source}
												{result.duplicate.expansion && ` (${result.duplicate.expansion})`}
											</p>
										</div>
									)}
								</div>
							)}
						</div>
					)}

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isSubmitting || !cardText.trim()}
						className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
							isSubmitting || !cardText.trim()
								? 'bg-brand-gray text-white cursor-not-allowed'
								: 'bg-black text-white hover:bg-brand-gray-dark'
						}`}
					>
						{isSubmitting ? 'Submitting...' : 'Submit Card'}
					</button>
				</form>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">What Happens Next?</h2>
				<ol className="list-decimal pl-6 space-y-3 text-lg">
					<li>
						<strong>Community Voting:</strong> Your card goes to the{' '}
						<a href="/community/cards" className="text-brand-blue hover:underline">community voting page</a>{' '}
						where players can upvote, downvote, or flag it as a duplicate.
					</li>
					<li>
						<strong>Moderator Review:</strong> Moderators review cards based on community feedback and{' '}
						<Link to="/content-policy" className="text-brand-blue hover:underline">content policy</Link>{' '}
						compliance.
					</li>
					<li>
						<strong>Approval or Rejection:</strong> Cards that are well-written, funny, and policy-compliant get approved and added to the game. Rejected cards receive a reason when possible.
					</li>
					<li>
						<strong>Play Your Card:</strong> Approved cards become available in future games for all players to enjoy!
					</li>
				</ol>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Submission Guidelines</h2>

				<h3 className="text-2xl font-semibold mb-3">Do:</h3>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li>Be creative and original</li>
					<li>Use proper grammar and spelling</li>
					<li>Make sure your card fits the game's format</li>
					<li>Keep it funny, absurd, or thought-provoking</li>
					<li>Read the <Link to="/content-policy" className="text-brand-blue hover:underline">Content Policy</Link> before submitting</li>
				</ul>

				<h3 className="text-2xl font-semibold mb-3">Don't:</h3>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li>Submit duplicates of existing cards</li>
					<li>Use excessive profanity without humor or context</li>
					<li>Submit single words or low-effort entries</li>
					<li>Violate the Content Policy (illegal content, child exploitation, etc.)</li>
					<li>Spam or submit many similar cards at once</li>
				</ul>
			</section>

			<section className="mb-8 bg-brand-gray-light p-6 rounded-lg">
				<h2 className="text-2xl font-bold mb-4">Rate Limits</h2>
				<ul className="list-disc pl-6 space-y-2">
					<li><strong>10 submissions per hour</strong> per session</li>
					<li>Duplicate or very similar submissions within 5 minutes will be rejected</li>
					<li>If you hit the rate limit, wait an hour and try again</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Questions?</h2>
				<p className="text-lg leading-relaxed mb-4">
					If you have questions about card submissions, check out:
				</p>
				<ul className="list-disc pl-6 space-y-2 text-lg">
					<li><Link to="/content-policy" className="text-brand-blue hover:underline">Content Policy</Link> - What's acceptable</li>
					<li><Link to="/moderation-guidelines" className="text-brand-blue hover:underline">Moderation Guidelines</Link> - How cards are reviewed</li>
					<li>
						<a
							href="https://github.com/keif/cards-against-humanity/issues"
							target="_blank"
							rel="noopener noreferrer"
							className="text-brand-blue hover:underline"
						>
							GitHub Issues
						</a>{' '}
						- Report problems or ask questions
					</li>
				</ul>
			</section>

			<div className="bg-brand-yellow p-6 rounded-lg text-center">
				<p className="text-xl font-semibold mb-4">Ready to submit your hilarious card?</p>
				<p className="mb-4">Scroll up and fill out the form, or check out existing community submissions!</p>
				<a
					href="/community/cards"
					className="inline-block bg-black text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-brand-gray transition-colors no-underline"
				>
					View Community Cards
				</a>
			</div>
		</DocumentationLayout>
	);
};

export default SubmitCardsScreen;
