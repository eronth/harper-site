import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUmbrellaBeach,
  faUtensils,
  faCocktail,
  faHouseChimney,
  faPaintBrush,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';

export default function Home() {
  const featureItems = [
    { id: 'vacations', title: 'Vacations and Staycations', icon: faUmbrellaBeach,
      text: 'Our adventures and fun experiences together'
    },
    { id: 'food-recipes', title: 'Food Recipes', icon: faUtensils,
      text: 'Delicious meals and culinary experiments'
    },
    { id: 'drink-recipes', title: 'Drink Recipes', icon: faCocktail,
      text: 'Cocktails, coffee, and special beverages'
    },
    { id: 'projects', title: 'Projects & Crafts', icon: faPaintBrush,
      text: 'Our creative endeavors and DIY projects'
    },
    { id: 'passions', title: 'Passions & Hobbies', icon: faStar,
      text: 'Exploring our interests and hobbies together'
    },
    { id: 'winter-village', title: 'Winter Village', icon: faHouseChimney,
      text: 'Our holiday traditions and winter displays'
    },
  ]

  return (
    <main className="main-content">
      <div className="content-section">
        <h2>Welcome to Our Life Together</h2>
        <p>This is a special place where we share our adventures, recipes, and memories!</p>
        <div className="welcome-content">
          <div className="feature-grid">
            {featureItems.map((item) => (
              <a key={item.id} href={`/${item.id}`} className="feature-card">
                <h3>
                  <FontAwesomeIcon icon={item.icon} />
                  {item.title}
                </h3>
                <p>{item.text}</p>
              </a>
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

