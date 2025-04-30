import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProductCard from '../../components/ProductCard';

describe('ProductCard component', () => {
  const product = {
    id: 1,
    name: 'Test Product',
    description: 'This is a test product',
    price: 100,
    imageUrl: 'https://via.placeholder.com/150',
  };

  it('renders product information correctly', () => {
    const { getByText, getByAltText } = render(<ProductCard {...product} />);
    expect(getByText('Test Product')).toBeInTheDocument();
    expect(getByText('This is a test product')).toBeInTheDocument();
    expect(getByText('$100')).toBeInTheDocument();
    expect(getByAltText('Test Product')).toBeInTheDocument();
  });

  it('calls add to cart function when button is clicked', () => {
    const addToCart = jest.fn();
    const { getByText } = render(<ProductCard {...product} addToCart={addToCart} />);
    fireEvent.click(getByText('Add to Cart'));
    expect(addToCart).toHaveBeenCalledTimes(1);
  });
});
