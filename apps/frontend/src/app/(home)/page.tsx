import React from 'react';
import Layout from '../../components/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Copa E-Commerce</h1>
        <p className="mb-8">Discover our featured products below:</p>
        {/* Featured products will be displayed here */}
      </div>
    </Layout>
  );
};

export default HomePage;
