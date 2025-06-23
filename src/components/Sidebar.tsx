import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSectionSelect: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onSectionSelect }) => {
  const menuItems = [
    { id: 'vacations', label: 'Vacations and Activities' },
    { id: 'food-recipes', label: 'Food Recipes' },
    { id: 'drink-recipes', label: 'Drink Recipes' },
    { id: 'winter-village', label: 'Winter Village' },
  ];

  const handleItemClick = (sectionId: string) => {
    onSectionSelect(sectionId);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2>Hargus & Pereira</h2>
          <button className="close-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  className="nav-item"
                  onClick={() => handleItemClick(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
