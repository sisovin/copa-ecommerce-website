import React from 'react';
import CartItem from './CartItem';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from 'shadcn/ui';

interface CartListProps {
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
}

const CartList: React.FC<CartListProps> = ({ items }) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Shopping Cart</CardTitle>
        <CardDescription>Review your items before checkout</CardDescription>
      </CardHeader>
      <CardContent>
        {items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </CardContent>
    </Card>
  );
};

export default CartList;
