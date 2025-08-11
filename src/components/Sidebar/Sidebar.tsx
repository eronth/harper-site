import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUmbrellaBeach,
  faUtensils,
  faCocktail,
  faHouseChimney,
  faStar,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { id: 'vacations', label: 'Vacations and Staycations', path: '/vacations', icon: faUmbrellaBeach},
    { id: 'food-recipes', label: 'Food Recipes', path: '/food-recipes', icon: faUtensils},
    { id: 'drink-recipes', label: 'Drink Recipes', path: '/drink-recipes', icon: faCocktail},
    { id: 'projects', label: 'Projects & Crafts', path: '/projects', icon: faStar},
    { id: 'winter-village', label: 'Winter Village', path: '/winter-village', icon: faHouseChimney},
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" onClick={onClose}>
            <h2>Hargus & Pereira</h2>
          </Link>
          <button className="close-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className="nav-item"
                  onClick={onClose}
                >
                  <FontAwesomeIcon icon={item.icon} /> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
