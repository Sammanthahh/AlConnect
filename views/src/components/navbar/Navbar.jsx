import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css'; // Import the CSS file for styling
import im from '../../assets/logo.png'

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="logo">
        <img src={im} alt="Logo" />
      </Link>
      <div className="nav-links">
        <Link to='#' className="nav-link" activeClassName="active-link">
          About Us
        </Link>
        <a href='#event' className="nav-link" activeClassName="active-link">
          Events
        </a>
        <Link to="/stafflog" className="nav-link" activeClassName="active-link">
          Staff
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
