import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, Button } from 'shadcn/ui';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, description, price, imageUrl }) => {
  return (
    <Card>
      <CardHeader>
        <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-700">{description}</p>
        <p className="text-lg font-semibold">${price}</p>
      </CardContent>
      <CardFooter>
        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
