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
const fall: Season = 'Autumn'; // Alias for Autumn
const winter: Season = 'Winter';
const allSeasons: Season[] = [spring, summer, fall, winter];

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
  },
  { // Mezcal Negroni
    ...drink({ 
      title: 'Mezcal Negroni',
      description: 'A sophisticated cocktail with a smoky and bitter flavor.',
      seasons: [],
      ingredients: [
        add(1, 'mezcal'),
        add(1, 'sweet vermouth'),
        add(1, 'campari'),
      ],
      steps: [
        'Add all ingredients to mixing glass with ice.',
        'Stir until cold.',
        'Strain into rocks glass with ice.',
        'Garnish with orange peel (optional).',
      ],
    })
  },
  { // Improved Whiskey Cocktail
    ...drink({
      title: 'Improved Whiskey Cocktail',
      description: 'A classic and classy cocktail. It\'s existance is why we have something called the "Old Fashioned".',
      seasons: [...allSeasons],
      ingredients: [
        add(1/4, 'simple syrup'),
        add(1/4, 'luxardo maraschino liqueur'),
        add(2, 'rittenhouse rye whiskey'),
        add(2, 'bitters', { unit: 'dashes' }),
        add(1, 'absinthe', { unit: 'dash' }),
      ],
      steps: [
        'Add all ingredients to mixing glass with ice',
        'Stir until cold',
        'Strain into rocks glass with ice',
        'Garnish with lemon twist (optional)',
      ]
    })
  },
  { // White Chocolate Mocha
    ...drink({
      title: 'White Chocolate Mocha',
      seasons: [...allSeasons],
      description: 'A cozy and indulgent coffee drink. The eventual \'Leslie Hargus\' at the Afterlife Bar.',
      ingredients: [
        add(1, 'Mr. Black'),
        add(1, 'Kaluha'),
        add(1, 'creme de cacao'),
      ],
      steps: [
        'Add all ingredients to shaker with ice',
        'Shake until cold',
        'Strain into chilled coupe glass',
      ],
      searchTerms: ['coffee', 'espresso', 'white chocolate', 'mocha'],
    })
  },
  { // Cold Brew Old Fashioned
    ...drink({
      title: 'Cold Brew Old Fashioned',
      seasons: [...allSeasons],
      description: 'A coffee twist on the classic Old Fashioned cocktail.',
      ingredients: [
        add(1, 'Mr. Black'),
        add(1, 'rye whiskey'),
        add(2, 'orange bitters', { unit: 'dashes' }),
      ],
      steps: [
        'Add all ingredients to mixing glass with ice',
        'Stir until cold',
        'Strain into rocks glass with ice',
        'Garnish with orange twist (optional)',
      ]
    })
  },
  { // Sweet Embrace
    ...drink({
      title: 'Sweet Embrace',
      seasons: [...allSeasons],
      description: 'A sweet and comforting bourbon cocktail. The eventual \'Nic Pereira\' at the Afterlife Bar',
      ingredients: [
        add(2, 'bourbon'),
        add(1, 'benedictine'),
        add(1, 'maple syrup'),
        add(0, '2-3 maraschino cherries'),
      ],
      steps: [
        'Add all ingredients to shaker with ice',
        'Shake until cold',
        'Strain into rocks glass with ice',
        'Garnish with maraschino cherries on pick',
        'Dip cherries in the drink for extra sweetness',
      ]
    })
  },
  { // King Kong
    ...drink({
      title: 'King Kong',
      seasons: [summer],
      ingredients: [
        add(2, 'banana rum'),
        add(2, 'pineapple juice'),
        add(1, 'coconut rum'),
        add(1, 'coconut cream')
      ],
      steps: [
        'Add all ingredients to shaker with ice',
        'Shake *violently* until cold',
        'Strain into barrel glass with ice',
      ]
    })
  },
  { // Punkin' Gin Fashioned
    ...drink({
      title: 'Punkin\' Gin Fashioned',
      seasons: [autumn],
      description: 'A fall twist on the classic Old Fashioned cocktail.',
      ingredients: [
        add(1.5, 'botanist gin'),
        add(.25, 'dry vermouth'),
        add(.25, 'maple syrup'),
        add(2, 'orange bitters', { unit: 'dashes' }),
        add(0, 'cinnamon stick', { adjustments: 'optional for garnish' }),
      ],
      steps: [
        'Add all ingredients to shaker with ice',
        'Shake until cold',
        'Strain into rocks glass with ice',
        'Garnish with cinnamon stick (optional)',
      ]
    })
  }
].sort((a, b) => a.title.localeCompare(b.title));

export default recipes;
