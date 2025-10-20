import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUmbrellaBeach,
  faUtensils,
  faCocktail,
  faHouseChimney,
  faPaintBrush,
  faStar
} from "@fortawesome/free-solid-svg-icons";

export type Clickable = {
  id: string;
  icon: React.ReactNode;
  title: {
    full: string;
    sidebar?: string;
  };
  text: string;
  path: string;
};

const clickables: Clickable[] = [
  { id: 'food-recipes',
    icon: <FontAwesomeIcon icon={faUtensils} />,
    title: {
      full: 'Food Recipes',
    },
    text: 'Delicious meals and culinary experiments',
    path: '/food-recipes'
  },
  { id: 'drink-recipes',
    icon: <FontAwesomeIcon icon={faCocktail} />,
    title: {
      full: 'Drink Recipes',
    },
    text: 'Cocktails, coffee, and special beverages',
    path: '/drink-recipes'
  },
  { 
    id: 'vacations',
    icon: <FontAwesomeIcon icon={faUmbrellaBeach} />,
    title: {
      full: 'Vacations and Staycations',
      sidebar: 'Vacations',
    },
    text: 'Our adventures and fun experiences together',
    path: '/vacations'
  },
  { id: 'projects',
    icon: <FontAwesomeIcon icon={faPaintBrush} />,
    title: {
      full: 'Projects & Crafts',
    },
    text: 'Our creative endeavors and DIY projects',
    path: '/projects'
  },
  { id: 'passions',
    icon: <FontAwesomeIcon icon={faStar} />,
    title: {
      full: 'Passions & Hobbies',
    },
    text: 'Exploring our interests and hobbies together',
    path: '/passions'
  },
  { id: 'winter-village',
    icon: <FontAwesomeIcon icon={faHouseChimney} />,
    title: {
      full: 'Winter Village',
    },
    text: 'Our holiday traditions and winter displays',
    path: '/winter-village'
  },
  { 
    id: 'magic-the-gathering',
    icon: <i className={`ms ms-rarity`} />,
    title: {
      full: 'Magic: The Gathering',
    },
    text: 'Our collection of MtG decks, with basic overviews.',
    path: '/magic-the-gathering',
  },
];

export default clickables;
