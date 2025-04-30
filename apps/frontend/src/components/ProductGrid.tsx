import React from 'react';
import { Grid, GridItem } from 'shadcn/ui';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  }[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
      {products.map(product => (
        <GridItem key={product.id}>
          <ProductCard {...product} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default ProductGrid;
