import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
// Components
import Page from '../../Page';
import RecipeCard from '../SharedRecipeComponents/RecipeCard/RecipeCard';
import RecipeSearch from '../SharedRecipeComponents/RecipeSearch/RecipeSearch';
// Types
import type { RecipeCategory, Season } from '../../../types/recipe-types';
// Data
import recipes from './food-recipe-data';
// CSS
import './FoodRecipesPage.css';

const FoodRecipes: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const filterCats: RecipeCategory[] = ['Dinner', 'Dessert', 'Desert'];

  // Get initial season from URL params if present
  const seasonParam = searchParams.get('season');
  const initialSeason = seasonParam === 'none' ? null : (seasonParam as Season | null);

  const handleFilterChange = useCallback((newFilteredRecipesList: typeof recipes) => {
    setFilteredRecipes(newFilteredRecipesList);
  }, []);
  
  return (
    <Page>
      <h1>Food Recipes</h1>
      <p>Our favorite recipes to cook together.</p>
      
      <RecipeSearch
        recipes={recipes}
        onFilterChange={handleFilterChange}
        filterCategories={filterCats}
        initialSeason={initialSeason}
      />

      <div className="results-info">
        Showing {filteredRecipes.length} of {recipes.length - 1} recipes
      </div>

      <div className="recipe-grid">
        {filteredRecipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </Page>
  );
};

export default FoodRecipes;
