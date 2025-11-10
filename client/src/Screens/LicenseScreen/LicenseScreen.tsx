import React from 'react';
import DocumentationLayout from '../../components/DocumentationLayout/DocumentationLayout';

const LicenseScreen: React.FC = () => {
	return (
		<DocumentationLayout title="Open Source License">
			<section className="mb-8">
				<p className="text-lg leading-relaxed mb-4">
					This project is open source and available under different licenses depending on the content type.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Software License (MIT)</h2>
				<p className="text-lg leading-relaxed mb-4">
					The source code for this online implementation is licensed under the <strong>MIT License</strong>.
				</p>

				<div className="bg-brand-gray-light p-6 rounded-lg mb-6 font-mono text-sm">
					<p className="mb-4">MIT License</p>
					<p className="mb-4">Copyright (c) 2025 Phucking Cards</p>
					<p className="mb-4">
						Permission is hereby granted, free of charge, to any person obtaining a copy
						of this software and associated documentation files (the "Software"), to deal
						in the Software without restriction, including without limitation the rights
						to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
						copies of the Software, and to permit persons to whom the Software is
						furnished to do so, subject to the following conditions:
					</p>
					<p className="mb-4">
						The above copyright notice and this permission notice shall be included in all
						copies or substantial portions of the Software.
					</p>
					<p className="mb-0">
						THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
						IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
						FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
						AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
						LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
						OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
						SOFTWARE.
					</p>
				</div>

				<p className="text-base leading-relaxed mb-4">
					<strong>What this means:</strong>
				</p>
				<ul className="list-disc pl-6 mb-4 space-y-2">
					<li>You can freely use, copy, modify, and distribute this software</li>
					<li>You can use it for commercial or non-commercial purposes</li>
					<li>The software comes with no warranty or guarantees</li>
					<li>You must include the MIT License notice in any copies</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Game Content License (CC BY-NC-SA 2.0)</h2>
				<p className="text-lg leading-relaxed mb-4">
					The Cards Against Humanity game content (questions and answers) is licensed under{' '}
					<a
						href="https://creativecommons.org/licenses/by-nc-sa/2.0/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-brand-blue hover:underline"
					>
						Creative Commons Attribution-NonCommercial-ShareAlike 2.0 (CC BY-NC-SA 2.0)
					</a>.
				</p>

				<div className="bg-white border-2 border-black p-6 rounded-lg mb-6">
					<h3 className="text-2xl font-semibold mb-4">Terms of Use (from Cards Against Humanity):</h3>
					<ul className="list-disc pl-6 space-y-3 text-lg">
						<li>
							<strong>Attribution (BY):</strong> If you distribute the game, give Cards Against Humanity LLC credit for the content
						</li>
						<li>
							<strong>Noncommercial (NC):</strong> You can't sell the game or any derivative of the game for money or sexual favors
						</li>
						<li>
							<strong>Share Alike (SA):</strong> If you modify and/or distribute the game, you must use the Creative Commons BY-NC-SA 2.0 License
						</li>
					</ul>
				</div>

				<div className="bg-brand-yellow p-6 rounded-lg mb-6">
					<p className="text-base leading-relaxed m-0">
						<strong>From the official Cards Against Humanity PDF:</strong><br />
						"You must also comply with the Laws of Man and Nature. Don't use any form of this game for nefarious purposes like libel, slander, diarrhea, copyright infringement, harassment, or death. If you break the law and get in trouble for it, Cards Against Humanity is free of all liability."
					</p>
				</div>

				<p className="text-lg leading-relaxed mb-4">
					Original Cards Against Humanity content is © Cards Against Humanity LLC. This online implementation is not affiliated with, endorsed by, or sponsored by Cards Against Humanity LLC.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Community-Submitted Cards</h2>
				<p className="text-lg leading-relaxed mb-4">
					Cards submitted by community members are licensed under the same{' '}
					<a
						href="https://creativecommons.org/licenses/by-nc-sa/2.0/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-brand-blue hover:underline"
					>
						CC BY-NC-SA 2.0 license
					</a>{' '}
					as the original game content.
				</p>
				<p className="text-lg leading-relaxed mb-4">
					By submitting cards, you agree to:
				</p>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li>License your submissions under CC BY-NC-SA 2.0</li>
					<li>Affirm that you own the content or have the right to submit it</li>
					<li>Allow the community to use, modify, and share your submissions</li>
					<li>Not use your submissions for commercial purposes without proper licensing</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Third-Party Dependencies</h2>
				<p className="text-lg leading-relaxed mb-4">
					This project uses various open-source libraries and frameworks, each with their own licenses:
				</p>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li><strong>React:</strong> MIT License</li>
					<li><strong>Express:</strong> MIT License</li>
					<li><strong>Socket.IO:</strong> MIT License</li>
					<li><strong>Redis:</strong> BSD 3-Clause License</li>
					<li><strong>TypeScript:</strong> Apache 2.0 License</li>
					<li><strong>Vite:</strong> MIT License</li>
					<li><strong>Tailwind CSS:</strong> MIT License</li>
				</ul>
				<p className="text-lg leading-relaxed mb-4">
					See{' '}
					<a
						href="https://github.com/keif/cards-against-humanity/blob/main/package.json"
						target="_blank"
						rel="noopener noreferrer"
						className="text-brand-blue hover:underline"
					>
						package.json
					</a>{' '}
					for the full list of dependencies and their licenses.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Contributing to the Project</h2>
				<p className="text-lg leading-relaxed mb-4">
					Contributions to this project are welcome! By contributing code, you agree to:
				</p>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li>License your code contributions under the MIT License</li>
					<li>License any game content contributions under CC BY-NC-SA 2.0</li>
					<li>Affirm that you have the right to contribute the content</li>
					<li>Follow the project's contribution guidelines</li>
				</ul>
				<p className="text-lg leading-relaxed mb-4">
					See the{' '}
					<a
						href="https://github.com/keif/cards-against-humanity"
						target="_blank"
						rel="noopener noreferrer"
						className="text-brand-blue hover:underline"
					>
						GitHub repository
					</a>{' '}
					for contribution guidelines.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Trademark Notice</h2>
				<p className="text-lg leading-relaxed mb-4">
					"Cards Against Humanity" is a trademark of Cards Against Humanity LLC. This fan-made project is not affiliated with, endorsed by, or sponsored by Cards Against Humanity LLC.
				</p>
				<p className="text-lg leading-relaxed mb-4">
					This implementation is provided for educational and non-commercial use only, in accordance with the CC BY-NC-SA 2.0 license under which the original game content is distributed.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Questions About Licensing?</h2>
				<p className="text-lg leading-relaxed mb-4">
					If you have questions about how you can use this software or game content, please:
				</p>
				<ul className="list-disc pl-6 mb-6 space-y-2 text-lg">
					<li>
						Review the{' '}
						<a
							href="https://creativecommons.org/licenses/by-nc-sa/2.0/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-brand-blue hover:underline"
						>
							CC BY-NC-SA 2.0 license
						</a>{' '}
						for game content
					</li>
					<li>
						Review the{' '}
						<a
							href="https://opensource.org/licenses/MIT"
							target="_blank"
							rel="noopener noreferrer"
							className="text-brand-blue hover:underline"
						>
							MIT License
						</a>{' '}
						for software
					</li>
					<li>
						Open a{' '}
						<a
							href="https://github.com/keif/cards-against-humanity/issues"
							target="_blank"
							rel="noopener noreferrer"
							className="text-brand-blue hover:underline"
						>
							GitHub issue
						</a>{' '}
						with your specific question
					</li>
				</ul>
			</section>

			<section className="bg-brand-gray-light p-6 rounded-lg">
				<p className="text-base leading-relaxed m-0">
					<strong>TL;DR:</strong> The software is MIT licensed (use it however you want). The game content is CC BY-NC-SA 2.0 (use it non-commercially with attribution). Community submissions are also CC BY-NC-SA 2.0. This is a fan project, not affiliated with Cards Against Humanity LLC.
				</p>
			</section>
		</DocumentationLayout>
	);
};

export default LicenseScreen;
