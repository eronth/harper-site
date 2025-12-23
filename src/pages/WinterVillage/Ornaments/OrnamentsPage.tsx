import React from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../../Page';
import './OrnamentsPage.css';

const OrnamentsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <div className="ornaments-container">
        <button
          className="back-button"
          onClick={() => navigate('/winter-cheering')}
        >
          ← Back to Winter Village
        </button>

        <header className="ornaments-header">
          <h1>Little Gay Bird</h1>
          <p>A delightful collection of ornaments featuring our favorite feathered friends.</p>
        </header>

        <div className="ornaments-content">
          {/* Image gallery will go here */}
          <div className="image-gallery-placeholder">
            <p>📸 Images and details coming soon!</p>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default OrnamentsPage;
