import type { RecipeCategory, Season } from "../../types/recipe-types";

export type Recipe = StandardRecipeParts & {
  ingredientsLists: Ingredients[];
  stepsLists: Steps[];
};

type SimplifiedRecipe = StandardRecipeParts & {
  ingredients: Ingredient[];
  step0?: string;
  steps: string[];
};

type StandardRecipeParts = {
  title: string;
  subtitle?: string;
  category: RecipeCategory;
  searchTerms?: string[];
  description?: string;
  seasons: Season[];
};


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

export type Steps = {
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

export type QuantityUnit = 'g' | 'kg' 
| 'ml' | 'l' 
| 'cup'
| 'tbsp' | 'tsp' | 'generous tbsp'
| 'oz' | 'lb' 
| 'piece' | 'spoonful' | 'pinch' | 'bunch' | 'dash'
| 'strips' | 'bottle';
const g: QuantityUnit = 'g';
//const ml: QuantityUnit = 'ml';
const cup: QuantityUnit = 'cup';
const gtbsp: QuantityUnit = 'generous tbsp';
const tbsp: QuantityUnit = 'tbsp';
const tsp: QuantityUnit = 'tsp';
const oz: QuantityUnit = 'oz';
const lb: QuantityUnit = 'lb';
const lbs: QuantityUnit = 'lb'; // Alias for lb
//const piece: QuantityUnit = 'piece';
const spoonful: QuantityUnit = 'spoonful';
const pinch: QuantityUnit = 'pinch';
const bunch: QuantityUnit = 'bunch';
const dash: QuantityUnit = 'dash';

//const breakfast: RecipeCategory = 'Breakfast';
const lunch: RecipeCategory = 'Lunch';
const dinner: RecipeCategory = 'Dinner';
const dessert: RecipeCategory = 'Dessert';

// type SimplifiedRecipe = {
//   title: string;
//   seasons: Season[];
//   ingredients: Ingredient[];
//   steps: string[];
// };

const simpleRecipe = (r: SimplifiedRecipe): Recipe => ({
  title: r.title,
  subtitle: r.subtitle,
  category: r.category,
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
      step0: r.step0,
      steps: r.steps
    }
  ]
});

// const simpleIngredients = (i: Ingredient[]): Ingredients[] => (
//   [{ ingredients: i }]
// );

const simpleSteps = (s: string[]): Steps[] => (
  [{ steps: s }]
);

