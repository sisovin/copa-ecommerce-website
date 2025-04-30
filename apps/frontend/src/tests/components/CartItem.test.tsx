import React from 'react';
import { render } from '@testing-library/react';
import CartItem from '../../components/CartItem';

describe('CartItem component', () => {
  const item = {
    id: 1,
    name: 'Test Item',
    price: 10.5,
    quantity: 2,
  };

  it('renders item information correctly', () => {
    const { getByText } = render(<CartItem item={item} />);
    expect(getByText('Test Item')).toBeInTheDocument();
    expect(getByText('$10.50')).toBeInTheDocument();
    expect(getByText('Quantity: 2')).toBeInTheDocument();
  });
});
