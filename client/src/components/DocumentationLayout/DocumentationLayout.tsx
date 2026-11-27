import React from 'react';
import { Link } from 'react-router-dom';
import FooterSection from '../../Screens/HomeScreen/FooterSection';

interface DocumentationLayoutProps {
	title: string;
	children: React.ReactNode;
}

const DocumentationLayout: React.FC<DocumentationLayoutProps> = ({ title, children }) => {
	return (
		<div className="min-h-screen bg-paper text-ink">
			<header className="bg-table text-paper py-6 px-4 md:px-8">
				<div className="max-w-content-md mx-auto flex flex-col gap-4">
					<Link
						to="/"
						className="text-sm font-bold text-muted no-underline hover:text-paper transition-colors self-start"
					>
						← Back to Home
					</Link>
					<h1 className="font-display-tight text-[clamp(2.25rem,6vw,3.5rem)] leading-[0.95] m-0">{title}</h1>
				</div>
			</header>

			<main className="max-w-content-md mx-auto py-12 px-4 md:px-8 leading-relaxed">
				<div className="prose prose-lg max-w-none">
					{children}
				</div>
			</main>

			<FooterSection />
		</div>
	);
};

export default DocumentationLayout;
