import React, { useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
// Components
import Page from '../../Page';
import RecipeCard from '../SharedRecipeComponents/RecipeCard/RecipeCard';
import RecipeSearch from '../SharedRecipeComponents/RecipeSearch/RecipeSearch';
// Types
import { drinkCategories, type DrinkCategory, type Season } from '../../../types/recipe-types';
// Data
import recipes from './drink-recipe-data';
import hotChocolateRecipes from './hot-chocolate-recipe-data';

const DrinkRecipes: React.FC = () => {
  const initialRecipes = useMemo(() => [...recipes, ...hotChocolateRecipes], []);
  const [searchParams] = useSearchParams();
  const [filteredRecipes, setFilteredRecipes] = useState([...initialRecipes]);
  const filterCats: DrinkCategory[] = useMemo(() => [...drinkCategories], []);
  
  // Get initial season from URL params if present
  const seasonParam = searchParams.get('season');
  const initialSeason = seasonParam === 'none' ? null : (seasonParam as Season | null);
  
  const handleFilterChange = useCallback((newFilteredRecipesList: typeof initialRecipes) => {
    setFilteredRecipes(newFilteredRecipesList);
  }, []);
  
  return (
    <Page>
      <h1>Drink Recipes</h1>
      <p>Our favorite cocktails and beverages.</p>
      
      <RecipeSearch
        recipes={initialRecipes}
        onFilterChange={handleFilterChange}
        filterCategories={filterCats}
        initialSeason={initialSeason}
      />

      <div className="results-info">
        Showing {filteredRecipes.length} of {initialRecipes.length} recipes
      </div>

      <div className="recipe-grid">
        {filteredRecipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            className="drink" 
            recipe={recipe}
            unnumbered
          />
        ))}
      </div>
    </Page>
  );
};

export default DrinkRecipes;
