import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="header">
      <button className="hamburger-btn" onClick={onMenuToggle}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <Link to="/" className="header-title-link">
        <h1 className="header-title">Our Life Together</h1>
      </Link>
    </header>
  );
};

export default Header;
