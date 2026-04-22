import React from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../../../Page';
import { towns, getNewestBuildings, getBuildingsByTown } from './village-data';
import { titleNight } from '../../../../assets/lego-village';
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
          {/* Back Button */}
          <button
            className="back-button"
            onClick={() => navigate('/seasonal-cheering/winter')}
          >
            ← Back to Winter Cheer
          </button>

          {/* Newest Additions Section */}
          {newestBuildings.length > 0 && (
            <section className="newest-additions-section">
              <h2>Newest Additions</h2>
              <div className="newest-additions-grid">
                {newestBuildings.map((building) => (
                  <div
                    key={building.id}
                    className="building-card newest"
                    onClick={() => handleBuildingClick(building.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleBuildingClick(building.id);
                      }
                    }}
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
                      <p>{building.images.length} {building.images.length === 1 ? 'photo' : 'photos'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Towns and Buildings */}
          {/* Featured Town (Holiday Village) */}
          {towns.filter(t => t.featured).map((town) => {
            const townBuildings = getBuildingsByTown(town.id);
            
            return (
              <section key={town.id} className="town-section featured">
                <div className="town-header">
                  <h2>{town.name}</h2>
                  <p>{town.description}</p>
                </div>
                <div className="buildings-grid">
                  {townBuildings.map((building) => (
                    <div
                      key={building.id}
                      className="building-card"
                      onClick={() => handleBuildingClick(building.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleBuildingClick(building.id);
                        }
                      }}
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
                        <p className="building-description">{building.description}</p>
                        <p className="photo-count">
                          {building.images.length} {building.images.length === 1 ? 'photo' : 'photos'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Non-Featured Towns (Side by Side) */}
          <div className="side-by-side-towns">
            {towns.filter(t => !t.featured).map((town) => {
              const townBuildings = getBuildingsByTown(town.id);
              
              // Skip empty towns for now
              if (townBuildings.filter(b => b.images.length > 0).length === 0) {
                return (
                  <section key={town.id} className="town-section">
                    <div className="town-header">
                      <h2>{town.name}</h2>
                      <p>{town.description}</p>
                    </div>
                    <div className="coming-soon">
                      <p>🎄 Buildings coming soon!</p>
                    </div>
                  </section>
                );
              }

              return (
                <section key={town.id} className="town-section">
                  <div className="town-header">
                    <h2>{town.name}</h2>
                    <p>{town.description}</p>
                  </div>
                  <div className="buildings-grid">
                    {townBuildings.map((building) => (
                      <div
                        key={building.id}
                        className="building-card"
                        onClick={() => handleBuildingClick(building.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleBuildingClick(building.id);
                          }
                        }}
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
                          <p className="building-description">{building.description}</p>
                          <p className="photo-count">
                            {building.images.length} {building.images.length === 1 ? 'photo' : 'photos'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </Page>
  </>
  );
};

export default HolidayVillagePage;
