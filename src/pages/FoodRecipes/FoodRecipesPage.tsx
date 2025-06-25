import React from 'react';

import recipes from './food-recipe-data';
import RecipeCard from './RecipeCard/RecipeCard';

import './FoodRecipesPage.css';

const FoodRecipes: React.FC = () => {
  return (
    <div className="page-content">
      <h1>Food Recipes</h1>
      <p>Our favorite recipes to cook together.</p>
      <div className="recipe-grid">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default FoodRecipes;
