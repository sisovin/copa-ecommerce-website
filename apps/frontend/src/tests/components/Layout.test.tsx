import React from 'react';
import { render } from '@testing-library/react';
import Layout from '../../components/Layout';

describe('Layout component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Layout>
        <div>Test Child</div>
      </Layout>
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('renders header correctly', () => {
    const { getByText } = render(<Layout />);
    expect(getByText('Copa E-Commerce')).toBeInTheDocument();
  });

  it('renders footer correctly', () => {
    const { getByText } = render(<Layout />);
    expect(getByText(`© ${new Date().getFullYear()} Copa E-Commerce. All rights reserved.`)).toBeInTheDocument();
  });
});
