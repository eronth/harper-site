import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faEgg,
  faBurger,
  faDrumstickBite,
  faIceCream,
  faCookieBite,
  faMartiniGlassCitrus,
  faBlender,
  faMugSaucer,
  faMugHot,
  faBellConcierge,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { seasonCategories, type RecipeCategory, type Season } from "../../../../types/recipe-types";
import type { Recipe } from "../recipe-types";
import './RecipeSearch.css';

// Season icons (enabled = colored/selected, disabled = greyed/unselected)
import springEnabledIcon from '../../../../assets/season-icons/enabled/spring.png';
import summerEnabledIcon from '../../../../assets/season-icons/enabled/summer.png';
import autumnEnabledIcon from '../../../../assets/season-icons/enabled/autumn.png';
import winterEnabledIcon from '../../../../assets/season-icons/enabled/winter.png';
import springDisabledIcon from '../../../../assets/season-icons/disabled/spring.png';
import summerDisabledIcon from '../../../../assets/season-icons/disabled/summer.png';
import autumnDisabledIcon from '../../../../assets/season-icons/disabled/autumn.png';
import winterDisabledIcon from '../../../../assets/season-icons/disabled/winter.png';
import unknownEnabledIcon from '../../../../assets/season-icons/enabled/unknown.png';
import unknownDisabledIcon from '../../../../assets/season-icons/disabled/unknown.png';

type Props = {
  recipes: Recipe[];
  onFilterChange: (filtered: Recipe[]) => void;
  filterCategories: RecipeCategory[];
  initialSeason?: Season | null; // Optional prop to set initial season filter
};

type SeasonFilterType = Season | 'None'; // 'None' for recipes without a season

// Enabled/disabled artwork for each toggleable season
const seasonIcons: Record<SeasonFilterType, { enabled: string; disabled: string; label: string }> = {
  Spring: { enabled: springEnabledIcon, disabled: springDisabledIcon, label: 'Spring' },
  Summer: { enabled: summerEnabledIcon, disabled: summerDisabledIcon, label: 'Summer' },
  Autumn: { enabled: autumnEnabledIcon, disabled: autumnDisabledIcon, label: 'Autumn' },
  Winter: { enabled: winterEnabledIcon, disabled: winterDisabledIcon, label: 'Winter' },
  None: { enabled: unknownEnabledIcon, disabled: unknownDisabledIcon, label: 'No Season' },
};

// Font Awesome icon + selected-state accent colour per recipe category.
// Unselected tiles render grey; selecting one lights the icon up in its own colour,
// mirroring how the season artwork goes from greyscale to colour.
type CategoryIcon = { icon: IconDefinition; color: string };

const defaultCategoryIcon: CategoryIcon = { icon: faUtensils, color: '#cfd6e0' };

const categoryIcons: Partial<Record<RecipeCategory, CategoryIcon>> = {
  Breakfast: { icon: faEgg, color: '#f5c542' },            // yolk gold
  Lunch: { icon: faBurger, color: '#ec8c3f' },             // burger orange
  Dinner: { icon: faDrumstickBite, color: '#e07a5f' },     // roasted terracotta
  Dessert: { icon: faIceCream, color: '#f48fb1' },         // ice cream pink
  Desert: { icon: faCookieBite, color: '#cf9a5e' },        // cookie tan
  Cocktail: { icon: faMartiniGlassCitrus, color: '#5fd4e8' }, // citrus aqua
  Smoothie: { icon: faBlender, color: '#b884e6' },         // berry purple
  Coffee: { icon: faMugSaucer, color: '#c08f63' },         // coffee brown
  Tea: { icon: faMugHot, color: '#8bc98e' },               // green tea
  'Hot Chocolate': { icon: faMugHot, color: '#b5836b' },   // cocoa
  Other: { icon: faBellConcierge, color: '#d9c37a' },      // brass bell
};

