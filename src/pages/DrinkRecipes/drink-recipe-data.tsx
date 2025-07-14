import type { Season } from "../../types/recipe-types";
import { type Ingredient, type QuantityUnit, type Recipe } from "../FoodRecipes/food-recipe-data";

type DrinkRecipe = {
  title: string;
  subtitle?: string;
  seasons: Season[];
  searchTerms?: string[];
  description?: string;
  ingredients: Ingredient[];
  step0?: string;
  steps: string[];
};

const spring: Season = 'Spring';
const summer: Season = 'Summer';
const autumn: Season = 'Autumn';
// const fall: Season = 'Autumn'; // Alias for Autumn
// const winter: Season = 'Winter';

const add = (
  quantity: number,
  name: string,
  options?: {
    unit?: QuantityUnit,
    adjustments?: string,
  }
): Ingredient => ({
  name,
  quantity,
  adjustments: options?.adjustments,
  unit: options?.unit ?? 'oz', // Default unit for drinks is oz
});

const drink = (r: DrinkRecipe): Recipe => ({
  title: r.title,
  subtitle: r.subtitle,
  category: 'Drink',
  seasons: r.seasons,
  searchTerms: r.searchTerms,
  description: r.description,
  ingredientsLists: [
    {
      ingredients: r.ingredients,
    },
  ],
  stepsLists: [
    {
      step0: r.step0,
      steps: r.steps,
    },
  ],
});

const recipes: Recipe[] = [
  { // A drink
    ...drink({
      title: 'Clover Club',
      seasons: [spring, summer],
      description: 'A refreshing gin cocktail with raspberry and lemon.',
      ingredients: [
        add(2, 'gin'),
        add(.5, 'lemon juice'),
        add(.5, 'raspberry syrup'),
        add(1, 'egg white', { adjustments: 'optional for frothiness' }),
      ],
      steps: [
        'Shake all ingredients (dry shake first if using egg white, then shake with ice)',
        'Strain into a coupe',
        'Optional: Garnish with 3 fresh raspberries on a pick.',
      ],
      searchTerms: ['gin', 'lemon', 'raspberry'],
    })
  },
  {
    ...drink({
      // A shadowfell drink
      title: 'Stillswill',
      seasons: [autumn],
      description: 'A shadowy cocktail from the Shadowfell.',
      ingredients: [
        add(2, 'star zenith or white rum'),
        add(1, 'hopefill ichor or coconut rum'),
        add(1/2, 'raspberry syrup'),
        add(1/2, 'creme de violette'),
        add(0, 'black glitter', { adjustments: 'a ton' }),
        add(0, 'black ice',),
      ],
      steps: [
        'Stir all ingredients with regular ice',
        'Strain into a rocks glass over black ice',
        'Garnish with a twist of lemon peel (optional)',
      ],
      searchTerms: ['rum', 'coconut', 'raspberry', 'violette', 'glitter', 'starfinder', 'starfinder 2e', 'shadowfell'],
    })
  }
].sort((a, b) => a.title.localeCompare(b.title));

export default recipes;
