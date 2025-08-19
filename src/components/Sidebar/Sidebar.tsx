import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import type { Clickable } from '../../pages/Home/clickables-data';
import clickables from '../../pages/Home/clickables-data';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems: Clickable[] = clickables;
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
                  {item.icon} {item.title.sidebar || item.title.full}
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
