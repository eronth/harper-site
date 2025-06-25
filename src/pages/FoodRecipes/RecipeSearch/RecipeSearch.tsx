import { useCallback, useEffect, useState } from "react";
import type { RecipeCategory, Season } from "../../../types/recipe-types";
import type { Recipe } from "../food-recipe-data";
import './RecipeSearch.css';

type Props = {
  recipes: Recipe[];
  onFilterChange: (filtered: Recipe[]) => void;
};

export default function RecipeSearch({ recipes, onFilterChange }: Props) {
  type SeasonFilterType = Season | 'None'; // 'None' for recipes without a season
  const minFilterCharacters = 3;
  const [searchTerm, setSearchTerm] = useState('');
  const allSeasons: Season[] = ['Spring', 'Summer', 'Autumn', 'Winter'];
  const [selectedSeasons, setSelectedSeasons] = useState<SeasonFilterType[]>([]);
  const allCategories: RecipeCategory[] = [
    //'Breakfast', 'Lunch', 
    'Dinner', 'Dessert',
    //'Drink'
  ];
  const [selectedCategories, setSelectedCategories] = useState<RecipeCategory[]>([]);

  const shouldFilter = useCallback((): boolean => {
    return searchTerm.length >= minFilterCharacters || selectedSeasons.length > 0 || selectedCategories.length > 0;
  }, [searchTerm, selectedSeasons, selectedCategories]);

  useEffect(() => {
    if (!shouldFilter()) {
      onFilterChange(recipes); // Always reset to full list if no filter is applied
      return;
    }

    const filtered = recipes.filter(recipe => {
      // Text search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        recipe.title.toLowerCase().includes(searchLower) ||
        recipe.description?.toLowerCase().includes(searchLower) ||
        recipe.searchTerms?.some(term => term.toLowerCase().includes(searchLower)) ||
        recipe.ingredientsLists.some(list => 
          list.ingredients.some(ingredient => 
            ingredient.name.toLowerCase().includes(searchLower)
          )
        );

      // Season filter
      const matchesSeasons = (
        selectedSeasons.length === 0
        || selectedSeasons.some(season => recipe.seasons.includes(season as Season))
        || (recipe.seasons.length === 0 && selectedSeasons.includes('None'))
      );

      const matchesCategories = (
        selectedCategories.length === 0
        || selectedCategories.includes(recipe.category)
      );

      return matchesSearch && matchesSeasons && matchesCategories;
    });
    onFilterChange(filtered);
  }, [onFilterChange, recipes, searchTerm, selectedSeasons, selectedCategories, shouldFilter]);

  const handleSeasonToggle = (season: SeasonFilterType) => {
    setSelectedSeasons(prev => 
      prev.includes(season)
        ? prev.filter(s => s !== season)
        : [...prev, season]
    );
  };

  const handleCategoryToggle = (category: RecipeCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="recipe-filters">
      <div className="search-box">
        <input
          className="search-input"
          type="text"
          placeholder="Search recipe by name, ingredients, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="checkbox-filters">
        <span className="filter-label">Filter by season:</span>
        {allSeasons.map(season => (
          <label key={season} className="filter-checkbox">
            <input
              type="checkbox"
              checked={selectedSeasons.includes(season)}
              onChange={() => handleSeasonToggle(season)}
            />
            {season}
          </label>
        ))}
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={selectedSeasons.includes('None')}
            onChange={() => handleSeasonToggle('None')}
          />
          No Seasons (yet)
        </label>
      </div>

      <div className="checkbox-filters">
        <span className="filter-label">Filter by category:</span>
        {allCategories.map(category => (
          <label key={category} className="filter-checkbox">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryToggle(category)}
            />
            {category}
          </label>
        ))}
      </div>
    </div>
  );
}
