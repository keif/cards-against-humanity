import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Screen from './Screen';

describe('Screen Component', () => {
	describe('Basic Rendering', () => {
		it('renders children', () => {
			render(
				<Screen>
					<div>Screen Content</div>
				</Screen>
			);
			expect(screen.getByText('Screen Content')).toBeInTheDocument();
		});

		it('applies screen class', () => {
			const { container } = render(
				<Screen>
					<div>Content</div>
				</Screen>
			);
			const screenDiv = container.querySelector('.screen');
			expect(screenDiv).toBeInTheDocument();
		});
	});

	describe('Children Rendering', () => {
		it('renders single child element', () => {
			render(
				<Screen>
					<h1>Game Screen</h1>
				</Screen>
			);
			expect(screen.getByRole('heading')).toHaveTextContent('Game Screen');
		});

		it('renders multiple children', () => {
			render(
				<Screen>
					<div>First</div>
					<div>Second</div>
					<div>Third</div>
				</Screen>
			);
			expect(screen.getByText('First')).toBeInTheDocument();
			expect(screen.getByText('Second')).toBeInTheDocument();
			expect(screen.getByText('Third')).toBeInTheDocument();
		});

		it('renders nested components', () => {
			render(
				<Screen>
					<div className="outer">
						<div className="inner">
							<span>Nested Content</span>
						</div>
					</div>
				</Screen>
			);
			expect(screen.getByText('Nested Content')).toBeInTheDocument();
		});

		it('renders text nodes', () => {
			render(<Screen>Plain text in screen</Screen>);
			expect(screen.getByText('Plain text in screen')).toBeInTheDocument();
		});

		it('renders complex component hierarchy', () => {
			render(
				<Screen>
					<header>
						<h1>Title</h1>
					</header>
					<main>
						<p>Main content</p>
					</main>
					<footer>
						<p>Footer</p>
					</footer>
				</Screen>
			);
			expect(screen.getByRole('heading')).toHaveTextContent('Title');
			expect(screen.getByText('Main content')).toBeInTheDocument();
			expect(screen.getByText('Footer')).toBeInTheDocument();
		});

		it('renders with various React elements', () => {
			render(
				<Screen>
					<button>Button</button>
					<input placeholder="Input field" />
					<a href="/link">Link</a>
				</Screen>
			);
			expect(screen.getByRole('button')).toBeInTheDocument();
			expect(screen.getByPlaceholderText('Input field')).toBeInTheDocument();
			expect(screen.getByRole('link')).toBeInTheDocument();
		});

		it('renders empty children', () => {
			const { container } = render(<Screen>{null}</Screen>);
			const screenDiv = container.querySelector('.screen');
			expect(screenDiv).toBeInTheDocument();
			expect(screenDiv?.textContent).toBe('');
		});
	});

	describe('Structure', () => {
		it('contains children inside screen div', () => {
			const { container } = render(
				<Screen>
					<div data-testid="child">Child Element</div>
				</Screen>
			);
			const screenDiv = container.querySelector('.screen');
			const child = screen.getByTestId('child');
			expect(screenDiv?.contains(child)).toBe(true);
		});

		it('maintains proper DOM hierarchy', () => {
			const { container } = render(
				<Screen>
					<div className="parent">
						<div className="child">Content</div>
					</div>
				</Screen>
			);
			const screenDiv = container.querySelector('.screen');
			const parentDiv = container.querySelector('.parent');
			const childDiv = container.querySelector('.child');
			expect(screenDiv).toContainElement(parentDiv);
			expect(parentDiv).toContainElement(childDiv);
		});

		it('renders a single wrapper div', () => {
			const { container } = render(
				<Screen>
					<div>Content</div>
				</Screen>
			);
			const screenDivs = container.querySelectorAll('.screen');
			expect(screenDivs).toHaveLength(1);
		});
	});

	describe('Integration', () => {
		it('works with complex game components', () => {
			render(
				<Screen>
					<div className="game-header">
						<h1>Cardi Party</h1>
						<div className="status">3 players</div>
					</div>
					<div className="game-content">
						<div className="card">Question Card</div>
						<div className="card">Answer Card</div>
					</div>
				</Screen>
			);
			expect(screen.getByText('Cardi Party')).toBeInTheDocument();
			expect(screen.getByText('3 players')).toBeInTheDocument();
			expect(screen.getByText('Question Card')).toBeInTheDocument();
			expect(screen.getByText('Answer Card')).toBeInTheDocument();
		});
	});
});
