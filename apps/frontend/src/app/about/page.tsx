import React from 'react';
import Layout from '../../components/Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="mb-8">
          Welcome to Copa E-Commerce! We are dedicated to providing the best products and services to our customers. Our mission is to offer high-quality products at competitive prices, along with exceptional customer service.
        </p>
        <p className="mb-8">
          Our team is passionate about e-commerce and committed to making your shopping experience as smooth and enjoyable as possible. Thank you for choosing Copa E-Commerce!
        </p>
      </div>
    </Layout>
  );
};

export default AboutPage;
