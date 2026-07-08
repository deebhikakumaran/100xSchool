import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Header.css'; 
import useCartTotalSelector from '../store/cartTotalSelector';

const Header = () => {
  const { totalQuantity } = useCartTotalSelector();

  return (
    <header className="neo-header">
      <div className="logo">
        <h2>amazon.in</h2>
      </div>
      
      <div className="nav-actions">
        <p className="user-text">Hello, User</p>
        <Link to="/cart" className="cart-link">
          <ShoppingCart size={24} />
          {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;