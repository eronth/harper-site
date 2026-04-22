import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Page from '../../../Page';
import { getBuildingById } from './village-data';
import './BuildingAlbumPage.css';

const BuildingAlbumPage: React.FC = () => {
  const { buildingId } = useParams<{ buildingId: string }>();
  const navigate = useNavigate();

  const building = buildingId ? getBuildingById(buildingId) : undefined;

  if (!building) {
    return (
      <Page>
        <div className="building-album-container">
          <button
            className="back-button"
            onClick={() => navigate('/seasonal-cheering/winter/holiday-village')}
          >
            ← Back to Holiday Village
          </button>
          <div className="error-message">
            <h1>Building Not Found</h1>
            <p>The building you're looking for doesn't exist.</p>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className="building-album-container">
        <button
          className="back-button"
          onClick={() => navigate('/seasonal-cheering/winter/holiday-village')}
        >
          ← Back to Holiday Village
        </button>

        <header className="building-album-header">
          <h1>{building.name}</h1>
          <p>{building.description}</p>
        </header>

        {building.images.length > 0 ? (
          <div className="building-photo-gallery">
            {building.images.map((image, index) => (
              <div key={index} className="photo-item">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  loading="lazy"
                />
                {image.caption && (
                  <p className="photo-caption">{image.caption}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-photos-message">
            <p>📸 Photos coming soon!</p>
          </div>
        )}
      </div>
    </Page>
  );
};

export default BuildingAlbumPage;
