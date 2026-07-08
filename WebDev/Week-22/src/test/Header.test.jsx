import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/Header';
import { describe, it, expect, vi } from 'vitest';
import useCartTotalSelector from '../store/cartTotalSelector';

vi.mock('../store/cartTotalSelector', () => ({
  default: vi.fn(),
}));

describe('Header Component', () => {
  it('renders the header with the correct item count badge', () => {
    useCartTotalSelector.mockReturnValue({ totalQuantity: 5, totalPrice: 100 });

    render(
      <Router>
        <Header />
      </Router>
    );

    expect(screen.getByText('amazon.in')).toBeInTheDocument();
    expect(screen.getByText('Hello, User')).toBeInTheDocument();
    
    // Check if the badge with text '5' exists
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('does not render the cart badge when quantity is 0', () => {
    // Mock the selector to return 0
    useCartTotalSelector.mockReturnValue({ totalQuantity: 0, totalPrice: 0 });

    render(
      <Router>
        <Header />
      </Router>
    );

    // Use queryByText to verify the element is absent
    const badge = screen.queryByText('0');
    expect(badge).not.toBeInTheDocument();
  });
});