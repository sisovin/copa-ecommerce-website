import React from 'react';
import Layout from '../../components/Layout';

const AdminDashboardPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
        <p className="mb-8">Admin information and controls will be displayed here.</p>
      </div>
    </Layout>
  );
};

export default AdminDashboardPage;
