import { Link } from 'react-router-dom';
import './HomePage.css';
import type { Clickable } from './clickables-data';
import clickables from './clickables-data';

export default function Home() {
  const featureItems: Clickable[] = clickables;

  return (
    <main className="page-content">
      <div className="content-section">
        <h2>Welcome to the&nbsp;Harper&nbsp;Space</h2>
        <p>This is a special place where we share our adventures, recipes, and memories!</p>
        <div className="welcome-content">
          <div className="feature-grid">
            {featureItems.map((item) => (
              <Link key={item.id} to={`/${item.id}`} className="feature-card">
                <h3>
                  {item.icon}
                  {item.title.full}
                </h3>
                <p>{item.text}</p>
              </Link>
            ))}
          </div>
          <p className="instruction">
            Check out our fun stuff!
          </p>
        </div>
      </div>
    </main>
  );
};

