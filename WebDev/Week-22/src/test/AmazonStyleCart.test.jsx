import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AmazonStyleCart from '../components/AmazonStyleCart';
import { useCartStore } from '../store/cartItemsState';

describe('AmazonStyleCart', () => {
  const initialCartItems = [
    { id: 1, name: 'Product 1', price: 10.0, quantity: 2, image: 'image1.jpg' },
    { id: 2, name: 'Product 2', price: 20.0, quantity: 1, image: 'image2.jpg' },
  ];

  beforeEach(() => {
    useCartStore.setState({ cartItems: initialCartItems });
  });

  const renderComponent = () => render(
    <MemoryRouter>
      <AmazonStyleCart />
    </MemoryRouter>
  );

  it('renders the cart with items', () => {
    renderComponent();
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('removes an item when the delete button is clicked', () => {
    renderComponent();
    // Assuming you have 'Delete' buttons for each item
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    
    // Verify item is gone
    expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
  });

  it('opens the purchase modal when the checkout button is clicked', () => {
    renderComponent();
    const checkoutButton = screen.getByText(/proceed to buy/i);
    fireEvent.click(checkoutButton);
    
    // UPDATED: Search for the text actually inside your PurchaseModal
    expect(screen.getByText(/Thank you for the purchase!/i)).toBeInTheDocument();
  });
});