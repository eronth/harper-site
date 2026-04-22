import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Page from '../../../Page';
import { towns, getNewestBuildings, getBuildingsByTown } from './village-data';
import { titleNight } from '../../../../assets/lego-village';
import TownBuildingCard from './TownBuildingCard';
import TownSection from './TownSection';
import './HolidayVillagePage.css';

const HolidayVillagePage: React.FC = () => {
  const navigate = useNavigate();
  const newestBuildings = getNewestBuildings();

  const handleBuildingClick = (buildingId: string) => {
    navigate(`/seasonal-cheering/winter/holiday-village/${buildingId}`);
  };

  return (
    <>
      {/* Hero Banner - outside Page wrapper for full-width */}
      <div 
        className="hero-banner"
        style={{ backgroundImage: `url(${titleNight})` }}
      >
        <div className="hero-overlay">
          <h1>Lego Holiday Village</h1>
          <p>Our growing collection of LEGO winter village sets, complete with lights and snowy charm.</p>
        </div>
      </div>

      <Page>
        <div className="holiday-village-page">
          <div className="holiday-village-container">
          {/* Back Link */}
          <Link
            to="/seasonal-cheering/winter"
            className="back-button"
          >
            ← Back to Winter Cheer
          </Link>

          {/* Newest Additions Section */}
          {newestBuildings.length > 0 && (
            <section className="newest-additions-section">
              <h2>Newest Additions</h2>
              <div className="newest-additions-grid">
                {newestBuildings.map((building) => (
                  <TownBuildingCard
                    key={building.id}
                    building={building}
                    onBuildingClick={handleBuildingClick}
                    variant="newest"
                  />
                ))}
              </div>
            </section>
          )}

          {/* Towns and Buildings */}
          {/* Featured Town (Holiday Village) */}
          {towns.filter(t => t.featured).map((town) => (
            <TownSection
              key={town.id}
              town={town}
              buildings={getBuildingsByTown(town.id)}
              onBuildingClick={handleBuildingClick}
            />
          ))}

          {/* Non-Featured Towns (Side by Side) */}
          <div className="side-by-side-towns">
            {towns.filter(t => !t.featured).map((town) => (
              <TownSection
                key={town.id}
                town={town}
                buildings={getBuildingsByTown(town.id)}
                onBuildingClick={handleBuildingClick}
              />
            ))}
          </div>
        </div>
      </div>
    </Page>
  </>
  );
};

export default HolidayVillagePage;
