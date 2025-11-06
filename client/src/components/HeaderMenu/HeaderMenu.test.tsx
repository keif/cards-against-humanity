import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeaderMenu from './HeaderMenu';

describe('HeaderMenu Component', () => {
	describe('Basic Rendering', () => {
		it('renders with all props', () => {
			render(<HeaderMenu text="Waiting for players" timeLeft={30} playerName="Alice" />);
			expect(screen.getByText('Alice')).toBeInTheDocument();
			expect(screen.getByText('Waiting for players')).toBeInTheDocument();
			expect(screen.getByText('30')).toBeInTheDocument();
		});

		it('renders without playerName', () => {
			render(<HeaderMenu text="Game starting" timeLeft={15} />);
			expect(screen.getByText('Game starting')).toBeInTheDocument();
			expect(screen.getByText('15')).toBeInTheDocument();
		});

		it('applies headerMenu class', () => {
			const { container } = render(<HeaderMenu text="Test" timeLeft={10} />);
			expect(container.querySelector('.headerMenu')).toBeInTheDocument();
		});

		it('applies innerHeaderMenu class', () => {
			const { container } = render(<HeaderMenu text="Test" timeLeft={10} />);
			expect(container.querySelector('.innerHeaderMenu')).toBeInTheDocument();
		});
	});

	describe('Player Name Display', () => {
		it('shows player name when provided', () => {
			render(<HeaderMenu text="Status" timeLeft={20} playerName="Bob" />);
			expect(screen.getByText('Bob')).toBeInTheDocument();
		});

		it('shows empty string when playerName is not provided', () => {
			const { container } = render(<HeaderMenu text="Status" timeLeft={20} />);
			const playerName = container.querySelector('.player-name-text');
			expect(playerName?.textContent).toBe('');
		});

		it('handles long player names', () => {
			render(<HeaderMenu text="Status" timeLeft={10} playerName="PlayerWithVeryLongName123" />);
			expect(screen.getByText('PlayerWithVeryLongName123')).toBeInTheDocument();
		});

		it('handles player names with special characters', () => {
			render(<HeaderMenu text="Status" timeLeft={10} playerName="Player_123!" />);
			expect(screen.getByText('Player_123!')).toBeInTheDocument();
		});
	});

	describe('Text Display', () => {
		it('displays status text', () => {
			render(<HeaderMenu text="Waiting for judge" timeLeft={25} />);
			expect(screen.getByText('Waiting for judge')).toBeInTheDocument();
		});

		it('displays empty text', () => {
			const { container } = render(<HeaderMenu text="" timeLeft={10} />);
			const paragraphs = container.querySelectorAll('p');
			expect(paragraphs[0].textContent).toBe('');
		});

		it('displays long text messages', () => {
			const longText = 'This is a very long status message that should display in the header';
			render(<HeaderMenu text={longText} timeLeft={5} />);
			expect(screen.getByText(longText)).toBeInTheDocument();
		});
	});

	describe('Time Display', () => {
		it('displays positive time', () => {
			render(<HeaderMenu text="Status" timeLeft={45} />);
			expect(screen.getByText('45')).toBeInTheDocument();
		});

		it('displays zero time', () => {
			render(<HeaderMenu text="Status" timeLeft={0} />);
			expect(screen.getByText('0')).toBeInTheDocument();
		});

		it('displays single digit time', () => {
			render(<HeaderMenu text="Status" timeLeft={5} />);
			expect(screen.getByText('5')).toBeInTheDocument();
		});

		it('displays large time values', () => {
			render(<HeaderMenu text="Status" timeLeft={999} />);
			expect(screen.getByText('999')).toBeInTheDocument();
		});

		it('displays negative time', () => {
			render(<HeaderMenu text="Status" timeLeft={-1} />);
			expect(screen.getByText('-1')).toBeInTheDocument();
		});
	});

	describe('Component Structure', () => {
		it('renders two paragraph elements', () => {
			const { container } = render(<HeaderMenu text="Test" timeLeft={10} playerName="User" />);
			const paragraphs = container.querySelectorAll('p');
			expect(paragraphs).toHaveLength(2);
		});

		it('renders paragraphs in correct order', () => {
			const { container } = render(<HeaderMenu text="Middle" timeLeft={99} playerName="First" />);
			const paragraphs = container.querySelectorAll('p');
			expect(paragraphs[0]).toHaveTextContent('Middle');
			expect(paragraphs[1]).toHaveTextContent('99');
		});

		it('contains innerHeaderMenu inside headerMenu', () => {
			const { container } = render(<HeaderMenu text="Test" timeLeft={10} />);
			const headerMenu = container.querySelector('.headerMenu');
			const innerHeaderMenu = headerMenu?.querySelector('.innerHeaderMenu');
			expect(innerHeaderMenu).toBeInTheDocument();
		});
	});

	describe('Score Badge', () => {
		it('shows score badge when playerScore is provided', () => {
			const { container } = render(<HeaderMenu text="Status" timeLeft={20} playerName="Alice" playerScore={5} />);
			const badge = container.querySelector('.score-badge');
			expect(badge).toBeInTheDocument();
			expect(badge?.textContent).toBe('5');
		});

		it('does not show score badge when playerScore is undefined', () => {
			const { container } = render(<HeaderMenu text="Status" timeLeft={20} playerName="Alice" />);
			const badge = container.querySelector('.score-badge');
			expect(badge).not.toBeInTheDocument();
		});

		it('shows zero score badge', () => {
			const { container } = render(<HeaderMenu text="Status" timeLeft={20} playerName="Alice" playerScore={0} />);
			const badge = container.querySelector('.score-badge');
			expect(badge).toBeInTheDocument();
			expect(badge?.textContent).toBe('0');
		});
	});
});
