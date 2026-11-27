import { render, screen } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { describe, it, expect } from 'vitest';
import Card, { Q, A, TITLE, PLACEHOLDER, LINK, answerTextSize } from './Card';

// Helper to wrap components with DnD context
const renderWithDnd = (ui: React.ReactElement) => {
	return render(<DndProvider backend={HTML5Backend}>{ui}</DndProvider>);
};

describe('Card Component', () => {
	it('renders a Question card with text', () => {
		renderWithDnd(
			<Card cardType={Q} text="What is the meaning of life?" id={1} />
		);
		expect(screen.getByText(/What is the meaning of life/)).toBeInTheDocument();
	});

	it('replaces underscore with blank line in Question cards', () => {
		renderWithDnd(
			<Card cardType={Q} text="_ is the best thing ever" id={2} />
		);
		expect(screen.getByText(/__________ is the best thing ever/)).toBeInTheDocument();
	});

	it('renders a Title card', () => {
		renderWithDnd(<Card cardType={TITLE} />);
		expect(screen.getByText(/Cardi Party/i)).toBeInTheDocument();
	});

	it('renders a Placeholder card', () => {
		renderWithDnd(<Card cardType={PLACEHOLDER} />);
		expect(screen.getByText(/Drop Card Here/i)).toBeInTheDocument();
	});

	it('renders an Answer card with text', () => {
		renderWithDnd(
			<Card cardType={A} text="A hilarious answer" id={3} index={0} />
		);
		expect(screen.getByText(/A hilarious answer/)).toBeInTheDocument();
	});

	it('renders Question card with status', () => {
		renderWithDnd(
			<Card
				cardType={Q}
				text="Test question"
				status="3 Cards In"
				id={4}
			/>
		);
		expect(screen.getByText(/3 Cards In/)).toBeInTheDocument();
	});

	describe('invite (LINK) card', () => {
		const renderInviteFor = (code: string) => {
			window.history.pushState({}, '', `/join/${code}`);
			renderWithDnd(<Card cardType={LINK} link={code} />);
			return screen.getByRole('button', { name: `Copy invite link for party ${code}` });
		};

		it('shows a short code at full size', () => {
			const button = renderInviteFor('k7qx2');
			expect(button).toHaveTextContent('k7qx2');
			expect(button.className).toContain('text-[28px]');
		});

		it('shrinks and wraps a 20-character code so it stays inside the card', () => {
			const button = renderInviteFor('late-night_crew_2026');
			expect(button.className).toContain('text-[18px]');
			expect(screen.getByText('late-night_crew_2026')).toHaveClass('break-all');
		});
	});

	describe('answer card discard button', () => {
		it('hangs the discard button off the corner, clear of the answer text', () => {
			renderWithDnd(<Card cardType={A} text="An answer" id={7} onDiscard={() => {}} />);
			const button = screen.getByRole('button', { name: 'Discard card' });
			expect(button.className).toContain('-top-1.5');
			expect(button.className).toContain('-right-1.5');
		});
	});

	describe('answerTextSize', () => {
		it('keeps the full size for typical answers, including the 57-char boundary', () => {
			expect(answerTextSize('Flying sex snakes.')).toContain('max-[380px]:text-[17px]');
			expect(answerTextSize('a'.repeat(57))).toContain('max-[380px]:text-[17px]');
		});

		it('steps down on phones from 58 chars', () => {
			expect(answerTextSize('a'.repeat(58))).toContain('max-[380px]:text-[14px]');
			expect(answerTextSize('a'.repeat(105))).toContain('max-[380px]:text-[14px]');
		});

		it('uses the smallest size for the longest answers', () => {
			const size = answerTextSize('a'.repeat(106));
			expect(size).toContain('text-[17px]');
			expect(size).toContain('max-[380px]:text-[12px]');
		});

		it('treats missing or empty text as short', () => {
			expect(answerTextSize(undefined)).toContain('max-[380px]:text-[17px]');
			expect(answerTextSize('')).toContain('max-[380px]:text-[17px]');
		});
	});
});
