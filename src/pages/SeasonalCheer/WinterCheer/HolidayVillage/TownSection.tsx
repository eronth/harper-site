import React from 'react';
import type { Town, Building } from './village-data';
import TownBuildingCard from './TownBuildingCard';

interface TownSectionProps {
  town: Town;
  buildings: Building[];
  onBuildingClick: (buildingId: string) => void;
}

const TownSection: React.FC<TownSectionProps> = ({ town, buildings, onBuildingClick }) => {
  const hasBuildings = buildings.filter(b => b.images.length > 0).length > 0;
  const sectionClassName = `town-section ${town.featured ? 'featured' : ''}`;

  return (
    <section className={sectionClassName}>
      <div className="town-header">
        <h2>{town.name}</h2>
        <p>{town.description}</p>
      </div>
      
      {hasBuildings ? (
        <div className="buildings-grid">
          {buildings.map((building) => (
            <TownBuildingCard
              key={building.id}
              building={building}
              onBuildingClick={onBuildingClick}
            />
          ))}
        </div>
      ) : (
        <div className="coming-soon">
          <p>🎄 Buildings coming soon!</p>
        </div>
      )}
    </section>
  );
};

export default TownSection;
