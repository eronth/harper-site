import React, { useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
// Components
import Page from '../../Page';
import RecipeCard from '../SharedRecipeComponents/RecipeCard/RecipeCard';
import RecipeSearch from '../SharedRecipeComponents/RecipeSearch/RecipeSearch';
import FoodBlogModeToggle from '../SharedRecipeComponents/FoodBlogModeToggle/FoodBlogModeToggle';
import { foodBlogModeFromParams } from '../SharedRecipeComponents/FoodBlogModeToggle/food-blog-mode';
// Types
import { mealCategories, type MealCategory, type Season } from '../../../types/recipe-types';
// Data
import recipes from '../../../data/recipes/food-recipe-data';
// CSS
import './FoodRecipesPage.css';

const FoodRecipes: React.FC = () => {
  const initialRecipes = useMemo(() => [...recipes], []);
  const [searchParams] = useSearchParams();
  const [filteredRecipes, setFilteredRecipes] = useState([...initialRecipes]);
  // When on, every card on the page shows its food blog preamble.
  // Seeded from the URL so coming back from an individual recipe keeps the mode.
  const [foodBlogMode, setFoodBlogMode] = useState(() => foodBlogModeFromParams(searchParams));
  // Only meal categories for this page
  const filterCats: MealCategory[] = useMemo(() => [...mealCategories], []);

  // Get initial season from URL params if present
  const seasonParam = searchParams.get('season');
  const initialSeason = seasonParam === 'none' ? null : (seasonParam as Season | null);

  const handleFilterChange = useCallback((newFilteredRecipesList: typeof initialRecipes) => {
    setFilteredRecipes(newFilteredRecipesList);
  }, []);
  
  return (
    <Page className="recipes-page">
      <h1>Food Recipes</h1>
      
      <RecipeSearch
        recipes={initialRecipes}
        onFilterChange={handleFilterChange}
        filterCategories={filterCats}
        initialSeason={initialSeason}
      />

      <div className="recipe-grid-controls">
        <div className="results-info">
          Showing {filteredRecipes.length} of {initialRecipes.length} recipes
        </div>

        <FoodBlogModeToggle checked={foodBlogMode} onChange={setFoodBlogMode} />
      </div>

      <div className="recipe-grid">
        {filteredRecipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} useFoodBlogPreamble={foodBlogMode} />
        ))}
      </div>
    </Page>
  );
};

export default FoodRecipes;
