import React, { useState } from 'react';
// Components
import RecipeSearch from '../FoodRecipes/RecipeSearch/RecipeSearch';
// Data
import recipes from './drink-recipe-data';
import RecipeCard from '../FoodRecipes/RecipeCard/RecipeCard';

const DrinkRecipes: React.FC = () => {

  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  
  const handleFilterChange = (newFilteredRecipesList: typeof recipes) => {
    setFilteredRecipes(newFilteredRecipesList);
  };
  
  return (
    <div className="page-content">
      <h1>Drink Recipes</h1>
      <p>Our favorite cocktails and beverages.</p>
      
      <RecipeSearch
        recipes={recipes}
        onFilterChange={handleFilterChange}
      />

      <div className="results-info">
        Showing {filteredRecipes.length} of {recipes.length} recipes
      </div>

      <div className="recipe-grid">
        {filteredRecipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} unnumbered />
        ))}
      </div>
    </div>
  );
};

export default DrinkRecipes;
