import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductModal from '../components/ProductModal';

describe('ProductModal Component', () => {
  const product = {
    id: 1,
    name: 'Sample Product Name',
    image: 'https://example.com/sample-image.jpg',
    price: 99.99,
  };

  const onClose = vi.fn();

  it('does not render the modal when product prop is null', () => {
    const { container } = render(
      <ProductModal product={null} onClose={onClose} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders correctly when product is provided', () => {
    render(
      <ProductModal product={product} onClose={onClose} />
    );

    expect(screen.getByText('Sample Product Name')).toBeInTheDocument();
    expect(screen.getByText(/99.99/i)).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    render(
      <ProductModal product={product} onClose={onClose} />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});