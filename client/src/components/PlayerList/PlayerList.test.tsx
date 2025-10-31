import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import PlayerList from './PlayerList';

describe('PlayerList Component', () => {
	describe('Player Display', () => {
		it('renders empty list when no players', () => {
			const mockOnChange = vi.fn();
			render(
				<PlayerList
					className="test-class"
					joined={true}
					onChange={mockOnChange}
					players={[]}
				/>
			);
			const list = screen.getByRole('list');
			expect(list).toBeInTheDocument();
			expect(list.children).toHaveLength(0);
		});

		it('renders single player', () => {
			const mockOnChange = vi.fn();
			render(
				<PlayerList
					className="test-class"
					joined={true}
					onChange={mockOnChange}
					players={['Alice']}
				/>
			);
			expect(screen.getByText('Alice')).toBeInTheDocument();
		});

		it('renders multiple players', () => {
			const mockOnChange = vi.fn();
			render(
				<PlayerList
					className="test-class"
					joined={true}
					onChange={mockOnChange}
					players={['Alice', 'Bob', 'Charlie']}
				/>
			);
			expect(screen.getByText('Alice')).toBeInTheDocument();
			expect(screen.getByText('Bob')).toBeInTheDocument();
			expect(screen.getByText('Charlie')).toBeInTheDocument();
		});

		it('renders players in ordered list', () => {
			const mockOnChange = vi.fn();
			render(
				<PlayerList
					className="test-class"
					joined={true}
					onChange={mockOnChange}
					players={['Player 1', 'Player 2']}
				/>
			);
			const list = screen.getByRole('list');
			expect(list.tagName).toBe('OL');
		});

		it('applies custom className', () => {
			const mockOnChange = vi.fn();
			const { container } = render(
				<PlayerList
					className="custom-style"
					joined={true}
					onChange={mockOnChange}
					players={[]}
				/>
			);
			const playerList = container.querySelector('.player-list');
			expect(playerList).toHaveClass('player-list', 'custom-style');
		});
	});

	describe('Name Input (Not Joined)', () => {
		it('shows input field when not joined', () => {
			const mockOnChange = vi.fn();
			render(
				<PlayerList
					className="test-class"
					joined={false}
					onChange={mockOnChange}
					players={['Alice']}
				/>
			);
			const input = screen.getByPlaceholderText('Enter Name Here');
			expect(input).toBeInTheDocument();
		});

		it('does not show input field when joined', () => {
			const mockOnChange = vi.fn();
			render(
				<PlayerList
					className="test-class"
					joined={true}
					onChange={mockOnChange}
					players={['Alice']}
				/>
			);
			const input = screen.queryByPlaceholderText('Enter Name Here');
			expect(input).not.toBeInTheDocument();
		});

		it('input has correct attributes', () => {
			const mockOnChange = vi.fn();
			render(
				<PlayerList
					className="test-class"
					joined={false}
					onChange={mockOnChange}
					players={[]}
				/>
			);
			const input = screen.getByPlaceholderText('Enter Name Here');
			expect(input).toHaveAttribute('type', 'text');
			expect(input).toHaveAttribute('id', 'playerName');
			expect(input).toHaveClass('enterName');
		});

		it('calls onChange when typing in input', async () => {
			const user = userEvent.setup();
			const mockOnChange = vi.fn();
			render(
				<PlayerList
					className="test-class"
					joined={false}
					onChange={mockOnChange}
					players={[]}
				/>
			);
			const input = screen.getByPlaceholderText('Enter Name Here');
			await user.type(input, 'J');
			expect(mockOnChange).toHaveBeenCalledWith('J');
		});

		it('updates input value when typing', async () => {
			const user = userEvent.setup();
			const mockOnChange = vi.fn();
			render(
				<PlayerList
					className="test-class"
					joined={false}
					onChange={mockOnChange}
					players={[]}
				/>
			);
			const input = screen.getByPlaceholderText('Enter Name Here') as HTMLInputElement;
			await user.type(input, 'John');
			expect(input.value).toBe('John');
		});

		it('calls onChange for each character typed', async () => {
			const user = userEvent.setup();
			const mockOnChange = vi.fn();
			render(
				<PlayerList
					className="test-class"
					joined={false}
					onChange={mockOnChange}
					players={[]}
				/>
			);
			const input = screen.getByPlaceholderText('Enter Name Here');
			await user.type(input, 'Bob');
			expect(mockOnChange).toHaveBeenCalledTimes(3);
			expect(mockOnChange).toHaveBeenNthCalledWith(1, 'B');
			expect(mockOnChange).toHaveBeenNthCalledWith(2, 'Bo');
			expect(mockOnChange).toHaveBeenNthCalledWith(3, 'Bob');
		});

		it('shows input as last item in list', () => {
			const mockOnChange = vi.fn();
			render(
				<PlayerList
					className="test-class"
					joined={false}
					onChange={mockOnChange}
					players={['Alice', 'Bob']}
				/>
			);
			const list = screen.getByRole('list');
			const listItems = list.querySelectorAll('li');
			expect(listItems).toHaveLength(3);
			const lastItem = listItems[2];
			expect(lastItem.querySelector('input')).toBeInTheDocument();
		});
	});

	describe('Player List with Input', () => {
		it('renders players and input together when not joined', () => {
			const mockOnChange = vi.fn();
			render(
				<PlayerList
					className="test-class"
					joined={false}
					onChange={mockOnChange}
					players={['Alice', 'Bob', 'Charlie']}
				/>
			);
			expect(screen.getByText('Alice')).toBeInTheDocument();
			expect(screen.getByText('Bob')).toBeInTheDocument();
			expect(screen.getByText('Charlie')).toBeInTheDocument();
			expect(screen.getByPlaceholderText('Enter Name Here')).toBeInTheDocument();
		});

		it('handles empty input after typing and deleting', async () => {
			const user = userEvent.setup();
			const mockOnChange = vi.fn();
			render(
				<PlayerList
					className="test-class"
					joined={false}
					onChange={mockOnChange}
					players={[]}
				/>
			);
			const input = screen.getByPlaceholderText('Enter Name Here') as HTMLInputElement;
			await user.type(input, 'Test');
			await user.clear(input);
			expect(input.value).toBe('');
		});
	});

	describe('Optional onEnter prop', () => {
		it('accepts onEnter callback', () => {
			const mockOnChange = vi.fn();
			const mockOnEnter = vi.fn();
			render(
				<PlayerList
					className="test-class"
					joined={false}
					onChange={mockOnChange}
					onEnter={mockOnEnter}
					players={[]}
				/>
			);
			// onEnter is not used in current implementation but accepted as prop
			expect(screen.getByPlaceholderText('Enter Name Here')).toBeInTheDocument();
		});
	});
});
