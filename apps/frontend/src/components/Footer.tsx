import React from 'react';
import { Footer as ShadcnFooter, FooterLink } from 'shadcn/ui';

const Footer: React.FC = () => {
  return (
    <ShadcnFooter>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Copa E-Commerce</h2>
            <p>&copy; {new Date().getFullYear()} Copa E-Commerce. All rights reserved.</p>
          </div>
          <div>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
          </div>
        </div>
      </div>
    </ShadcnFooter>
  );
};

export default Footer;
