import React, { useEffect } from 'react';
import Layout from '../../../components/Layout';

const LogoutPage: React.FC = () => {
  useEffect(() => {
    // Handle logout logic here
    // For example, clear user session, redirect to login page, etc.
  }, []);

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Logout</h2>
        <p>You have been logged out successfully.</p>
      </div>
    </Layout>
  );
};

export default LogoutPage;
