import React from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../../Page';
import './HolidayVillagePage.css';

const HolidayVillagePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <div className="holiday-village-container">
        <button
          className="back-button"
          onClick={() => navigate('/winter-cheering')}
        >
          ← Back to Winter Village
        </button>

        <header className="holiday-village-header">
          <h1>Lego Holiday Village</h1>
          <p>Our growing collection of LEGO winter village sets, complete with lights and snowy charm.</p>
        </header>

        <div className="holiday-village-content">
          {/* Image gallery will go here */}
          <div className="image-gallery-placeholder">
            <p>📸 Images and details coming soon!</p>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default HolidayVillagePage;
