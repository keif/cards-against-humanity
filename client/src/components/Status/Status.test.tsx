import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Status from './Status';

describe('Status Component', () => {
	it('renders with message', () => {
		render(<Status message="Game starting soon!" />);
		expect(screen.getByText('Game starting soon!')).toBeInTheDocument();
	});

	it('renders container div', () => {
		const { container } = render(<Status message="Test message" />);
		const statusDiv = container.firstChild;
		expect(statusDiv).toBeInTheDocument();
	});

	it('applies custom className', () => {
		const { container } = render(<Status message="Test" className="custom-status" />);
		const statusDiv = container.querySelector('.custom-status');
		expect(statusDiv).toBeInTheDocument();
		expect(statusDiv).toHaveClass('custom-status');
	});

	it('keeps the space but hides the bar for an empty or blank message', () => {
		for (const message of ['', '   ']) {
			const { container, unmount } = render(<Status message={message} />);
			const statusDiv = container.firstChild as HTMLElement;
			expect(statusDiv).toBeInTheDocument();
			expect(statusDiv).toHaveClass('invisible');
			expect(statusDiv).toHaveAttribute('aria-hidden', 'true');
			unmount();
		}
	});

	it('shows the bar when there is a message', () => {
		const { container } = render(<Status message="Choose one Card" />);
		expect(container.firstChild).not.toHaveClass('invisible');
		expect(container.firstChild).not.toHaveAttribute('aria-hidden');
	});

	it('renders long messages', () => {
		const longMessage = 'This is a very long status message that should still render correctly in the status modal component';
		render(<Status message={longMessage} />);
		expect(screen.getByText(longMessage)).toBeInTheDocument();
	});

	it('renders messages with special characters', () => {
		render(<Status message="Player 1 wins! 🎉" />);
		expect(screen.getByText(/Player 1 wins! 🎉/)).toBeInTheDocument();
	});

	it('renders without custom className', () => {
		const { container } = render(<Status message="Test" />);
		const statusDiv = container.firstChild as HTMLElement;
		expect(statusDiv).toBeInTheDocument();
		expect(statusDiv.className).not.toContain('undefined');
	});
});
