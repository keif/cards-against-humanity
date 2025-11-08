import React from 'react';
import { Link } from 'react-router-dom';

interface DocumentationLayoutProps {
	title: string;
	children: React.ReactNode;
}

const DocumentationLayout: React.FC<DocumentationLayoutProps> = ({ title, children }) => {
	return (
		<div className="min-h-screen bg-white">
			<header className="bg-brand-gray-dark text-white py-6 px-6">
				<div className="max-w-content-md mx-auto flex items-center justify-between">
					<Link
						to="/"
						className="text-sm text-footer-text no-underline hover:text-white transition-colors"
					>
						← Back to Home
					</Link>
					<h1 className="text-2xl md:text-3xl font-bold text-white m-0">{title}</h1>
					<div className="w-24"></div> {/* Spacer for centering */}
				</div>
			</header>

			<main className="max-w-content-md mx-auto py-12 px-6">
				<div className="prose prose-lg max-w-none">
					{children}
				</div>
			</main>

			<footer className="bg-brand-gray-light py-8 px-6 mt-12">
				<div className="max-w-content-md mx-auto text-center">
					<Link
						to="/"
						className="text-brand-gray hover:text-black transition-colors no-underline font-semibold"
					>
						Return to Home
					</Link>
				</div>
			</footer>
		</div>
	);
};

export default DocumentationLayout;
