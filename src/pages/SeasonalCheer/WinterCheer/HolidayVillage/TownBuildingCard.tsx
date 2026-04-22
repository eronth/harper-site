import React from 'react';
import type { Building } from './village-data';

interface TownBuildingCardProps {
  building: Building;
  onBuildingClick: (buildingId: string) => void;
  variant?: 'default' | 'newest';
}

const TownBuildingCard: React.FC<TownBuildingCardProps> = ({ 
  building, 
  onBuildingClick, 
  variant = 'default' 
}) => {
  const handleClick = () => onBuildingClick(building.id);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onBuildingClick(building.id);
    }
  };

  const cardClassName = variant === 'newest' ? 'building-card newest' : 'building-card';

  return (
    <div
      className={cardClassName}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {building.thumbnail ? (
        <div
          className="building-card-image"
          style={{ backgroundImage: `url(${building.thumbnail})` }}
        />
      ) : (
        <div className="building-card-image placeholder">
          <span className="placeholder-text">📸</span>
        </div>
      )}
      <div className="building-card-content">
        <h3>{building.name}</h3>
        {variant === 'default' && (
          <p className="building-description">{building.description}</p>
        )}
        <p className={variant === 'default' ? 'photo-count' : ''}>
          {building.images.length} {building.images.length === 1 ? 'photo' : 'photos'}
        </p>
      </div>
    </div>
  );
};

export default TownBuildingCard;