const recipes: Recipe[] = [
  { // Showa Yaki
    title: 'Showa Yaki',
    category: dinner,
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
      category: dinner,
      seasons: [spring, summer, fall, winter],
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
        'Finish with a bit of parsley, stir again.',
        'Serve hot!',
      ]
    })
  },
  { // Grilled Sketty
    ...simpleRecipe({
      title: 'Grilled Sketty',
      category: dinner,
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
        'Serve.',
      ]
    })
  },
  { // Spaghetti Aglio e Olio
    ...simpleRecipe({
      title: 'Aglio e Olio',
      subtitle: 'without oil for some reason',
      category: dinner,
      seasons: [summer, autumn],
      ingredients: [
        ing(.5, lb, 'dry linguine'),
        ing(.5, null, 'head of garlic'),
        ing(1, bunch, 'parsley'),
        ing(.5, null, 'lemon'),
        ing(1, tsp, 'red pepper flakes'),
      ],
      steps: [
        'Bring pot of water to boil.',
        'Peel and thin-slice garlic.',
        'Pasta into boiling water.',
        'Butter sauté pan.',
        'Add garlic.',
        'When it starts to brown, add pepper flakes + remove from heat.',
        'When garlic hits golden brown, add pasta (and slight pasta water).',
        'Parsley, mix around.',
        'Lemon juice as hell.',
        'Dash salt, dash pepper.',
      ]
    })
  },
  { // Bokius Butter Cookies
    ...simpleRecipe({
      title: 'Bokius Butter Cookies',
      searchTerms: ['pereira', 'christmas', 'holiday', 'sugar cookies'],
      category: dessert,
      seasons: [winter],
      ingredients: [
        ing(.25, lbs, 'butter'),
        ing(.25, lb, 'lard'),
        ing(2, null, 'egg'),
        ing(1, cup, 'sugar'),
        ing(1, tsp, 'vanilla extract', 'extra good stuff'),
        ing(3, cup, 'all-purpose flour', 'unsifted'),
        ing(3, tsp, 'baking powder'),
      ],
      step0: 'No more than double this recipe in mixer!',
      steps: [
        'Melt lard and butter. Let it cool a bit.',
        'In separate (non-mixer) bowl, mix flour and baking powder, set aside.',
        'In blender mixing bowl on medium speed, blend lard-butter mix, sugar, vanilla, and eggs until light and fluffy.',
        'Add flour-mix on low speed until combined.',
        'Refrigerate for 1 hour (or overnight) before rolling out.',
        'Decorate with sprinkles (NOT ICING!)',
        'Bake at 375° for 4 mins (more likely 8 mins) until edges just barely brown.'
        +' --Baking Tip! You want to pull them just before they are done, they will continue to cook on the tray.--',
        'Do NOT eat yet! These should be fully cooled, probably overnight, before eating. They are optimized for the season.',
      ]
    })
  },
  { // Hot Dog Chili
    ...simpleRecipe({
      title: 'Hot Dog Chili',
      subtitle: 'for chili dogs',
      category: lunch,
      seasons: [spring, summer, autumn],
      ingredients: [
        ing(1, lb, 'ground beef'),
        ing(.5, cup, 'water'),
        ing(5, oz, 'tomato sauce'),
        ing(.5, cup, 'ketchup'),
        ing(2.5, tsp, 'chili powder'),
        ing(.5, tsp, 'salt'),
        ing(.5, tsp, 'black pepper'),
        ing(.5, tsp, 'white sugar'),
        ing(.5, tsp, 'onion powder'),
        ing(1, dash, 'worcestershire sauce'),
      ],
      steps: [
        'Place ground beef and water in a large saucepan; use a potato masher to break apart beef.',
        'Stir in tomato sauce, ketchup, chili powder, salt, black pepper, sugar, onion powder, and Worcestershire sauce.',
        'Bring to a boil, then simmer over medium heat until beef is cooked and chili thickens, about 20 minutes.',
        'Serve over hot dogs and enjoy!',
      ]
    }),
  },
  { // Chicken Teriyaki Skewers
    title: 'Chicken Teriyaki Skewers',
    subtitle: 'with miso ranch dip',
    searchTerms: ['yakitori', 'miso ranch', 'miso dip', 'grilled chicken'],
    category: dinner,
    seasons: [summer],
    ingredientsLists: [
      {
        ingredients: [
          ing(2, lb, 'chicken thighs'),
          ing(.5, cup, 'soy sauce'),
          ing(.5, cup, 'sake'),
          ing(.33, cup, 'mirin'),
          ing(2, tbsp, 'green onions', 'finely minced'),
          ing(2, tsp, 'brown sugar'),
          ing(.25, cup, 'brown sugar'),
          ing(1, tbsp, 'vegetable oil'),
        ]
      },
      {
        title: 'Miso Ranch Dip',
        ingredients: [
          ing(3/4, cup, 'mayonnaise'),
          ing(1/3, cup, 'buttermilk'),
          ing(1/4, cup, 'sour cream or creme fraiche'),
          ing(1, gtbsp, 'white miso paste'),
          ing(1, tbsp, 'green onions', 'finely minced'),
          ing(1, null, 'clove garlic', 'crushed'),
          ing(1, tbsp, 'fresh terragon', 'finely chopped'),
          ing(1, tbsp, 'fresh dill', 'finely chopped'),
          ing(1, tbsp, 'fresh chives', 'finely chopped'),
          ing(0, null, 'fresh ground black pepper'),
          ing(0, null, 'cayenne')
        ]
      }
    ],
    stepsLists: simpleSteps([
      'Soak bamboo sticks if desired.',
      'Cut that chicken into 3 - 4 chunks each.',
      'Throw chicken in bowl. Add soy, sake, mirin.',
      'Add grated or powder ginger and green onions.',
      'Add brown sugar and vegetable oil.',
      'Mix by hand! Cover, pop in fridge 4+ hours.',
      'Mix all the miso ranch stuff in another bowl.',
      'Skewer chicken. Grill chicken. Eat chicken.',
    ])
  },
  { // Chicken and Wine
    ...simpleRecipe({
      title: 'Chicken and Wine',
      category: dinner,
      seasons: [summer, spring, autumn, winter],
      ingredients: [
        ing(2, lbs, 'chicken thighs'),
        ing(2, 'strips', 'bacon'),
        ing(1, null, 'yellow onion', 'diced'),
        ing(1/3, 'bottle', 'semi-sweet red wine'),
      ],
      steps: [
        'Slice one bacon strip into pan.',
        'Place the second strip into pan (this is the sacrificial bacon you snack on to preserve the bits).',
        'Cook bacon on stove.',
        'Remove bacon when done.',
        'Salt and pepper chicken.',
        'Brown chicken in bacon grease.',
        'Cut half yellow onion.',
        'Remove chicken, add onion.',
        'When onion is gold, add chicken, wine, and bacon.',
        'Cook until wine bubbles.',
        '375° oven for 40 mins.',
      ]
    })
  }
].sort((a, b) => a.title.localeCompare(b.title));

export default recipes;
