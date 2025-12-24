import React from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../../Page';
import './OrnamentsPage.css';

// Import all gaybird images
import abigail from '../../../assets/gaybirds/Abigail.jpg';
import cameron from '../../../assets/gaybirds/Cameron.jpg';
import janey from '../../../assets/gaybirds/Janey.jpg';
import joe from '../../../assets/gaybirds/Jo-e.jpg';
import jodie from '../../../assets/gaybirds/Jodie.jpg';
import peter from '../../../assets/gaybirds/Peter.jpg';
import simon from '../../../assets/gaybirds/Simon.jpg';

const gaybirdImages = [
  { src: abigail, alt: 'Abigail' },
  { src: cameron, alt: 'Cameron' },
  { src: janey, alt: 'Janey' },
  { src: joe, alt: 'Jo-e' },
  { src: jodie, alt: 'Jodie' },
  { src: peter, alt: 'Peter' },
  { src: simon, alt: 'Simon' },
];

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
          <h1>The Lil Gay Birdy Troop (LGBT)</h1>
          <p>A delightful collection of ornaments featuring our favorite feathered friends.</p>
        </header>

        <div className="ornaments-content">
          <div className="image-gallery">
            {gaybirdImages.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.src} alt={image.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default OrnamentsPage;
