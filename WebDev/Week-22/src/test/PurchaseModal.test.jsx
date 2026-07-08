import { render, screen, fireEvent } from '@testing-library/react';
import PurchaseModal from '../components/PurchaseModal';
import { describe, it, expect, vi } from 'vitest';

vi.mock('lucide-react', () => ({
  CheckCircle: () => <div data-testid="check-circle-icon" />
}));

describe('PurchaseModal Component', () => {
  const onClose = vi.fn();
  const totalPrice = 1200.00;

  it('renders the modal with the correct content', () => {
    render(
      <PurchaseModal
        onClose={onClose}
        totalPrice={totalPrice}
      />
    );

    expect(screen.getByText(/Thank you for the purchase!/i)).toBeInTheDocument();
    
    expect(screen.getByText(/1200.00/i)).toBeInTheDocument();

    expect(screen.getByTestId('check-circle-icon')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    render(
      <PurchaseModal
        onClose={onClose}
        totalPrice={totalPrice}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});