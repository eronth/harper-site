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
  unit: options?.unit ?? (quantity ? 'oz' : null), // Default unit for drinks is oz
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
  { // Clover Club
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
  { // Stillswill
    ...drink({
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
  },
  { // Zolezzi Cocktail
    ...drink({
      title: 'Zolezzi Cocktail',
      seasons: [],
      ingredients: [
        add(1, 'blue curacao'),
        add(1, 'vanilla vodka'),
        add(1, 'white rum'),
        add(1, 'midori'),
        add(0, 'pineapple juice'),
      ],
      steps: [
        'Add directly to collins glass with ice',
        'Stir gently to combine',
        'Drink and get drunk'
      ],
    })
  },
  { // Luscious Leslie
    ...drink({
      title: 'Luscious Leslie',
      seasons: [],
      ingredients: [
        add(1, 'amaretto'),
        add(1, 'malibu coconut rum'),
        add(1, 'dark/spiced rum'),
        add(4, 'pineapple juice', { adjustments: '4-8oz' }),
        add(1, 'peach schnapps'),
        add(1, 'grenadine', { unit: 'splash' }),
      ],
      steps: [
        'Add alcohol to shaker with ice',
        'add pineapple juice to shaker',
        'shake classily',
      ],
    })
  },
  { // Rum Martinez
    ...drink({
      title: 'Rum Martinez',
      seasons: [],
      ingredients: [
        add(0, 'applewood smoke stick', { adjustments: 'for smoking glass' }),
        add(1.5, 'dark rum'),
        add(1.5, 'sweet vermouth'),
        add(.5, 'classic liqueur'),
        add(1, 'maraschino liqueur', { unit: 'bar spoon' }),
        add(2, 'bitters', { unit: 'dashes' }),
      ],
      steps: [
        'Light smoke stick and capture smoke in glass (perfume glass works well), set aside',
        'Add all ingredients to shaker with ice',
        'Shake until cold',
        'Strain into smoked bottle',
        'Shake the smoked bottle like twice',
        'Drink and be classy',
      ],
    })
  },
  { // The Manhatten
    ...drink({
      title: 'The Manhatten',
      seasons: [],
      ingredients: [
        add(2, 'rye whiskey'),
        add(1, 'sweet vermouth'),
        add(2, 'bitters', { unit: 'dashes' }),
      ],
      steps: [
        'Add all ingredients to mixing glass with ice',
        'Stir until cold',
        'Strain into rocks glass with ice',
      ],
    })
  },
  { // Great White Cocktail
    ...drink({
      title: 'Great White Cocktail',
      seasons: [],
      ingredients: [
        add(1.5, 'citron'),
        add(1, 'lemonade'),
        add(.5, 'triple sec'),
        add(.25, 'lime'),
      ],
      steps: [
        'Add all ingredients to shaker with ice',
        'Shake until cold',
        'Strain into chilled rocks glass',
      ],
    })
  }
].sort((a, b) => a.title.localeCompare(b.title));

export default recipes;
