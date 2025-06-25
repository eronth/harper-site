
export type Recipe = StandardRecipeParts & {
  ingredientsLists: Ingredients[];
  stepsLists: Steps[];
};

type SimplifiedRecipe = StandardRecipeParts & {
  ingredients: Ingredient[];
  steps: string[];
};

type StandardRecipeParts = {
  title: string;
  searchTerms?: string[];
  description?: string;
  seasons: Season[];
};

type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter';
const spring: Season = 'Spring';
const summer: Season = 'Summer';
const autumn: Season = 'Autumn';
const fall: Season = 'Autumn'; // Alias for Autumn
const winter: Season = 'Winter';

type Ingredients = {
  title?: string;
  ingredients: Ingredient[];
};

export type Ingredient = {
  name: string;
  quantity: number;
  unit?: QuantityUnit | null;
  adjustments?: string;
};

type Steps = {
  title?: string;
  step0?: string;
  steps: string[];
};

const ing = (
  quantity: number,
  unit: QuantityUnit | null,
  name: string,
  adjustments?: string
): Ingredient => ({
  name,
  quantity,
  unit,
  adjustments
});

type QuantityUnit = 'g' | 'kg' 
| 'ml' | 'l' 
| 'cup'
| 'tbsp' | 'tsp' 
| 'oz' | 'lb' 
| 'piece' | 'spoonful' | 'pinch';
const g: QuantityUnit = 'g';
const ml: QuantityUnit = 'ml';
const cup: QuantityUnit = 'cup';
const tbsp: QuantityUnit = 'tbsp';
const tsp: QuantityUnit = 'tsp';
const oz: QuantityUnit = 'oz';
const lb: QuantityUnit = 'lb';
const piece: QuantityUnit = 'piece';
const spoonful: QuantityUnit = 'spoonful';
const pinch: QuantityUnit = 'pinch';

// type SimplifiedRecipe = {
//   title: string;
//   seasons: Season[];
//   ingredients: Ingredient[];
//   steps: string[];
// };

const simpleRecipe = (r: SimplifiedRecipe): Recipe => ({
  title: r.title,
  seasons: r.seasons,
  searchTerms: r.searchTerms,
  description: r.description,
  ingredientsLists: [
    {
      ingredients: r.ingredients
    }
  ],
  stepsLists: [
    {
      steps: r.steps
    }
  ]
});

const simpleIngredients = (i: Ingredient[]): Ingredients[] => (
  [{ ingredients: i }]
);

const simpleSteps = (s: string[]): Steps[] => (
  [{ steps: s }]
);

const recipes: Recipe[] = [
  { // Showa Yaki
    title: 'Showa Yaki',
    seasons: [],
    ingredientsLists: [
      {
        ingredients: [
          ing(250, g, 'pork neck'),
          ing(.5, tsp, 'ginger powder')
        ]
      },
      {
        title: 'Sauce',
        ingredients: [
          ing(2, tbsp, 'soy sauce'),
          ing(2, spoonful, 'Korean cooking wine'),
          ing(1.5, tbsp, 'sake'),
          ing(1, tsp, 'sugar'),
          ing(.5, tsp, 'syrup', 'type not specified'),
          ing(1, tsp, 'water'),
        ],
      },
    ],
    stepsLists: simpleSteps([
      'Fry pork in skillet.',
      'Mix sauce ingredients in a bowl.',
      'Add sauce to skillet.',
      'If the meat is brisk enough, add ginger in it and it will suffocate.',
      'Serve with rice.'
    ])
  },
  { // Jambalaya
    ...simpleRecipe({
      title: 'Jambalaya',
      seasons: [spring, summer, autumn, winter],
      ingredients: [
        ing(0, null, 'salt & pepper', 'to taste'),
        ing(4, null, 'chicken thighs'),
        ing(3, oz, 'smoked sausage', 'thinly sliced'),
        ing(1, null, 'garlic clove'),
        ing(1, null, 'small yellow onion', 'diced'),
        ing(1, null, 'green bell pepper'),
        ing(.5, cup, 'white rice'),
        ing(1.25, cup, 'chicken broth'),
        ing(2, tsp, 'cajun seasoning'),
        ing(0, null, 'louisiana sauce', 'to taste'),
      ],
      steps: [
        'Cube that chicken into pan.',
        'Slice sausage into pan.',
        'Add salt and pepper.',
        'Add medium heat.',
        'Add onion, pepper, and garlic.',
        'Cook to soften veggies and partially brown chicken/sausage.',
        'Add broth and rice. Stir well.',
        'Let come to boil.',
        'Add Cajun.',
        'Add a dash of Louisiana sauce.',
        'Reduce heat to mid.',
        'Let sit with lid on for 15 min.',
        'Finish with a bit of parsley, stir again. Serve hot.',
      ]
    })
  },
  { // Grilled Sketty
    ...simpleRecipe({
      title: 'Grilled Sketty',
      searchTerms: ['grilled spaghetti', 'spaghetti'],
      seasons: [spring, summer],
      ingredients: [
        ing(8, oz, 'thick dry spaghetti'),
        ing(3, tbsp, 'olive oil'),
        ing(3, null, 'garlic cloves'),
        ing(2, tbsp, 'tomato paste', 'rounded/large tablespoons'),
        ing(3.75, cup, 'chicken broth', 'at least, probably more'),
        ing(1, tsp, 'salt'),
        ing(2, tbsp, 'unsalted butter'),
        ing(.25, cup, 'basil leaves', 'torn up'),
        ing(.25, cup, 'parmigiano reggiano', 'finely grated'),
        ing(1, pinch, 'red chili flakes', 'optional'),
      ],
      steps: [
        'Prepare grill at medium-high heat.',
        'Place sketty on grill, grill about 4-ish mins.',
        'Remove',
        'Add olive oil to pan on medium.',
        'Sauté garlic for 30 to 60 seconds.',
        'Add tomato paste, sauté another 1 min.',
        'Pour in broth, raise to medium-high.',
        'Bring broth to a simmer, add salt and sketty.',
        'Move sketty around, cooking until it softents enough to be covered by broth.',
        'Cook until it’s the dente you like.',
        'Reduce to low, stir in butter and basil until butter melted.',
        'Turn off heat, add cheese, stir until melted.',
        'Serve',
      ]
    })
  }
];

export default recipes;
