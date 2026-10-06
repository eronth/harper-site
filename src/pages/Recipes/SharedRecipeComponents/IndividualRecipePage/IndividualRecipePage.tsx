import { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Page from '../../../Page';
import RecipeCard from '../RecipeCard/RecipeCard';
import FoodBlogModeToggle from '../FoodBlogModeToggle/FoodBlogModeToggle';
import { foodBlogModeFromParams, withFoodBlogModeParam } from '../FoodBlogModeToggle/food-blog-mode';
import type { Recipe } from '../recipe-types';
import './IndividualRecipePage.css';

type Props = {
  recipes: Recipe[];
  backPath: string;
  backLabel: string;
  unnumbered?: boolean;
  className?: string;
  allowFoodBlogMode?: boolean; // If true, offers the Food Blog Mode toggle on this page
};

export default function IndividualRecipePage({ recipes, backPath, backLabel, unnumbered, className, allowFoodBlogMode = false }: Props) {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Seeded from the link that got us here, so the page opens in whatever mode
  // the list page was showing; the toggle below takes over from there.
  const [foodBlogMode, setFoodBlogMode] = useState(
    () => allowFoodBlogMode && foodBlogModeFromParams(searchParams)
  );

  // Hand the mode back to the list page so it stays on across a round trip
  const goBack = () => navigate(withFoodBlogModeParam(backPath, foodBlogMode));
  
  // Create a slug from recipe title for URL-friendly ID
  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  
  // Find the recipe by matching the slug
  const recipe = recipes.find(r => createSlug(r.title) === recipeId);
  
  if (!recipe) {
    return (
      <Page>
        <div className="individual-recipe-page">
          <button 
            className="back-button"
            onClick={goBack}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to {backLabel}
          </button>
          <div className="error-message">
            <h1>Recipe Not Found</h1>
            <p>The recipe you're looking for doesn't exist.</p>
          </div>
        </div>
      </Page>
    );
  }
  
  return (
    <Page>
      <div className="individual-recipe-page">
        <div className="individual-recipe-controls">
          <button 
            className="back-button"
            onClick={goBack}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to {backLabel}
          </button>

          {allowFoodBlogMode && (
            <FoodBlogModeToggle checked={foodBlogMode} onChange={setFoodBlogMode} />
          )}
        </div>

        <div className="individual-recipe-container">
          <RecipeCard
            recipe={recipe}
            interactive
            unnumbered={unnumbered}
            className={className}
            useFoodBlogPreamble={foodBlogMode}
          />
        </div>
      </div>
    </Page>
  );
}
