import type { Season } from "../../../types/recipe-types";
import type { Ingredient, Recipe, QuantityUnit } from "../SharedRecipeComponents/recipe-types";

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
  quantity: number | [number, number],
  name: string,
  options?: {
    unit?: QuantityUnit | 'none' | 'blank' | 'null',
    adjustments?: string,
  }
): Ingredient => ({
  name,
  quantity,
  adjustments: options?.adjustments,
  unit: (
    (options?.unit == 'none' || options?.unit == 'blank' || options?.unit == 'null')
    ? null
    : (options?.unit ?? (quantity ? 'oz' : null)) // Default unit for drinks is oz
  ),
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
        add(1, 'egg white', { unit: 'none', adjustments: 'optional for frothiness' }),
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
  { // Smoked Rum Martinez
    ...drink({
      title: 'Smoked Rum Martinez',
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
        add([2, 3], 'maraschino cherries'),
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
  { // Boozy Banana
    ...drink({
      title: 'Boozy Banana',
      seasons: [summer],
      ingredients: [
        add(2, 'banana rum'),
        add(4, 'pineapple juice'),
        add(1, 'cream of coconut'),
        add(1, 'orange juice'),
      ],
      steps: [
        'Add all ingredients to shaker with ice',
        'Shake until cold',
        'Strain into hurricane glass with ice',
        'Sip until satisfied'
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
  },
  { // Moscow Mule
    ...drink({
      title: 'Moscow Mule',
      seasons: [...allSeasons],
      description: 'A refreshing and zesty cocktail with a ginger kick.',
      ingredients: [
        add(2, 'vodka'),
        add(4, 'ginger beer'),
        add(.5, 'lime juice'),
        add(0, 'mint leaf', { adjustments: 'for garnish' }),
      ],
      steps: [
        'Add vodka and lime juice to copper mug (with tin lining for safety) with ice',
        'Top with ginger beer',
        'Stir gently to combine',
        'Garnish with mint leaf (optional)',
      ],
    })
  },
  { // Farwell to Arms
    ...drink({
      title: 'Farewell to Arms',
      seasons: [fall],
      ingredients: [
        add(1, 'bourbon'),
        add(1, 'apple brandy'),
        add(1/2, 'benedictine'),
        add(1/2, 'sweet sherry'),
        add(2, 'bitters', { unit: 'dashes' }),
        add(0, 'lemon twist', { adjustments: 'for garnish' }),
      ],
      steps: [
        'Add all ingredients to mixing glass with ice',
        'Stir until cold',
        'Strain into rocks glass with ice',
        'Garnish with lemon twist (optional)',
      ],
    })

  },
  { // The Alexander
    ...drink({
      title: 'The Alexander',
      seasons: [],
      ingredients: [
        add(1, 'sweet cream'),
        add(1, 'creme de cacao'),
        add(1.5, 'gin'),
        add(0, 'grated nutmeg'),
      ],
      steps: [
        'Add all ingredients to shaker with ice',
        'Shake shake shake until cold',
        'Strain into chilled coupe glass',
        'Garnish with grated nutmeg',
      ],
    })
  },
  { // Alexander's Sister
    ...drink({
      title: 'Alexander\'s Sister',
      seasons: [],
      ingredients: [
        add(1, 'sweet cream'),
        add(1, 'creme de menth'),
        add(1.5, 'gin'),
        add(0, 'grated cinnamon'),
      ],
      steps: [
        'Add all ingredients to shaker with ice',
        'Shake shake shake until cold',
        'Strain into chilled coupe glass',
        'Garnish with grated cinnamon',
      ],
    })
  },
  { // Shamrock Shake
    ...drink({
      title: 'Alexander\'s Sister',
      seasons: [],
      ingredients: [
        add(1, 'sweet cream'),
        add(.5, 'creme de cacao'),
        add(.5, 'creme de menth'),
        add(1.5, 'gin'),
        add(0, 'grated nutmeg'),
      ],
      steps: [
        'Add all ingredients to shaker with ice',
        'Shakey until cold',
        'Strain into chilled coupe glass',
        'Garnish with grated nutmeg (or cinnamon (or both!))',
      ],
    })
  },
  { // Kingston Coffee
    ...drink({
      title: 'Kingston Coffee',
      seasons: [...allSeasons],
      ingredients: [
        add(1.5, 'plantation xaymaca jamaican rum'),
        add(.5, 'Mr. Black or Kaluha'),
        add(4, 'hot coffee', { adjustments: 'to taste, I used highlander grogg' }),
        add(.5, 'brown sugar syrup'),
        add(0, 'grated cinnamon and/or nutmeg'),
        add(0, 'whipped cream', { adjustments: 'optional' }),
      ],
      steps: [
        'Add rum, Mr. Black or Kaluha, and brown sugar syrup to a heatproof glass',
        'Mix well (if using brown sugar instead of syrup, mix until dissolved)',
        'Add hot coffee to taste (I use about 4.5oz)',
        'Stir gently to combine',
        'Top with grated cinnamon and/or nutmeg',
        'Garnish with whipped cream (optional)',
      ]
    })
  },
  { // Oatmeal Cookie
    ...drink({
      title: 'Oatmeal Cookie',
      seasons: [],
      description: 'A dessert cocktail that tastes a bit like an oatmeal cookie.',
      ingredients: [
        add(1, 'Goldshlager'),
        add(1, 'baileys irish cream'),
        add(1, 'butterscotch schnapps'),
        add(.5, 'vanilla vodka'),
        add(0, 'cinnamon', { adjustments: 'optional, a sprinkle' }),
      ],
      steps: [
        'Add all ingredients to shaker with ice',
        'Shake until well chilled',
        'Strain into glass',
        'Garnish with a sprinkle of cinnamon (optional)',
      ],
    })
  },
  { // Blue Hurricane
    ...drink({
      title: 'Blue Hurricane',
      seasons: [summer],
      ingredients: [
        add(2, 'coconut rum'),
        add(1, 'blue curacao'),
        add(2, 'pineapple juice'),
        add(0, 'orange peel', { adjustments: 'for garnish' }),
        add(0, 'cherry', { adjustments: 'for garnish' }),
      ],
      steps: [
        'Add all ingredients to shaker with ice',
        'Shake until cold',
        'Strain into coupe glass (or maybe hurricane glass?) with an ice cube',
        'Garnish with orange peel and cherry (optional)',
        'Splash the ice cube with grenadine for a "Shark Attack" (optional)',
      ],
    })
  },
  { // The Winter Warmer
    ...drink({
      title: 'The Winter Warmer',
      seasons: [winter],
      description: 'A cozy and warming cocktail perfect for cold weather.',
      ingredients: [
        add(2, 'vanilla vodka'),
        add(1.5, 'honey'),
        add(.5, 'lemon juice'),
        add([2, 4], 'hot water', { adjustments: 'to taste, usually 2 per' }),
      ],
      steps: [
        'Water to a heatproof glass',
        'Add honey and lemon juice, stir until honey is dissolved',
        'Add vanilla vodka and stir to combine',
        'Serve very warm'
      ],
    })
  },
  { // Sweet Martini
    ...drink({
      title: 'Sweet Martini',
      seasons: [],
      ingredients: [
        add(1.5, 'gin'),
        add(1.5, 'sweet vermouth'),
        add(1, 'orange bitters', { unit: 'dash' }),
        add(1, 'simple syrup', { unit: "tsp" }),
        add(.5, 'grand marnier', { adjustments: 'optional' }),
      ],
      steps: [
        'Add all ingredients to mixing glass with ice',
        'Stir until cold',
        'Strain into chilled coupe glass',
      ],
    })
  },
  { // Agent Orange
    ...drink({
      title: 'Agent Orange',
      seasons: [],
      ingredients: [
        add(2, 'orange juice'),
        add(1, 'vodka'),
        add(1, 'triple sec'),
        add(0, 'orange peel/slice', { adjustments: 'for garnish' }),
      ],
      steps: [
        '',
      ]
    })
  },
  { // Gin & It
    ...drink({
      title: 'Gin & It',
      seasons: [],
      ingredients: [
        add(1.5, 'gin'),
        add(3/4, 'sweet vermouth'),
        add([1, 3], 'maraschino cherries'),
      ],
      steps: [
        'Add all ingredients to mixing glass with ice',
        'Stir until cold',
        'Strain into chilled coupe glass',
      ],
    })
  },
  { // Daiquiri
    ...drink({
      title: 'Daiquiri',
      seasons: [],
      ingredients: [
        add(2, 'rum'),
        add(1, 'simple syrup'),
        add(1, 'lime juice'),
      ],
      steps: [
        'Add all ingredients to shaker with ice',
        'Shake until well chilled',
        'Strain into chilled coupe glass',
      ],
    })
  },
  { // Jungle Bird
    ...drink({
      title: 'Jungle Bird',
      seasons: [summer],
      description: 'A tropical cocktail with a strong hint of bitterness.',
      ingredients: [
        add(.5, 'simple syrup'),
        add(1.5, 'blackstrap rum'),
        add(3/4, 'campari'),
        add(1.5, 'pineapple juice'),
        add(.5, 'lime juice'),
      ],
      steps: [
        'Add all ingredients to shaker with ice',
        'Shake until well chilled',
        'Strain into rocks glass with ice',
      ],
      searchTerms: ['tiki'],
    })
  },
  { // Blue Mountain King
    ...drink({
      title: 'Blue Mountain King',
      seasons: [summer],
      description: 'A tropical cocktail with a hint of coconut and blue curaçao.',
      ingredients: [
        add(.75, 'doblin blanc vermouth'),
        add(1, 'mr black'),
        add(1, 'jamaican rum'),
        add(1, 'bitters', { unit: 'dash' }),
        add(1, 'dry curaçao', { unit: 'bar spoon' }),
        add(0, 'maraschino cherry', { adjustments: 'for garnish' }),
      ],
      steps: [
        'Add all ingredients to mixing glass with ice',
        'Stir until well chilled',
        'Strain into coupe with ice',
      ],
      searchTerms: ['tiki'],
    })
  },
  { // Good News
    ...drink({
      title: 'Good News',
      seasons: [],
      ingredients: [
        add(2, 'bourbon'),
        add(.5, 'cynar'),
        add(.5, 'benedictine'),
      ],
      steps: [
        'Add all ingredients to shaker with ice',
        'Shake until well chilled',
        'Strain into glass',
      ],
    })

  },
  { // Smoky Garden Sip
    ...drink({
      title: 'Smoky Garden Sip',
      seasons: [spring, summer],
      description: 'A refreshing and smoky cocktail with herbal notes.',
      ingredients: [
        add(.5, 'mezcal'),
        add(1, 'st. germain'),
        add(.5, 'lime juice'),
        add(.25, 'honey or simple syrup'),
        add(0, 'splash of campaigne'),
      ],
      steps: [
        'Add mezcal, st. germain, lime juice, and honey/simple syrup to shaker with ice',
        'Shake until well chilled',
        'Strain into rocks glass with ice',
        'Top with a splash of champagne',
      ],
    })
  },
  { // Color Changer
    ...drink({
      title: 'Color Changer',
      seasons: [],
      ingredients: [
        add(2, 'navy strength gin'),
        add(.75, 'simple syrup'),
        add(1, 'butterfly pea flower tea', { adjustments: 'strongly brewed and chilled' }),
        add(.5, 'citric acid', { unit: 'tsp' }),
        add(3, 'water'),
      ],
      steps: [
        'Create citric acid solution by dissolving citric acid in water, set aside',
        'Add gin, simple syrup, and butterfly pea flower tea to shaker with ice',
        'Consider adding the absolute faintest hint of something basic, like baking soda',
        'Seriously, just a tiny tiny tiny pinch',
        'Shake until well chilled',
        'Strain into glass, serve with about .5oz of the citric acid solution on the side',
        'Before drinking, add the citric acid solution to the glass and watch the color change!',
      ]
    })
  },
  { // Smoky Garden Sip (Non-Alcoholic)
    ...drink({
      title: 'Smoky Garden Sip',
      seasons: [],
      ingredients: [
        add(.5, 'mezcal'),
        add(1, 'st. germain with muddled mint'),
        add(.5, 'lime juice'),
        add(.25, 'honey or simple syrup'),
        add(0, 'splash of champagne')
      ],
      steps: [
        'Add all ingredients to shaker with ice',
        'Shake until well chilled',
        'Strain into rocks glass with ice',
        'Garnish with more mint if you\'re feeling fancy',
      ]
    }),
  }
].sort((a, b) => a.title.localeCompare(b.title));

export default recipes;
