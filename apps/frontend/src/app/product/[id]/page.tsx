import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';

const ProductDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // Placeholder for fetching product details using the id
  const product = {
    id,
    name: 'Sample Product',
    description: 'This is a sample product description.',
    price: 99.99,
  };

  return (
    <Layout>
      <div className="product-details">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-lg">{product.description}</p>
        <p className="text-xl font-semibold">${product.price}</p>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
