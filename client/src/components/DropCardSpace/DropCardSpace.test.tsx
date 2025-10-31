import { render, screen } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { describe, it, expect, vi } from 'vitest';
import DropCardSpace from './DropCardSpace';
import { Q } from '../Card/Card';
import { JUDGE, JUDGE_SELECTING, JUDGE_WAITING, PLAYER, PLAYER_SELECTING, PLAYER_WAITING, VIEWING_WINNER } from '@/constants/constants';

const renderWithDnd = (ui: React.ReactElement) => {
	return render(<DndProvider backend={HTML5Backend}>{ui}</DndProvider>);
};

const mockQCard = {
	cardType: Q,
	text: 'What is the best thing in life?',
	id: 1
};

const mockPlayerChoice = {
	cardType: 'A' as const,
	text: 'Crushing your enemies',
	id: 2
};

describe('DropCardSpace Component', () => {
	describe('Player Selecting State', () => {
		it('renders with placeholder when player has no choice', () => {
			renderWithDnd(
				<DropCardSpace
					cardsIn={0}
					roundRole={PLAYER}
					roundState={PLAYER_SELECTING}
					QCard={mockQCard}
					playerChoice={null}
					dropHandler={vi.fn()}
				/>
			);
			expect(screen.getByText(/What is the best thing in life/)).toBeInTheDocument();
			expect(screen.getByText(/Drop Card Here/i)).toBeInTheDocument();
		});

		it('renders with player choice when card is selected', () => {
			renderWithDnd(
				<DropCardSpace
					cardsIn={2}
					roundRole={PLAYER}
					roundState={PLAYER_SELECTING}
					QCard={mockQCard}
					playerChoice={mockPlayerChoice}
					dropHandler={vi.fn()}
				/>
			);
			expect(screen.getByText(/What is the best thing in life/)).toBeInTheDocument();
			expect(screen.getByText(/Crushing your enemies/)).toBeInTheDocument();
			expect(screen.queryByText(/Drop Card Here/i)).not.toBeInTheDocument();
		});

		it('shows status with cards in count', () => {
			renderWithDnd(
				<DropCardSpace
					cardsIn={3}
					roundRole={PLAYER}
					roundState={PLAYER_SELECTING}
					QCard={mockQCard}
					playerChoice={null}
					dropHandler={vi.fn()}
				/>
			);
			expect(screen.getByText(/3 Cards In/)).toBeInTheDocument();
		});
	});

	describe('Judge Selecting State', () => {
		it('renders with placeholder for judge', () => {
			renderWithDnd(
				<DropCardSpace
					cardsIn={4}
					roundRole={JUDGE}
					roundState={JUDGE_SELECTING}
					QCard={mockQCard}
					playerChoice={null}
					dropHandler={vi.fn()}
				/>
			);
			expect(screen.getByText(/What is the best thing in life/)).toBeInTheDocument();
			expect(screen.getByText(/Drop Card Here/i)).toBeInTheDocument();
		});

		it('does not show status when judge is selecting', () => {
			renderWithDnd(
				<DropCardSpace
					cardsIn={4}
					roundRole={JUDGE}
					roundState={JUDGE_SELECTING}
					QCard={mockQCard}
					playerChoice={null}
					dropHandler={vi.fn()}
				/>
			);
			expect(screen.queryByText(/4 Cards In/)).not.toBeInTheDocument();
		});

		it('shows only question card for player during judge selecting', () => {
			renderWithDnd(
				<DropCardSpace
					cardsIn={4}
					roundRole={PLAYER}
					roundState={JUDGE_SELECTING}
					QCard={mockQCard}
					playerChoice={null}
					dropHandler={vi.fn()}
				/>
			);
			expect(screen.getByText(/What is the best thing in life/)).toBeInTheDocument();
			expect(screen.queryByText(/Drop Card Here/i)).not.toBeInTheDocument();
		});
	});

	describe('Waiting States', () => {
		it('shows only question card for player waiting', () => {
			renderWithDnd(
				<DropCardSpace
					cardsIn={3}
					roundRole={PLAYER}
					roundState={PLAYER_WAITING}
					QCard={mockQCard}
					playerChoice={mockPlayerChoice}
					dropHandler={vi.fn()}
				/>
			);
			expect(screen.getByText(/What is the best thing in life/)).toBeInTheDocument();
			expect(screen.queryByText(/Crushing your enemies/)).not.toBeInTheDocument();
			expect(screen.getByText(/3 Cards In/)).toBeInTheDocument();
		});

		it('shows only question card for judge waiting', () => {
			renderWithDnd(
				<DropCardSpace
					cardsIn={2}
					roundRole={JUDGE}
					roundState={JUDGE_WAITING}
					QCard={mockQCard}
					playerChoice={null}
					dropHandler={vi.fn()}
				/>
			);
			expect(screen.getByText(/What is the best thing in life/)).toBeInTheDocument();
			expect(screen.queryByText(/Drop Card Here/i)).not.toBeInTheDocument();
			expect(screen.getByText(/2 Cards In/)).toBeInTheDocument();
		});
	});

	describe('Viewing Winner State', () => {
		it('renders with player choice during winner view', () => {
			renderWithDnd(
				<DropCardSpace
					cardsIn={5}
					roundRole={PLAYER}
					roundState={VIEWING_WINNER}
					QCard={mockQCard}
					playerChoice={mockPlayerChoice}
					dropHandler={vi.fn()}
				/>
			);
			expect(screen.getByText(/What is the best thing in life/)).toBeInTheDocument();
			expect(screen.getByText(/Crushing your enemies/)).toBeInTheDocument();
		});

		it('does not show cards in status during winner view', () => {
			renderWithDnd(
				<DropCardSpace
					cardsIn={5}
					roundRole={PLAYER}
					roundState={VIEWING_WINNER}
					QCard={mockQCard}
					playerChoice={mockPlayerChoice}
					dropHandler={vi.fn()}
				/>
			);
			expect(screen.queryByText(/5 Cards In/)).not.toBeInTheDocument();
		});
	});

	describe('Invalid State Combinations', () => {
		it('renders error message for invalid state combination', () => {
			const { container } = renderWithDnd(
				<DropCardSpace
					cardsIn={0}
					roundRole="invalid-role"
					roundState="invalid-state"
					QCard={mockQCard}
					playerChoice={null}
					dropHandler={vi.fn()}
				/>
			);
			expect(container.textContent).toContain('invalid combination');
			expect(container.textContent).toContain('invalid-role');
			expect(container.textContent).toContain('invalid-state');
		});
	});
});
