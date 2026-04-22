import React from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../../Page';
import './WinterCheerPage.css';

import titleBird from '../../../assets/gaybirds/title.webp';
import { titleDay } from '../../../assets/lego-village';

interface CheerSection {
  id: string;
  title: string;
  description: string;
  route: string;
  imageUrl?: string;
};


const cheerSections: CheerSection[] = [
  {
    id: 'holiday-village',
    title: 'Lego Holiday Village',
    description: 'Our growing collection of LEGO winter village sets, complete with lights and snowy charm.',
    route: '/holiday-village',
    imageUrl: titleDay,
  },
  {
    id: 'ornaments',
    title: 'Little Gay Birds',
    description: 'A delightful collection of ornaments featuring our favorite feathered friends.',
    route: '/ornaments',
    imageUrl: titleBird,
  },
  {
    id: 'pipe-tree-forest',
    title: 'Wondrous Pipe Tree Forest',
    description: 'A whimsical forest of handcrafted pipe cleaner trees bringing festive joy.',
    route: '/pipe-tree-forest',
    imageUrl: undefined,
  },
];

const WinterCheer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <div className="winter-cheer-container">
        <header className="winter-cheer-header">
          <h1>Winter Cheer</h1>
          <p>Various projects that bring us wintertide cheer.</p>
        </header>

        <div className="cheer-sections-grid">
          {cheerSections.map((section) => (
            <div
              key={section.id}
              className="cheer-section-card"
              onClick={() => navigate(`/seasonal-cheering/winter${section.route}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(`/seasonal-cheering/winter${section.route}`);
                }
              }}
            >
              {section.imageUrl ? (
                <div
                  className="cheer-section-image"
                  style={{ backgroundImage: `url(${section.imageUrl})` }}
                />
              ) : (
                <div className="cheer-section-image placeholder">
                  <span className="placeholder-text">📸</span>
                </div>
              )}
              <div className="cheer-section-content">
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default WinterCheer;
