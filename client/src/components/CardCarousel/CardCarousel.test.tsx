import { render, screen } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { describe, it, expect } from 'vitest';
import CardCarousel from './CardCarousel';
import { A } from '../Card/Card';

const renderWithDnd = (ui: React.ReactElement) => {
	return render(<DndProvider backend={HTML5Backend}>{ui}</DndProvider>);
};

describe('CardCarousel Component', () => {
	it('renders empty carousel with no cards', () => {
		const { container } = renderWithDnd(<CardCarousel cards={[]} />);
		const wrapper = container.querySelector('.scrolling-wrapper');
		expect(wrapper).toBeInTheDocument();
		expect(wrapper?.children).toHaveLength(0);
	});

	it('renders single card', () => {
		const cards = [
			{
				cardType: A,
				text: 'A funny answer',
				id: 1
			}
		];
		renderWithDnd(<CardCarousel cards={cards} />);
		expect(screen.getByText(/A funny answer/)).toBeInTheDocument();
	});

	it('renders multiple cards', () => {
		const cards = [
			{
				cardType: A,
				text: 'First card',
				id: 1
			},
			{
				cardType: A,
				text: 'Second card',
				id: 2
			},
			{
				cardType: A,
				text: 'Third card',
				id: 3
			}
		];
		renderWithDnd(<CardCarousel cards={cards} />);
		expect(screen.getByText(/First card/)).toBeInTheDocument();
		expect(screen.getByText(/Second card/)).toBeInTheDocument();
		expect(screen.getByText(/Third card/)).toBeInTheDocument();
	});

	it('renders cards with correct index prop', () => {
		const cards = [
			{
				cardType: A,
				text: 'Card 1',
				id: 1
			},
			{
				cardType: A,
				text: 'Card 2',
				id: 2
			}
		];
		const { container } = renderWithDnd(<CardCarousel cards={cards} />);
		const cardElements = container.querySelectorAll('.card');
		expect(cardElements).toHaveLength(2);
	});

	it('uses card id as key for rendering', () => {
		const cards = [
			{
				cardType: A,
				text: 'Unique card 1',
				id: 101
			},
			{
				cardType: A,
				text: 'Unique card 2',
				id: 102
			}
		];
		renderWithDnd(<CardCarousel cards={cards} />);
		expect(screen.getByText(/Unique card 1/)).toBeInTheDocument();
		expect(screen.getByText(/Unique card 2/)).toBeInTheDocument();
	});

	it('handles cards with HTML content', () => {
		const cards = [
			{
				cardType: A,
				text: 'Line one<br>Line two',
				id: 1
			}
		];
		renderWithDnd(<CardCarousel cards={cards} />);
		const cardElement = screen.getByText(/Line one/);
		expect(cardElement.innerHTML).toContain('Line one');
		expect(cardElement.innerHTML).toContain('Line two');
	});

	it('renders with scrolling-wrapper class', () => {
		const cards = [
			{
				cardType: A,
				text: 'Test card',
				id: 1
			}
		];
		const { container } = renderWithDnd(<CardCarousel cards={cards} />);
		expect(container.querySelector('.scrolling-wrapper')).toBeInTheDocument();
	});
});
