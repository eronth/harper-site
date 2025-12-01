import type { Season } from "../../../types/recipe-types";
import type { Ingredient, QuantityUnit, Recipe } from "../SharedRecipeComponents/recipe-types";
import type { DrinkRecipe } from "./drink-recipe-data";

type HotChocolateRecipe = Omit<DrinkRecipe, 'steps' | 'seasons'> & {
  steps?: string[];
  seasons?: Season[];
  toppings?: Ingredient[];
};

const cup: QuantityUnit = 'cup';

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
  category: 'Drink',
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
      ...baseHotChocolateIngredients,
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
        ...baseHotChocolateSteps,
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
        add(1, 'tbsp', 'maple syrup'),
        add(1, 'splash', 'vanilla extract'),
        add(1, 'pinch', 'salt', 'as teeny as you can get' ),
      ],
      toppings: [
        top('mini marshmallows'),
        top('Nutmeg', 'freshly grated'),
        top('Candy Cane', 'or peppermint extract'),
      ],
    }),
  }
];

export default recipes;
