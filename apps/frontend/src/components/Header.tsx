import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'shadcn/ui';

const Header: React.FC = () => {
  return (
    <Navbar>
      <Nav>
        <NavItem>
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem>
          <Link to="/shop">Shop</Link>
        </NavItem>
        <NavItem>
          <Link to="/cart">Cart</Link>
        </NavItem>
        <NavItem>
          <Link to="/account">Account</Link>
        </NavItem>
        <NavItem>
          <Link to="/about">About</Link>
        </NavItem>
        <NavItem>
          <Link to="/contact">Contact</Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;
