import React, { useState, useCallback } from 'react';
// Components
import RecipeCard from '../SharedRecipeComponents/RecipeCard/RecipeCard';
import RecipeSearch from '../SharedRecipeComponents/RecipeSearch/RecipeSearch';
// Types
import type { RecipeCategory } from '../../../types/recipe-types';
// Data
import recipes from './food-recipe-data';
// CSS
import './FoodRecipesPage.css';

const FoodRecipes: React.FC = () => {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const filterCats: RecipeCategory[] = ['Dinner', 'Dessert', 'Desert'];

  const handleFilterChange = useCallback((newFilteredRecipesList: typeof recipes) => {
    setFilteredRecipes(newFilteredRecipesList);
  }, []);
  
  return (
    <div className="page-content">
      <h1>Food Recipes</h1>
      <p>Our favorite recipes to cook together.</p>
      
      <RecipeSearch
        recipes={recipes}
        onFilterChange={handleFilterChange}
        filterCategories={filterCats}
      />

      <div className="results-info">
        Showing {filteredRecipes.length} of {recipes.length - 1} recipes
      </div>

      <div className="recipe-grid">
        {filteredRecipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default FoodRecipes;
