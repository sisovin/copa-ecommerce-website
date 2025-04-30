import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from 'shadcn/ui';

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>${item.price.toFixed(2)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Quantity: {item.quantity}</p>
      </CardContent>
    </Card>
  );
};

export default CartItem;
