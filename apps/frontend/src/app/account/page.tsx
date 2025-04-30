import React from 'react';
import Layout from '../../components/Layout';

const AccountPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Account</h1>
        <p>Welcome to your account page. Here you can view and update your personal information.</p>
      </div>
    </Layout>
  );
};

export default AccountPage;
