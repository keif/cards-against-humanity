import React from 'react';
import DocumentationLayout from '../../components/DocumentationLayout/DocumentationLayout';

const PrivacyScreen: React.FC = () => {
	return (
		<DocumentationLayout title="Privacy Policy">
			<section className="mb-8">
				<p className="text-sm text-brand-gray mb-4">Last Updated: November 8, 2025</p>
				<p className="text-lg leading-relaxed mb-4">
					This privacy policy describes how we collect, use, and protect your information when you use our Cards Against Humanity online game platform.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">What We Collect</h2>

				<h3 className="text-2xl font-semibold mb-3">Information You Provide</h3>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li><strong>Display Name:</strong> The username you choose when joining a game</li>
					<li><strong>Game Data:</strong> Cards you play, votes you cast, and game interactions</li>
					<li><strong>Submitted Cards:</strong> Custom cards you submit for community review</li>
				</ul>

				<h3 className="text-2xl font-semibold mb-3">Automatically Collected Information</h3>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li><strong>Session Data:</strong> Temporary session identifiers stored in cookies to maintain your game connection</li>
					<li><strong>Connection Data:</strong> Socket.IO connection IDs for real-time gameplay</li>
					<li><strong>Server Logs:</strong> Basic technical logs for debugging and server maintenance</li>
				</ul>

				<h3 className="text-2xl font-semibold mb-3">What We Don't Collect</h3>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li>Email addresses</li>
					<li>Phone numbers</li>
					<li>Physical addresses</li>
					<li>Payment information (this service is free)</li>
					<li>Personal identifying information beyond your chosen display name</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">How We Use Your Information</h2>
				<ul className="list-disc pl-6 mb-4 space-y-2 text-lg">
					<li><strong>Gameplay:</strong> Enable real-time multiplayer game sessions</li>
					<li><strong>Session Management:</strong> Maintain your connection to active games</li>
					<li><strong>Card Moderation:</strong> Review submitted custom cards for appropriateness</li>
					<li><strong>Community Features:</strong> Display submitted cards for community voting</li>
					<li><strong>Technical Improvements:</strong> Analyze usage patterns to improve performance</li>
					<li><strong>Security:</strong> Prevent abuse, cheating, and spam</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Data Storage & Retention</h2>

				<h3 className="text-2xl font-semibold mb-3">Short-Term Storage (Redis)</h3>
				<p className="text-lg leading-relaxed mb-6">
					Game sessions, player data, and active game states are stored temporarily in Redis. This data is automatically deleted when:
				</p>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li>The game session ends</li>
					<li>All players leave the game</li>
					<li>The session expires (typically within 24 hours of inactivity)</li>
				</ul>

				<h3 className="text-2xl font-semibold mb-3">Long-Term Storage</h3>
				<p className="text-lg leading-relaxed mb-6">
					The following data is retained long-term:
				</p>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li><strong>Submitted Cards:</strong> Custom cards you submit are stored for community voting and potential inclusion in the game</li>
					<li><strong>Moderation Data:</strong> Card approvals, rejections, and voting history for quality control</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Cookies & Session Management</h2>
				<p className="text-lg leading-relaxed mb-4">
					We use session cookies to maintain your connection to game servers. These cookies are:
				</p>
				<ul className="list-disc pl-6 mb-4 space-y-2 text-lg">
					<li><strong>Essential:</strong> Required for gameplay functionality</li>
					<li><strong>Temporary:</strong> Expire when you close your browser</li>
					<li><strong>Non-tracking:</strong> Not used for analytics or advertising</li>
				</ul>
				<p className="text-lg leading-relaxed mb-4">
					By using this service, you consent to the use of essential session cookies.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Data Sharing & Third Parties</h2>
				<p className="text-lg leading-relaxed mb-4">
					<strong>We do not sell, rent, or share your personal information with third parties.</strong>
				</p>
				<p className="text-lg leading-relaxed mb-4">
					The only exception is if required by law (e.g., valid subpoena, court order, or legal investigation).
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Your Rights</h2>
				<ul className="list-disc pl-6 mb-4 space-y-2 text-lg">
					<li><strong>Access:</strong> Request information about what data we have stored</li>
					<li><strong>Deletion:</strong> Request deletion of your submitted cards or game data</li>
					<li><strong>Anonymity:</strong> Play anonymously by choosing a non-identifying display name</li>
					<li><strong>Opt-Out:</strong> Stop using the service at any time—simply close your browser</li>
				</ul>
				<p className="text-lg leading-relaxed mb-4">
					To exercise these rights, please{' '}
					<a
						href="https://github.com/keif/cards-against-humanity/issues"
						target="_blank"
						rel="noopener noreferrer"
						className="text-brand-blue hover:underline"
					>
						open a GitHub issue
					</a>{' '}
					with your request.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Children's Privacy</h2>
				<p className="text-lg leading-relaxed mb-4">
					This service is <strong>not intended for children under 17</strong>. We do not knowingly collect information from minors. If you believe a child has provided information to us, please contact us immediately so we can delete it.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Security</h2>
				<p className="text-lg leading-relaxed mb-4">
					We implement reasonable security measures to protect your data:
				</p>
				<ul className="list-disc pl-6 mb-4 space-y-2 text-lg">
					<li>HTTPS encryption for all connections</li>
					<li>Secure session management with httpOnly cookies</li>
					<li>Rate limiting to prevent abuse</li>
					<li>Regular security updates and patches</li>
				</ul>
				<p className="text-lg leading-relaxed mb-4">
					However, no internet transmission is 100% secure. Use this service at your own risk.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Changes to This Policy</h2>
				<p className="text-lg leading-relaxed mb-4">
					We may update this privacy policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of the service after changes constitutes acceptance of the updated policy.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Contact Us</h2>
				<p className="text-lg leading-relaxed mb-4">
					If you have questions about this privacy policy, please{' '}
					<a
						href="https://github.com/keif/cards-against-humanity/issues"
						target="_blank"
						rel="noopener noreferrer"
						className="text-brand-blue hover:underline"
					>
						open a GitHub issue
					</a>.
				</p>
			</section>

			<section className="bg-brand-gray-light p-6 rounded-lg">
				<p className="text-base leading-relaxed m-0">
					<strong>TL;DR:</strong> We collect minimal data (just your display name and game activity), use it only for gameplay, don't sell it to anyone, and delete most of it when your game ends. Play responsibly, and don't use your real name if you don't want to.
				</p>
			</section>
		</DocumentationLayout>
	);
};

export default PrivacyScreen;
