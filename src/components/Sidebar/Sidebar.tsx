import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import type { Clickable } from '../../pages/Home/clickables-data';
import clickables from '../../pages/Home/clickables-data';
import type { Season } from '../../types/recipe-types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Function to determine current season based on month
const getCurrentSeason = (): Season => {
  const month = new Date().getMonth(); // 0-11 (Jan = 0, Dec = 11)
  
  if (month >= 11 || month <= 1) return 'Winter'; // Dec, Jan, Feb
  if (month >= 2 && month <= 4) return 'Spring'; // Mar, Apr, May
  if (month >= 5 && month <= 7) return 'Summer'; // Jun, Jul, Aug
  return 'Autumn'; // Sep, Oct, Nov
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems: Clickable[] = clickables;
  const currentSeason = getCurrentSeason();
  
  // Items that should have split buttons
  const splitButtonItems = ['food-recipes', 'drink-recipes'];
  
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
            {menuItems.map((item) => {
              const isSplitButton = splitButtonItems.includes(item.id);
              
              if (isSplitButton) {
                return (
                  <li key={item.id} className="split-button-item">
                    <Link
                      to={`${item.path}?season=none`}
                      className="nav-item nav-item-split nav-item-split-left"
                      onClick={onClose}
                      title="View all"
                    >
                      <span className="nav-item-content">
                        {item.icon} {item.title.sidebar || item.title.full}
                      </span>
                    </Link>
                    <Link
                      to={`${item.path}?season=${currentSeason}`}
                      className="nav-item nav-item-split nav-item-split-right"
                      onClick={onClose}
                      title={`View ${currentSeason}`}
                    >
                      <span className="season-label">{currentSeason}</span>
                    </Link>
                  </li>
                );
              }
              
              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className="nav-item"
                    onClick={onClose}
                  >
                    {item.icon} {item.title.sidebar || item.title.full}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
