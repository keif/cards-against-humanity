import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Top from './Top';

describe('Top Component', () => {
	describe('Basic Rendering', () => {
		it('renders children', () => {
			render(
				<Top>
					<div>Test Content</div>
				</Top>
			);
			expect(screen.getByText('Test Content')).toBeInTheDocument();
		});

		it('applies top class', () => {
			const { container } = render(<Top><div>Content</div></Top>);
			const topDiv = container.querySelector('.top');
			expect(topDiv).toBeInTheDocument();
		});

		it('has id attribute', () => {
			const { container } = render(<Top><div>Content</div></Top>);
			const topDiv = container.querySelector('#top');
			expect(topDiv).toBeInTheDocument();
		});
	});

	describe('Custom ClassName', () => {
		it('applies custom className', () => {
			const { container } = render(
				<Top className="custom-top">
					<div>Content</div>
				</Top>
			);
			const topDiv = container.querySelector('.top');
			expect(topDiv).toHaveClass('custom-top', 'top');
		});

		it('renders without custom className', () => {
			const { container } = render(<Top><div>Content</div></Top>);
			const topDiv = container.querySelector('.top');
			expect(topDiv?.className).toContain('top');
		});

		it('applies multiple custom classes', () => {
			const { container } = render(
				<Top className="class-one class-two">
					<div>Content</div>
				</Top>
			);
			const topDiv = container.querySelector('.top');
			expect(topDiv).toHaveClass('top');
			expect(topDiv?.className).toContain('class-one');
			expect(topDiv?.className).toContain('class-two');
		});
	});

	describe('Children Rendering', () => {
		it('renders single child element', () => {
			render(
				<Top>
					<h1>Header</h1>
				</Top>
			);
			expect(screen.getByRole('heading')).toHaveTextContent('Header');
		});

		it('renders multiple children', () => {
			render(
				<Top>
					<h1>Title</h1>
					<p>Paragraph</p>
					<button>Click</button>
				</Top>
			);
			expect(screen.getByRole('heading')).toBeInTheDocument();
			expect(screen.getByText('Paragraph')).toBeInTheDocument();
			expect(screen.getByRole('button')).toBeInTheDocument();
		});

		it('renders nested components', () => {
			render(
				<Top>
					<div>
						<span>Nested</span>
						<span>Content</span>
					</div>
				</Top>
			);
			expect(screen.getByText('Nested')).toBeInTheDocument();
			expect(screen.getByText('Content')).toBeInTheDocument();
		});

		it('renders text content', () => {
			render(<Top>Plain text content</Top>);
			expect(screen.getByText('Plain text content')).toBeInTheDocument();
		});

		it('renders complex component trees', () => {
			render(
				<Top>
					<div className="header">
						<h1>Game Header</h1>
						<div className="info">
							<span>Player: Alice</span>
							<span>Time: 30</span>
						</div>
					</div>
				</Top>
			);
			expect(screen.getByText('Game Header')).toBeInTheDocument();
			expect(screen.getByText('Player: Alice')).toBeInTheDocument();
			expect(screen.getByText('Time: 30')).toBeInTheDocument();
		});

		it('renders empty children', () => {
			const { container } = render(<Top>{null}</Top>);
			const topDiv = container.querySelector('.top');
			expect(topDiv).toBeInTheDocument();
			expect(topDiv?.textContent).toBe('');
		});
	});

	describe('Structure', () => {
		it('contains children inside top div', () => {
			const { container } = render(
				<Top>
					<div data-testid="child">Child</div>
				</Top>
			);
			const topDiv = container.querySelector('.top');
			const child = screen.getByTestId('child');
			expect(topDiv?.contains(child)).toBe(true);
		});

		it('maintains proper DOM hierarchy', () => {
			const { container } = render(
				<Top className="wrapper">
					<div className="inner">Content</div>
				</Top>
			);
			const topDiv = container.querySelector('.top');
			const innerDiv = container.querySelector('.inner');
			expect(topDiv).toContainElement(innerDiv);
		});
	});
});
