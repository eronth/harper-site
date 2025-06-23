import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUmbrellaBeach, 
  faBullseye, 
  faMap, 
  faUtensils,
  faSeedling,
  faCake,
  faUser,
  faCocktail,
  faCoffee,
  faMugHot,
  faGlassWater,
  faHouseChimney,
  faTree,
  faSnowflake,
  faGift,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import './MainContent.css';

interface MainContentProps {
  activeSection: string;
}

const MainContent: React.FC<MainContentProps> = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'vacations':
        return (
          <div className="content-section">
            <h2>Vacations and Activities</h2>
            <p>This is where you'll share your adventures and fun activities together!</p>
            <div className="placeholder-content">
              <p><FontAwesomeIcon icon={faUmbrellaBeach} /> Future vacation photos and stories will go here</p>
              <p><FontAwesomeIcon icon={faBullseye} /> Activities and fun experiences to document</p>
              <p><FontAwesomeIcon icon={faMap} /> Travel plans and memories</p>
            </div>
          </div>
        );
      case 'food-recipes':
        return (
          <div className="content-section">
            <h2>Food Recipes</h2>
            <p>Your favorite recipes and culinary experiments!</p>
            <div className="placeholder-content">
              <p><FontAwesomeIcon icon={faUtensils} /> Breakfast favorites</p>
              <p><FontAwesomeIcon icon={faSeedling} /> Healthy meals</p>
              <p><FontAwesomeIcon icon={faCake} /> Special occasion dishes</p>
              <p><FontAwesomeIcon icon={faUser} /> Cooking adventures together</p>
            </div>
          </div>
        );
      case 'drink-recipes':
        return (
          <div className="content-section">
            <h2>Drink Recipes</h2>
            <p>Cocktails, mocktails, and special beverages!</p>
            <div className="placeholder-content">
              <p><FontAwesomeIcon icon={faCocktail} /> Signature cocktails</p>
              <p><FontAwesomeIcon icon={faCoffee} /> Coffee creations</p>
              <p><FontAwesomeIcon icon={faMugHot} /> Tea blends</p>
              <p><FontAwesomeIcon icon={faGlassWater} /> Refreshing summer drinks</p>
            </div>
          </div>
        );
      case 'winter-village':
        return (
          <div className="content-section">
            <h2>Winter Village</h2>
            <p>Your special winter village collection and holiday traditions!</p>
            <div className="placeholder-content">
              <p><FontAwesomeIcon icon={faHouseChimney} /> Village pieces and displays</p>
              <p><FontAwesomeIcon icon={faTree} /> Holiday decorations</p>
              <p><FontAwesomeIcon icon={faSnowflake} /> Winter memories</p>
              <p><FontAwesomeIcon icon={faGift} /> Holiday traditions</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="content-section">
            <h2>Welcome to Our Life Together</h2>
            <p>This is a special place where we share our adventures, recipes, and memories!</p>
            <div className="welcome-content">
              <div className="feature-grid">
                <div className="feature-card">
                  <h3><FontAwesomeIcon icon={faUmbrellaBeach} /> Vacations & Activities</h3>
                  <p>Our adventures and fun experiences together</p>
                </div>
                <div className="feature-card">
                  <h3><FontAwesomeIcon icon={faUtensils} /> Food Recipes</h3>
                  <p>Delicious meals and culinary experiments</p>
                </div>
                <div className="feature-card">
                  <h3><FontAwesomeIcon icon={faCocktail} /> Drink Recipes</h3>
                  <p>Cocktails, coffee, and special beverages</p>
                </div>
                <div className="feature-card">
                  <h3><FontAwesomeIcon icon={faHouseChimney} /> Winter Village</h3>
                  <p>Our holiday traditions and winter displays</p>
                </div>
              </div>
              <p className="instruction">Use the menu button (<FontAwesomeIcon icon={faBars} />) in the top-left to explore each section!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="main-content">
      {renderContent()}
    </main>
  );
};

export default MainContent;
