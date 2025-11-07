import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Title from './Title';

describe('Title Component', () => {
	it('renders with text', () => {
		render(<Title text="Welcome to the Game" />);
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to the Game');
	});

	it('renders text in h1 tag', () => {
		render(<Title text="Game Title" />);
		const heading = screen.getByRole('heading', { level: 1 });
		expect(heading.tagName).toBe('H1');
	});

	it('renders wrapper div', () => {
		const { container } = render(<Title text="Test" />);
		const titleDiv = container.firstChild;
		expect(titleDiv).toBeInTheDocument();
	});

	it('renders short text', () => {
		render(<Title text="CAH" />);
		expect(screen.getByRole('heading')).toHaveTextContent('CAH');
	});

	it('renders long text', () => {
		const longText = 'This is a very long title that should still render properly in the component';
		render(<Title text={longText} />);
		expect(screen.getByRole('heading')).toHaveTextContent(longText);
	});

	it('renders text with special characters', () => {
		render(<Title text="Cardi Party! 🎉" />);
		expect(screen.getByRole('heading')).toHaveTextContent('Cardi Party! 🎉');
	});

	it('renders empty string', () => {
		render(<Title text="" />);
		const heading = screen.getByRole('heading');
		expect(heading).toBeInTheDocument();
		expect(heading.textContent).toBe('');
	});

	it('renders text with numbers', () => {
		render(<Title text="Round 5 - Final Round" />);
		expect(screen.getByRole('heading')).toHaveTextContent('Round 5 - Final Round');
	});

	it('contains h1 within wrapper div', () => {
		const { container } = render(<Title text="Test Title" />);
		const titleDiv = container.firstChild as HTMLElement;
		const heading = titleDiv?.querySelector('h1');
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent('Test Title');
	});
});
