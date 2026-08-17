import type { Season } from "../../types/recipe-types";
import type { Ingredient, QuantityUnit, Recipe } from "../../pages/Recipes/SharedRecipeComponents/recipe-types";
import type { DrinkRecipe } from "./drink-recipe-data";

type HotChocolateRecipe = Omit<DrinkRecipe, 'category' | 'steps' | 'seasons'> & {
  steps?: string[];
  seasons?: Season[];
  toppings?: Ingredient[];
  withoutBase?: boolean
};

const cup: QuantityUnit = 'cup';
const tsp: QuantityUnit = 'tsp';
const tbsp: QuantityUnit = 'tbsp';

const add = (
  quantity: number | [number, number] | null,
  unit: QuantityUnit | null,
  name: string,
  adjustments?: string
): Ingredient => ({
  name,
  quantity: quantity ?? 0,
  unit,
  adjustments
});
const top = (name: string, adjustments?: string): Ingredient =>
  add(null,null, name, adjustments);


const baseHotChocolateIngredients: Ingredient[] = [
  add(1, cup, 'milk', 'we use 2% or 1%' ),
  add([2, 3], 'tbsp', '60% or 70% dark chocolate', '3 squares for a much thicker experience' ),
  add(1, 'tbsp', 'white chocolate' ),
  add(1, 'scoop', 'hot chocolate powder', '(optional) we use a truffle powder.')
];
const baseHotChocolateSteps: string[] = [
  'Prep all the ingredients ahead of time.',
  'Cut chocolate to small bits so it melts evenly.\nIf I\'m lazy, I break it by hand.',
  'Heat the milk until hot or slightly steaming.',
  'Lower heat',
  'Add chocolate and other ingredients.',
  'Whisk until everything is melted and smooth.',
  'Pour into mugs',
  'Add toppings as desired.'
];

const hotChocolate = (r: HotChocolateRecipe): Recipe => ({
  title: r.title,
  subtitle: r.subtitle,
  category: 'Hot Chocolate',
  seasons: ['Winter', ...(r.seasons ?? [])],
  searchTerms: [
    'hot chocolate',
    'hot cocoa',
    'cocoa',
    'hod',
    'choccy',
    'choggy',
    ...(r.searchTerms ?? []),
  ],
  description: r.description,
  ingredientsLists: [{
    title: 'Hot Chocolate',
    ingredients: [
      ...(r.withoutBase ? [] : baseHotChocolateIngredients),
      ...r.ingredients
    ],
  }, {
    title: 'Toppings',
    ingredients: r.toppings ?? [],
  }],
  stepsLists: [
    {
      step0: r.step0,
      steps: [
        ...(r.withoutBase ? [] : baseHotChocolateSteps),
        ...(r.steps ?? [])
      ],
    },
  ],
});

const recipes: Recipe[] = [
  { // Rustic Hot Chocolate
    ...hotChocolate({
      title: 'Rustic Hot Chocolate',
      description:
        'A lovely and classic hot chocolate, perfect for sipping in'
        +' the winter lodge as snow falls.',
      ingredients: [
        add(1, tbsp, 'maple syrup'),
        add(1, 'splash', 'vanilla extract'),
        add(1, 'pinch', 'salt', 'as teeny as you can get' ),
      ],
      toppings: [
        top('mini marshmallows'),
        top('Nutmeg', 'freshly grated'),
        top('Candy Cane', 'or peppermint extract'),
      ],
    }),
  },
  { // Warming Ginger Hot Chocolate
    ...hotChocolate({
      title: 'Warming Ginger Hot Chocolate',
      description: 'The ginger adds a touch of warmth to the drink,'
        +' making it perfect for cold winter days.',
      ingredients: [
        add(1, tsp, 'brown sugar'),
        add(1/8, tsp, 'ground ginger'),
        add(1, 'pinch', 'salt', 'as teeny as you can get' ),
        add([.5, 1], tbsp, 'dark chocolate', '(optional for thicker drink)'),
      ],
      toppings: [
        top('Cinnamon', 'freshly grated'),
        top('Marshmallows'),
      ],
    }),
  },
  { // Mexican Spice
    ...hotChocolate({
      title: 'Mexican Spice Hot Chocolate',
      description: '',
      ingredients: [
        add(2, tbsp, 'sugar'),
        add(1/8, tsp, 'ancho chili powder'),
        add(.5, tsp, 'ground cinnamon'),
        add(1, tsp, 'vanilla'),
      ],
      toppings: [
        top('Marshmallows'),
      ],
    }),
  },
  { // Crot Pot Hot Choc, or Crock-Chocolate
    ...hotChocolate({
      title: 'Crot Pot Hot Chocolate, or Crock-Chocolate',
      description: '',
      withoutBase: true, // !! //
      ingredients: [
        add(1.5, cup, 'heavy whipping cream'),
        add(1, null, '14oz can sweetened condensed milk'),
        add(6, cup, 'milk'),
        add(1, tsp, 'vanilla'),
        add(1, null, 'bag of semi-sweet chocolate chips'),
      ],
      toppings: [
        top('Many toppings, let the guests decide!'),
      ],
      steps: [
        'Add everything except chocolate (and toppings) to a crock pot.',
        'Get the pot warming things up for a bit.',
        'Add chocolate and stir to melt.',
        'Prep toppings or add-ons near the crock pot.',
        'Guests can serve themselves directly from the crock pot!',
      ]
    })
  }
];

export default recipes;