export default function RecipeSearch({ recipes, onFilterChange, filterCategories, initialSeason }: Props) {
  const minFilterCharacters = 3;
  const [searchTerm, setSearchTerm] = useState('');
  const allSeasons: Season[] = [...seasonCategories];

  // Function to determine current season based on month
  const currentSeason = useMemo((): Season | null => {
    const month = new Date().getMonth(); // 0-11 (Jan = 0, Dec = 11)

    if (month >= 11 || month <= 1) return 'Winter'; // Dec, Jan, Feb
    if (month >= 2 && month <= 4) return 'Spring'; // Mar, Apr, May
    if (month >= 5 && month <= 7) return 'Summer'; // Jun, Jul, Aug
    if (month >= 8 && month <= 10) return 'Autumn'; // Sep, Oct, Nov
    return null; // Fallback, should not happen
  }, []);

  // Use initialSeason if provided, otherwise use current season, or empty array if null is explicitly passed
  const getInitialSeasons = (): SeasonFilterType[] => {
    if (initialSeason !== undefined) { return initialSeason ? [initialSeason] : []; }
    return currentSeason ? [currentSeason] : [];
  };

  const [selectedSeasons, setSelectedSeasons] = useState<SeasonFilterType[]>(getInitialSeasons());

  // Update selected seasons when initialSeason prop changes
  useEffect(() => {
    if (initialSeason !== undefined) {
      setSelectedSeasons(initialSeason ? [initialSeason] : []);
    } else {
      setSelectedSeasons(currentSeason ? [currentSeason] : []);
    }
  }, [initialSeason, currentSeason]);

  const [selectedCategories, setSelectedCategories] = useState<RecipeCategory[]>([]);

  const shouldFilter = useCallback((): boolean => {
    return searchTerm.length >= minFilterCharacters || selectedSeasons.length > 0 || selectedCategories.length > 0;
  }, [searchTerm, selectedSeasons, selectedCategories]);

  useEffect(() => {
    if (!shouldFilter()) {
      // Even when no filter is applied, hide Desert items unless explicitly selected
      const filteredRecipes = recipes.filter(recipe => recipe.category !== 'Desert');
      onFilterChange(filteredRecipes);
      return;
    }

    const filtered = recipes.filter(recipe => {
      // Special handling for Desert category - only show when explicitly selected
      const isDesertCategory = recipe.category === 'Desert';
      const isDesertSelected = selectedCategories.includes('Desert');

      if (isDesertCategory && !isDesertSelected) {
        return false; // Hide Desert items unless Desert is selected
      }

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

      // Category filter (excluding Desert which is handled above)
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

  const renderSeasonToggle = (season: SeasonFilterType) => {
    const { enabled, disabled, label } = seasonIcons[season];
    const active = selectedSeasons.includes(season);
    return (
      <button
        key={season}
        type="button"
        className={`icon-toggle ${active ? 'active' : ''}`}
        aria-pressed={active}
        title={label}
        aria-label={`Filter by ${label}`}
        onClick={() => handleSeasonToggle(season)}
      >
        <img className="icon-toggle-img" src={active ? enabled : disabled} alt="" />
        <span className="icon-toggle-caption">{label}</span>
      </button>
    );
  };

  const renderCategoryToggle = useCallback((category: RecipeCategory) => {
    const seasonFiltered = recipes.filter(recipe => {
      const matchesSeasons = (
        selectedSeasons.length === 0
        || selectedSeasons.some(season => recipe.seasons.includes(season as Season))
        || (recipe.seasons.length === 0 && selectedSeasons.includes('None'))
      );
      return matchesSeasons && recipe.category === category;
    });

    const disabled = seasonFiltered.length === 0;
    const active = !disabled && selectedCategories.includes(category);
    const { icon, color } = categoryIcons[category] ?? defaultCategoryIcon;

    return (
      <button
        key={category}
        type="button"
        className={`icon-toggle ${active ? 'active' : ''}`}
        style={{ '--icon-active-color': color } as CSSProperties}
        aria-pressed={active}
        disabled={disabled}
        title={disabled ? `${category} (none this season)` : category}
        aria-label={`Filter by ${category}`}
        onClick={() => handleCategoryToggle(category)}
      >
        <FontAwesomeIcon className="icon-toggle-fa" icon={icon} />
        <span className="icon-toggle-caption">{category}</span>
      </button>
    );
  }, [recipes, selectedSeasons, selectedCategories]);

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

      <div className="icon-filters">
        <span className="filter-label">Season</span>
        <div className="icon-toggle-group">
          {allSeasons.map(season => renderSeasonToggle(season))}
          {recipes.some(recipe => recipe.seasons.length === 0) && renderSeasonToggle('None')}
        </div>
      </div>

      <div className="icon-filters">
        <span className="filter-label">Category</span>
        <div className="icon-toggle-group">
          {filterCategories.map(category => renderCategoryToggle(category))}
        </div>
      </div>
    </div>
  );
}
