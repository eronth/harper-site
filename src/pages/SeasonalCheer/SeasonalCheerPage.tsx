import React from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../Page';
import './SeasonalCheerPage.css';

type ClickableSeason = {
  id: string;
  title: string;
  description: string;
  route: string;
  emoji: string;
};

const routeBase = '/seasonal-cheering';

const seasons: ClickableSeason[] = [
  {
    id: 'spring',
    title: 'Spring Cheer',
    description: 'Celebrating the blooms and renewal of springtime.',
    route: `${routeBase}/spring`,
    emoji: '🌸',
  },
  {
    id: 'summer',
    title: 'Summer Cheer',
    description: 'Sunny days, warm nights, and summertime fun.',
    route: `${routeBase}/summer`,
    emoji: '☀️',
  },
  {
    id: 'autumn',
    title: 'Autumn Cheer',
    description: 'Cozy fall traditions and the colors of autumn.',
    route: `${routeBase}/autumn`,
    emoji: '🍂',
  },
  {
    id: 'winter',
    title: 'Winter Cheer',
    description: 'Various projects that bring us wintertide cheer.',
    route: `${routeBase}/winter`,
    emoji: '❄️',
  },
];

const SeasonalCheerPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <div className="seasonal-cheer-container">
        <header className="seasonal-cheer-header">
          <h1>Seasonal Cheer</h1>
          <p>Celebrating the best of every season.</p>
        </header>

        <div className="seasons-grid">
          {seasons.map((season) => (
            <div
              key={season.id}
              className={`season-card season-card--${season.id}`}
              onClick={() => navigate(season.route)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(season.route);
                }
              }}
            >
              <div className="season-card-emoji">
                <span>{season.emoji}</span>
              </div>
              <div className="season-card-content">
                <h2>{season.title}</h2>
                <p>{season.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default SeasonalCheerPage;
