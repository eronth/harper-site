import React from 'react';
import Page from '../../Page';
import { Link } from 'react-router-dom';

const SummerCheerPage: React.FC = () => {
  return (
    <Page>
      <Link
        to="/seasonal-cheering"
        className="back-button"
      >
        ← Back to Seasonal Cheer
      </Link>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem', textAlign: 'center' }}>
        <h1>☀️ Summer Cheer</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', marginTop: '1rem' }}>
          Summer content coming soon!
        </p>
      </div>
    </Page>
  );
};

export default SummerCheerPage;
