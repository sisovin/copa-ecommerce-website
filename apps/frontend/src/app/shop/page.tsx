import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from API
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export default ShopPage;
