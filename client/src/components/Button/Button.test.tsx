import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

const renderWithRouter = (ui: React.ReactElement) => {
	return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Button Component', () => {
	describe('Disabled Button', () => {
		it('renders disabled button with text', () => {
			renderWithRouter(<Button text="Disabled Button" disabled={true} />);
			const button = screen.getByRole('button');
			expect(button).toBeDisabled();
			expect(button).toHaveTextContent('Disabled Button');
		});

		it('has disabled class and data-qa attribute', () => {
			renderWithRouter(<Button text="Test" disabled={true} />);
			const button = screen.getByRole('button');
			expect(button).toHaveClass('menuButton', 'disabled');
			expect(button).toHaveAttribute('data-qa', 'button-disabled');
		});

		it('applies custom className', () => {
			renderWithRouter(<Button text="Test" disabled={true} className="custom-class" />);
			const button = screen.getByRole('button');
			expect(button).toHaveClass('menuButton', 'disabled', 'custom-class');
		});

		it('respects button type', () => {
			renderWithRouter(<Button text="Test" disabled={true} type="submit" />);
			const button = screen.getByRole('button');
			expect(button).toHaveAttribute('type', 'submit');
		});
	});

	describe('Link Button', () => {
		it('renders as Link when asLink is true', () => {
			renderWithRouter(<Button text="Go Home" asLink={true} link="/home" />);
			const link = screen.getByRole('link');
			expect(link).toHaveTextContent('Go Home');
			expect(link).toHaveAttribute('href', '/home');
		});

		it('has menuButton class and data-qa attribute', () => {
			renderWithRouter(<Button text="Test" asLink={true} link="/test" />);
			const link = screen.getByRole('link');
			expect(link).toHaveClass('menuButton');
			expect(link).toHaveAttribute('data-qa', 'link');
		});

		it('applies custom className to link', () => {
			renderWithRouter(<Button text="Test" asLink={true} link="/test" className="link-custom" />);
			const link = screen.getByRole('link');
			expect(link).toHaveClass('menuButton', 'link-custom');
		});

		it('does not render when asLink is true but link is not provided', () => {
			const { container } = renderWithRouter(<Button text="Broken Link" asLink={true} />);
			const link = screen.queryByRole('link');
			expect(link).not.toBeInTheDocument();
			expect(container.querySelector('button')).not.toBeInTheDocument();
		});

		it('navigates to specified path', () => {
			renderWithRouter(<Button text="Test Link" asLink={true} link="/party/ABC123" />);
			const link = screen.getByRole('link');
			expect(link).toHaveAttribute('href', '/party/ABC123');
		});
	});

	describe('Clickable Button', () => {
		it('renders clickable button with text', () => {
			const handleClick = vi.fn();
			renderWithRouter(<Button text="Click Me" onClick={handleClick} />);
			const button = screen.getByRole('button');
			expect(button).toHaveTextContent('Click Me');
		});

		it('calls onClick handler when clicked', async () => {
			const user = userEvent.setup();
			const handleClick = vi.fn();
			renderWithRouter(<Button text="Click Me" onClick={handleClick} />);
			const button = screen.getByRole('button');
			await user.click(button);
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it('has button class and data-qa attribute', () => {
			const handleClick = vi.fn();
			renderWithRouter(<Button text="Test" onClick={handleClick} />);
			const button = screen.getByRole('button');
			expect(button).toHaveClass('menuButton', 'button');
			expect(button).toHaveAttribute('data-qa', 'button-clickable');
		});

		it('applies custom className', () => {
			const handleClick = vi.fn();
			renderWithRouter(<Button text="Test" onClick={handleClick} className="btn-primary" />);
			const button = screen.getByRole('button');
			expect(button).toHaveClass('menuButton', 'button', 'btn-primary');
		});

		it('respects button type prop', () => {
			const handleClick = vi.fn();
			renderWithRouter(<Button text="Submit" onClick={handleClick} type="submit" />);
			const button = screen.getByRole('button');
			expect(button).toHaveAttribute('type', 'submit');
		});

		it('defaults to type="button"', () => {
			const handleClick = vi.fn();
			renderWithRouter(<Button text="Test" onClick={handleClick} />);
			const button = screen.getByRole('button');
			expect(button).toHaveAttribute('type', 'button');
		});

		it('handles multiple clicks', async () => {
			const user = userEvent.setup();
			const handleClick = vi.fn();
			renderWithRouter(<Button text="Click Me" onClick={handleClick} />);
			const button = screen.getByRole('button');
			await user.click(button);
			await user.click(button);
			await user.click(button);
			expect(handleClick).toHaveBeenCalledTimes(3);
		});
	});

	describe('Priority Rendering', () => {
		it('renders disabled button even when onClick is provided', () => {
			const handleClick = vi.fn();
			renderWithRouter(
				<Button text="Disabled with Click" disabled={true} onClick={handleClick} />
			);
			const button = screen.getByRole('button');
			expect(button).toBeDisabled();
			expect(button).toHaveAttribute('data-qa', 'button-disabled');
		});

		it('renders link when asLink and onClick both provided', () => {
			const handleClick = vi.fn();
			renderWithRouter(
				<Button text="Link Priority" asLink={true} link="/test" onClick={handleClick} />
			);
			const link = screen.getByRole('link');
			expect(link).toHaveAttribute('href', '/test');
			expect(screen.queryByRole('button')).not.toBeInTheDocument();
		});
	});
});
