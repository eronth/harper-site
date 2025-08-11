import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import RecipeCard from '../RecipeCard/RecipeCard';
import type { Recipe } from '../recipe-types';
import './IndividualRecipePage.css';

type Props = {
  recipes: Recipe[];
  backPath: string;
  backLabel: string;
};

export default function IndividualRecipePage({ recipes, backPath, backLabel }: Props) {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();
  
  // Create a slug from recipe title for URL-friendly ID
  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  
  // Find the recipe by matching the slug
  const recipe = recipes.find(r => createSlug(r.title) === recipeId);
  
  const recipeNotFound = (
    <div className="page-content">
      <div className="individual-recipe-page">
        <button 
          className="back-button"
          onClick={() => navigate(backPath)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to {backLabel}
        </button>
        <div className="error-message">
          <h1>Recipe Not Found</h1>
          <p>The recipe you're looking for doesn't exist.</p>
        </div>
      </div>
    </div>
  );
  
  return (recipe
    ? <div className="page-content">
        <div className="individual-recipe-page">
          <button 
            className="back-button"
            onClick={() => navigate(backPath)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to {backLabel}
          </button>
          
          <div className="individual-recipe-container">
            <RecipeCard recipe={recipe} />
          </div>
        </div>
      </div>
    : recipeNotFound
  );
}
