import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUmbrellaBeach,
  faUtensils,
  faCocktail,
  faHouseChimney
} from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';

export default function Home() {
  return (
    <main className="main-content">
      <div className="content-section">
        <h2>Welcome to Our Life Together</h2>
        <p>This is a special place where we share our adventures, recipes, and memories!</p>
        <div className="welcome-content">
          <div className="feature-grid">
            <a href="/vacations" className="feature-card">
              <h3>
                <FontAwesomeIcon icon={faUmbrellaBeach} />
                Vacations & Staycations
              </h3>
              <p>Our adventures and fun experiences together</p>
            </a>
            <a href="/food-recipes" className="feature-card">
              <h3>
                <FontAwesomeIcon icon={faUtensils} />
                Food Recipes
              </h3>
              <p>Delicious meals and culinary experiments</p>
            </a>
            <a href="/drink-recipes" className="feature-card">
              <h3>
                <FontAwesomeIcon icon={faCocktail} />
                Drink Recipes
              </h3>
              <p>Cocktails, coffee, and special beverages</p>
            </a>
            <a href="/winter-village" className="feature-card">
              <h3>
                <FontAwesomeIcon icon={faHouseChimney} />
                Winter Village
              </h3>
              <p>Our holiday traditions and winter displays</p>
            </a>
          </div>
          <p className="instruction">
            Check out our fun stuff!
          </p>
        </div>
      </div>
    </main>
  );
};

