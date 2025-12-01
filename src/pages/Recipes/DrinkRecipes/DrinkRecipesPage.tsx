import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
// Components
import Page from '../../Page';
import RecipeCard from '../SharedRecipeComponents/RecipeCard/RecipeCard';
import RecipeSearch from '../SharedRecipeComponents/RecipeSearch/RecipeSearch';
// Types
import type { RecipeCategory, Season } from '../../../types/recipe-types';
// Data
import recipes from './drink-recipe-data';
import hotChocolateRecipes from './hot-chocolate-recipe-data';

const DrinkRecipes: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredRecipes, setFilteredRecipes] = useState([...recipes, ...hotChocolateRecipes]);
  const filterCats: RecipeCategory[] = ['Cocktail', 'Smoothie', 'Coffee', 'Tea', 'Other'];
  
  // Get initial season from URL params if present
  const seasonParam = searchParams.get('season');
  const initialSeason = seasonParam === 'none' ? null : (seasonParam as Season | null);
  
  const handleFilterChange = useCallback((newFilteredRecipesList: typeof recipes) => {
    setFilteredRecipes(newFilteredRecipesList);
  }, []);
  
  return (
    <Page>
      <h1>Drink Recipes</h1>
      <p>Our favorite cocktails and beverages.</p>
      
      <RecipeSearch
        recipes={[...recipes, ...hotChocolateRecipes]}
        onFilterChange={handleFilterChange}
        filterCategories={filterCats}
        initialSeason={initialSeason}
      />

      <div className="results-info">
        Showing {filteredRecipes.length} of {recipes.length} recipes
      </div>

      <div className="recipe-grid">
        {filteredRecipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} unnumbered />
        ))}
      </div>
    </Page>
  );
};

export default DrinkRecipes;
