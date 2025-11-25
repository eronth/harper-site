import { Link } from 'react-router-dom';
import Page from '../Page';
import type { Clickable } from './clickables-data';
import clickables from './clickables-data';
import type { Season } from '../../types/recipe-types';
import './HomePage.css';

// Function to determine current season based on month
const getCurrentSeason = (): Season => {
  const month = new Date().getMonth(); // 0-11 (Jan = 0, Dec = 11)
  
  if (month >= 11 || month <= 1) return 'Winter'; // Dec, Jan, Feb
  if (month >= 2 && month <= 4) return 'Spring'; // Mar, Apr, May
  if (month >= 5 && month <= 7) return 'Summer'; // Jun, Jul, Aug
  return 'Autumn'; // Sep, Oct, Nov
};

export default function Home() {
  const featureItems: Clickable[] = clickables;
  const currentSeason = getCurrentSeason();
  const splitCardItems = ['food-recipes', 'drink-recipes'];

  return (
    <Page>
      <div className="content-section">
        <h2>Welcome to the&nbsp;Harper&nbsp;Space</h2>
        <p>This is a special place where we share our adventures, recipes, and memories!</p>
        <div className="welcome-content">
          <div className="feature-grid">
            {featureItems.map((item) => {
              const isSplitCard = splitCardItems.includes(item.id);
              
              if (isSplitCard) {
                return (
                  <div key={item.id} className="feature-card split-card">
                    <Link to={`${item.path}?season=none`} className="split-card-left">
                      <h3>
                        {item.icon}
                        {item.title.full}
                      </h3>
                      <p>{item.text}</p>
                    </Link>
                    <Link to={`${item.path}?season=${currentSeason}`} className="split-card-right">
                      <span className="season-indicator">{currentSeason}</span>
                    </Link>
                  </div>
                );
              }
              
              return (
                <Link key={item.id} to={item.path} className="feature-card">
                  <h3>
                    {item.icon}
                    {item.title.full}
                  </h3>
                  <p>{item.text}</p>
                </Link>
              );
            })}
          </div>
          <p className="instruction">
            Check out our fun stuff!
          </p>
        </div>
      </div>
    </Page>
  );
};
