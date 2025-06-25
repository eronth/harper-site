import { useCallback, useEffect, useState } from "react";
import type { Season } from "../../../types/recipe-types";
import type { Recipe } from "../food-recipe-data";
import './RecipeSearch.css';

type Props = {
  recipes: Recipe[];
  onFilterChange: (filtered: Recipe[]) => void;
};

export default function RecipeSearch({ recipes, onFilterChange }: Props) {
  type SeasonFilterType = Season | 'None'; // 'None' for recipes without a season
  const minFilterCharacters = 3;
  const allSeasons: Season[] = ['Spring', 'Summer', 'Autumn', 'Winter'];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeasons, setSelectedSeasons] = useState<SeasonFilterType[]>([]);

  const shouldFilter = useCallback((): boolean => {
    return searchTerm.length >= minFilterCharacters || selectedSeasons.length > 0;
  }, [searchTerm, selectedSeasons]);

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

      return matchesSearch && matchesSeasons;
    });
    onFilterChange(filtered);
  }, [onFilterChange, recipes, searchTerm, selectedSeasons, shouldFilter]);

  const handleSeasonToggle = (season: SeasonFilterType) => {
    setSelectedSeasons(prev => 
      prev.includes(season)
        ? prev.filter(s => s !== season)
        : [...prev, season]
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
      
      <div className="season-filters">
        <span className="filter-label">Filter by season:</span>
        {allSeasons.map(season => (
          <label key={season} className="season-checkbox">
            <input
              type="checkbox"
              checked={selectedSeasons.includes(season)}
              onChange={() => handleSeasonToggle(season)}
            />
            {season}
          </label>
        ))}
        <label className="season-checkbox">
          <input
            type="checkbox"
            checked={selectedSeasons.includes('None')}
            onChange={() => handleSeasonToggle('None')}
          />
          No Seasons (yet)
        </label>
      </div>
    </div>
  );
}
