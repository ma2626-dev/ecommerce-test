import { NavLink,useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';
import './Header.css';
import CartIcon from '../assets/images/icons/cart-icon.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import LogoWhite from '../assets/images/logo-white.png';
import MobileLogoWhite from '../assets/images/mobile-logo-white.png';


export function Header({ cart = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [inputValue, setInputValue] = useState(searchQuery);

  

  let totalQuantity = 0;

  cart.forEach((cartItem) => {                        //cartItem parameter = each item in the cart
    totalQuantity += cartItem.quantity;
  });

  

  // Keep input in sync when URL changes (e.g. back/forward button)
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  // Handle input typing
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };



  // Handle search submit (button click or Enter key)
  const handleSearch = (event) => {
    event.preventDefault(); // prevent form reload if wrapped in form
    const trimmed = inputValue.trim();
    
    if (trimmed) {
      setSearchParams({ search: trimmed }); // updates URL → triggers useEffect in HomePage
    } else {
      setSearchParams({}); // clear search param if empty
    }
  };





  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo"
            src={LogoWhite} />
          <img className="mobile-logo"
            src={MobileLogoWhite} />
        </NavLink>
      </div>

      <div className="middle-section">
        <form onSubmit={handleSearch} className="search-form">
        <input value={inputValue} onChange={handleInputChange} className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src={SearchIcon} />
        </button>
        </form>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  )
}