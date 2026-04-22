import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../../../Page';
import './PipeTreeForestPage.css';

const PipeTreeForestPage: React.FC = () => {

  return (
    <Page>
      <div className="pipe-tree-forest-container">
        <Link
          to="/seasonal-cheering/winter"
          className="back-button"
        >
          ← Back to Winter Cheer
        </Link>

        <header className="pipe-tree-forest-header">
          <h1>Wondrous Pipe Tree Forest</h1>
          <p>A whimsical forest of handcrafted pipe cleaner trees bringing festive joy.</p>
        </header>

        <div className="pipe-tree-forest-content">
          {/* Image gallery will go here */}
          <div className="image-gallery-placeholder">
            <p>📸 Images and details coming soon!</p>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default PipeTreeForestPage;
