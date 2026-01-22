import type { RecipeCategory, Season } from "../../../types/recipe-types";
import type { Ingredient, QuantityUnit, Recipe, SimplifiedRecipe, Steps } from "../SharedRecipeComponents/recipe-types";

const spring: Season = 'Spring';
const summer: Season = 'Summer';
const autumn: Season = 'Autumn';
const fall: Season = 'Autumn'; // Alias for Autumn
const winter: Season = 'Winter';
const yearround: Season[] = [spring, summer, autumn, winter];
const allSeasons: Season[] = yearround;
//const anySeason: Season[] = yearround;

const ing = (
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

const saltAndPepper = ing(0, null, 'salt & pepper');

const g: QuantityUnit = 'g';
//const ml: QuantityUnit = 'ml';
const cup: QuantityUnit = 'cup';
const quart: QuantityUnit = 'quart';
const gal: QuantityUnit = 'gal';
const gtbsp: QuantityUnit = 'generous tbsp';
const tbsp: QuantityUnit = 'tbsp';
const tsp: QuantityUnit = 'tsp';
const oz: QuantityUnit = 'oz';
const lb: QuantityUnit = 'lb';
//const piece: QuantityUnit = 'piece';
const spoonful: QuantityUnit = 'spoonful';
const pinch: QuantityUnit = 'pinch';
const bunch: QuantityUnit = 'bunch';
const dash: QuantityUnit = 'dash';
const splash: QuantityUnit = 'splash';
const clove: QuantityUnit = 'clove';
const slices: QuantityUnit = 'slices';
const handfull: QuantityUnit = 'handfull';

//const breakfast: RecipeCategory = 'Breakfast';
const lunch: RecipeCategory = 'Lunch';
const dinner: RecipeCategory = 'Dinner';
const snack: RecipeCategory = 'Dessert'; // Using Dessert as Snack category
const dessert: RecipeCategory = 'Dessert';

// Aliases
const cups: QuantityUnit = cup; // Alias for cup
const lbs: QuantityUnit = lb; // Alias for lb
const teaspoon: QuantityUnit = tsp; // Alias for tsp
const tablespoons: QuantityUnit = tbsp; // Alias for tbsp
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

const simpleSteps = (s: string[], s0?: string): Steps[] => (
  [{ step0: s0, steps: s }]
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
      searchTerms: ['grill', 'grilled', 'grilled spaghetti', 'spaghetti'],
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
        'In blender mixing bowl on medium speed, blend lard-butter mix, sugar, vanilla, and eggs until light and fluffy. ish.',
        'Add flour-mix bit-by-bit on low speed until combined.',
        'Refrigerate for 1 hour (or overnight) before rolling out.',
        'Decorate with sprinkles (NOT ICING!)',
        'Bake at 375° for 4 mins (more likely 8 mins) until edges just barely brown.'
        +' --Baking Tip! You want to pull them just before they are done, they will continue to cook on the tray.--',
        'Do NOT eat yet! These should be fully cooled, probably overnight, before eating. They are optimized for the season.',
      ]
    })
  },
  { // Leslie's Thumbprint Cookies
    ...simpleRecipe({
      title: 'Leslie\'s Thumbprint Cookies',
      category: dessert,
      seasons: [winter],
      ingredients: [
        ing(1, cup, 'unsalted butter', 'room temperature'),
        ing(0.5, cup, 'granulated sugar'),
        ing(1, tsp, 'vanilla extract'),
        ing(1/4, tsp, 'salt'),
        ing(2, cup, 'all-purpose flour'),
        ing(1, cup, 'finely chopped nuts', 'optional; almonds, walnuts, pecans, or even pistachios work well'),
        ing(3/4, cup, 'jam', 'I typically do raspberry or apricot'),
      ],
      steps: [
        'Beat the butter and sugar on high speed with a mixer for about three minutes, until it is well combined.',
        'Separate the eggs. Add the yolks and vanilla extract to the butter mixture. Set aside the egg whites in a separate shallow bowl.',
        'Add the flour and salt to the mixing bowl, and mix until just combined.',
        'Place the dough in the fridge and chill for at least 30 minutes.',
        'Preheat the oven to 350 degrees.',
        'Roll dough into balls about 1 inch wide. Place on a cookie sheet a few inches apart.',
        '6a. If using nuts, whisk the reserved egg whites until frothy. Dip the dough balls into the egg whites and roll in the nuts until covered. Arrange them on the baking sheet as usual.',
        'Press down on each ball of dough with your thumb to make a small well in the center of the cookie. Don’t press too hard or the dough will crack. Fill each well with about ½ teaspoon of jam (or whatever looks right).',
        'Bake for 12 to 15 minutes or until slightly firm.',
      ]
    })
  },
  { // Grandma Fern's Snickerdoodles
    title: 'Grandma Fern\'s Snickerdoodles',
    category: dessert,
    seasons: [winter],
    ingredientsLists: [
      {
        ingredients: [
          ing(1 + 1/2, cup, 'sugar'),
          ing(1, cup, 'butter', 'very soft but not liquid'),
          ing(2, null, 'eggs'),
          ing(2 + 3/4, cup, 'flour', '375g'),
          ing(1, tsp, 'baking soda'),
          ing(1/4, tsp, 'salt'),
          ing(2, tsp, 'cream of tartar'),
        ]
      },
      { // For rolling
        title: 'Cinnamon sugar, For Rolling',
        ingredients: [
          ing(3, tbsp, 'sugar'),
          ing(3, tsp, 'cinnamon'),
        ]
      }
    ],
    stepsLists: simpleSteps(
      [
        'Cream together sugar and butter',
        'Add eggs and mix well',
        'In separate bowl, mix dry ingredients (flour, baking soda, salt, cream of tartar)',
        'Add dry ingredients to wet, in two or three additions',
        'Chill dough for at least 30 min',
        'Roll dough into balls approx 1.5”',
        'Roll balls in cinnamon/sugar mixture',
        'Bake on ungreased cookie sheet at 400° for 9 minutes',
        'Let cool on rack and enjoy ❤️',
      ],
      'This makes a pretty stiff dough so is best done with an electric mixer.',
    )
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
    searchTerms: ['yakitori', 'miso ranch', 'miso dip', 'grill', 'grilled', 'grilled chicken'],
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
  },
  { // Muddy Buddies
    ...simpleRecipe({
      title: 'Muddy Buddies',
      category: snack,
      searchTerms: ['puppy chow', 'chocolate chex'],
      seasons: [...yearround],
      ingredients: [
        ing(1, null, 'box chex', 'family size; any flavor, we like rice'),
        ing(2, cup, 'hershey milk chocolate chips', 'that\'s the whole bag'),
        ing(1, cup, 'peanut butter'),
        ing(1/2, cup, 'butter'),
        ing(1, tsp, 'vanilla extract'),
        ing(1, cup, 'powdered sugar per bag', 
          'This is impossible to get right. I have measured so many times, and each time it is a different amount.'
          +' Space and Time do not apply to powdered sugar. Just add it until it looks right. Start with 1 cup.'),
      ],
      steps: [
        'Microwave chocolate, butter, and peanut butter until they can be stirred smooth.',
        'Add vanilla and stir!',
        'Pour Chex into giant bowl.',
        'Stir an absolute truckload. Seriously keep stirring.',
        'Put powdered sugar into each bag, zip, shake shake shake!',
      ]
    })
  },
  { // Chili Lime Chicken
    ...simpleRecipe({
      title: 'Chili Lime Chicken',
      category: dinner,
      seasons: [summer, fall],
      ingredients: [
        ing(2, lbs, 'chicken thighs'),
        ing(2, tbsp, 'butter'),
        ing(3, tsp, 'chili powder'),
        ing(1, tsp, 'paprika'),
        ing(1, tsp, 'garlic powder'),
        ing(1, tsp, 'pleasoning'),
        ing(1/8, tsp, 'cayenne'),
        ing(0, null, 'salt & pepper'),
        ing(1, null, 'lime juice (one lime’s worth)', 'optional'),
        ing(1, null, 'cilantro'),
        ing(1, cup, 'white rice'),
        ing(2.25, cup, 'chicken broth'),
      ],
      steps: [
        'Mix all spices excluding cilantro.',
        'Put ¼ spice in bowl, then add chicken, then add ¼ more spice to bowl.',
        'Mix until chicken is coated.',
        'Pan fry that chicken.',
        'Remove chicken, add broth, lime juice, and rice, then mix.',
        'After mixed, add rest of seasoning.',
        'Place chicken on rice, lid on pan, and let cook for 15 minutes. ',
        'Top with cilantro and a teeny bit more lime juice. Enjoy!',
      ]
    })
  },
  { // Desert
    ...simpleRecipe({
      title: 'Desert',
      category: 'Desert',
      seasons: [summer],
      ingredients: [
        ing(1000, gal, 'sand'),
      ],
      steps: [
        'Go to desert.',
        'Look at sand.',
        'Maybe build a sandcastle if you\'re into that kind of thing.',
        'Leave.',
      ]
    })
  },
  { // Stuffed Acorn Squash
    ...simpleRecipe({
      title: 'Stuffed Acorn Squash',
      subtitle: 'with Apple, Parsnip, and Sage',
      category: dinner,
      seasons: [autumn],
      ingredients: [
        ing(3, null, 'small acorn squash'),
        ing(1, tbsp, 'olive oil'),
        ing(1, tbsp, 'maple syrup'),
        ing(0, null, 'salt & pepper'),
        ing(1, cup, 'Italian sausage'),
        ing(2, tbsp, 'olive oil'),
        ing(2, cup, 'peeled and diced parsnips'),
        ing(1/2, null, 'onion', 'diced'),
        ing(1, cup, 'apple (like gala)', 'diced'),
        ing(2, tbsp, 'sage', 'chopped'),
        ing(0, null, 'salt & pepper'),
        ing(1, splash, 'white wine'),
        ing(2, cup, 'chopped kale'),
        ing(1/2, cup, 'maple pecans (or toasted)'),
        ing(1, tbsp, 'maple syrup'),
        ing(0, null, 'fresh grated nutmeg'),
      ],
      steps: [
        'Preheat to 400° F.',
        'Cut acorn squash lengthwise, scoop out seeds.',
        'Mix 1 tbsp maple and 1 tbsp olive oil.',
        'Brush insides with the mix. Sprinkle with salt.',
        'Place skin-side up on baking sheet, roast in oven for 30-40 mins until you can pierce skin and flesh with fork. Then remove, turn back over.',
        'While roasting, brown Italian sausage.',
        'Oven to 350° F.',
        'Sauté parsnips and onions in olive oil (10 min).',
        'Add apples, kale, and sage for 5 mins.',
        'Splash with white wine, add pecans.',
        'When wine evaporates, add 1 tbsp maple.',
        'Add sausage back in, mix, add nutmeg.',
        'Fill squash with mixture, oven for 15-20 mins.',
      ]
    })
  },
  { // Easy Paella
    title: 'Easy Paella',
    subtitle: 'Well, relatively easy',
    category: dinner,
    seasons: [],
    ingredientsLists: [
      {
        title: 'Marinade',
        ingredients: [
          ing(2, tbsp, 'olive oil'),
          ing(1, tbsp, 'ground paprika'),
          ing(2, tsp, 'dried oregano'),
          ing(0, null, 'salt and pepper'),
        ]
      },
      {
        title: 'Paella',
        ingredients: [
          ing(2, lbs, 'boneless, skinless, chicken thighs'),
          ing(2, tbsp, 'olive oil', 'divided'),
          ing(3, null, 'cloves garlic', 'crushed (or, like, just minced)'),
          ing(1, tsp, 'crushed red pepper flakes'),
          ing(2, cup, 'uncooked short-grain white rice'),
          ing(1, pinch, 'saffron threads/2 pinch tumeric'),
          ing(1, null, 'large bay leaf'),
          ing(1/2, bunch, 'Italian flat leaf parsley', 'chopped'),
          ing(1, quart, 'chicken stock'),
          ing(2, null, 'medium lemons', 'zested'),
          ing(2, tbsp, 'olive oil'),
          ing(1, null, 'Spanish onion', 'chopped'),
          ing(1, null, 'red bell pepper', 'coarsely chopped'),
          ing(1, lbs, 'shrimp', 'peeled and deveined'),
          ing(1, lbs, 'chorizo sausage', 'casings removed and crumbled')
        ]
      }
    ],
    stepsLists: [
      {
        title: 'Prep Chicken',
        steps: [
          'Mix marinade into glass bowl.',
          'Add and mix chicken, fridge until needed.',
        ]
      },
      {
        title: 'Rice Mixture',
        steps: [
          'Medium heat. 2 tbl olive oil in large skillet/paella pan. Add pepper flakes and rice.',
          'Cook and stir for 3 minutes or less.',
          'Add saffron, bay leafe, parsley, stock, and zest. Stir until well combined and boiling.',
          'Reduce heat to medium-low, cover and let simmer for 20 minutes.',
        ]
      },
      {
        title: 'Meat Mixture',
        steps: [
          'In separate skillet, heat oil over medium heat.',
          'Add ingredients and cook for specified time, stir often while this is happening.',
          'Stir in marinated chicken, 3 min.',
          'Add onion, 5 min.',
          'Add bell pepper and sausage, 5 min.',
          'Add shrimp, 2 min.',
        ]
      },
      {
        title: 'Final Assembly',
        steps: [
          'Spread meat mixture onto rice mixture.',
        ]
      }
    ]
  },
  { // Apple Cider Glazed Chicken
    ...simpleRecipe({
      title: 'Apple Cider Glazed Chicken',
      category: dinner,
      seasons: [autumn],
      ingredients: [
        ing(1, null, 'pack chicken thighs'),
        ing(2, tbsp, 'olive oil'),
        ing(1, cup, 'apple cider'),
        ing(1/4, cup, 'brown sugar'),
        ing(1/2, tsp, 'ground cinnamon'),
        ing(1/4, tsp, 'ground nutmeg'),
        ing(1/4, tsp, 'ground cloves'),
        ing(1, tbsp, 'butter'),
        ing(2, null, 'apples', 'peeled, cored, sliced'),
        ing(1, null, 'onion', 'sliced')
      ],
      steps: [
        'Preheat oven to 375° F. Salt/pepper chicken.',
        'Start by slicing onions and getting them on low heat. Caramelize that shit!',
        'In large ovenproof skillet, heat olive oil over medium-high heat.',
        'Cook chicken for 3-4 minutes per side, until browned. Remove and set aside.',
        'In same skillet, add cider, brown sugar, spices.',
        'Stir to combine, scrape up browned bits of chkn.',
        'Return chicken to skillet, spoon cider mix over.',
        'Oven for 20-25 mins.',
        'While chicken is baking, add sliced apples to the onion sauté, 5-7 mins.',
        'Serve!',
      ]
    })
  },
  { // Amena Cookies
    ...simpleRecipe({
      title: 'Amena Cookies',
      category: dessert,
      seasons: [summer],
      ingredients: [
        ing(1/2, cup, 'unsalted butter'),
        ing(1/2, cup, 'white sugar'),
        ing(1/4, cup, 'packed light brown sugar'),
        ing(1, null, 'large egg'),
        ing(1/2, tsp, 'vanilla extract'),
        ing(1+1/8, cup, 'all-purpose flour'),
        ing(1/2, tsp, 'salt'),
        ing(1/2, tsp, 'baking soda'),
        ing(1/3, cup, 'semi-sweet chocolate chips'),
        ing(1/3, cup, 'white chocolate chips'),
        ing(1/3, cup, 'milk chocolate chips'),
      ],
      steps: [
        'Mash butter and sugars in large bowl until creamy smooth.',
        'Add egg and whisk vigorously.',
        'In separate bowl, whisk flour, salt, baking soda.',
        'Use mixer to dump flour mix into mash.',
        'Add chocolate chips bit by bit.',
        'Preheat oven 375° F.',
        'Cookies in oven for 10 mins.',
      ]
    })
  },
  { // Aussie Bites
    title: 'Aussie Bites',
    category: dessert,
    seasons: [spring, summer],
    ingredientsLists: [
      { // Stage 1
        title: 'Stage 1',
        ingredients: [
          ing(1+3/4, cup, 'old fashioned rolled oats')
        ]
      },
      { // Stage 2
        title: 'Stage 2',
        ingredients: [
          ing(1/4, cup, 'granulated sugar'),
          ing(1/4, cup, 'chopped dried apricots'),
          ing(1/4, cup, 'raisins'),
          ing(1/4, cup, 'ground flaxseed'),
          ing(1/4, cup, 'unsalted sunflower seeds'),
          ing(1/4, cup, 'unsweetened shredded coconut'),
          ing(1/4, cup, 'quinoa; cooked or uncooked'),
          ing(2, tbsp, 'chia seeds'),
          ing(1/4, tsp, 'baking soda')
        ]
      },
      { // Stage 3
        title: 'Stage 3',
        ingredients: [
          ing(1/4, cup, 'honey'),
          ing(1/4, cup, 'unsalted butter; melted'),
          ing(1/4, cup, 'canola oil', 'not choosing canola really changes the structure, but other neutral oils will work'),
          ing(1/2, tsp, 'vanilla extract')
        ]
      }
    ],
    stepsLists: simpleSteps([
      'Preheat oven to 350° F.',
      'Lightly grease a 24 count mini muffin pan.',
      'Put 1 cup oats in food processor and pulverize. Original recipe says a minute, but hell no that’s way too long.',
      'Add stage 2 stuff and pulse until apricots are in small bits.',
      'Add stage 3 and pulse until combined.',
      'Divide into muffin cups.',
      'Bake in oven for 10-12 mins until golden brown.',
      'Let cool until firm.',
      'Once cooled, put them in airtight container for 4-5 days. Unless you can’t wait that long then wait like a day instead.',
    ])
  },
  { // Delux Breakfast Burgers
    ...simpleRecipe({
      title: 'Delux Breakfast Burgers',
      category: lunch,
      seasons: [summer],
      ingredients: [
        ing(0, null, '90% or 80% lean beef'),
        ing(0, null, 'ground breakfast sausage'),
        ing(0, null, 'onion'),
        ing(0, null, 'lettuce'),
        ing(0, null, 'egg'),
        ing(0, null, 'maple syrup'),
        ing(0, null, 'swiss cheese (though there are probably other great options to try)'),
        ing(0, null, 'Burger Buns.')
      ],
      steps: [
        'Start with onion, caramelize it low and slow on a thin layer of oil (I just used vegetable).',
        'Brush inside of buns with a light layer of the oil.',
        'Hand mix the beef and sausage together. Last time I used 90%, but I’m thinking I should have used 80%. Once mixed, shape into patties.',
        'Prep maple sauce. Maple syrup and a bit of water, heat and mix a bit. Amounts have been eyeballed so far.',
        'Add a bit of the sauce to the onions.',
        'Get grill heated up. Grill patties over fairly high heat, drop buns on a lower heat.',
        'Buns come off pretty quick, set aside with lettuce on bottom bun. While patties are searing, pour a bit of the sauce on the patties.',
        'When ready, flip and add cheese.',
        'Cook eggs to have runny yolk.',
        'Put patty on lettuce/bun, then egg, then onion.',
        'Top burger with just a touch of the maple sauce before adding the top bun.',
      ]
    })
  },
  { // Nanaimo Bars
    title: 'Nanaimo Bars',
    category: dessert,
    seasons: [spring, winter],
    description: 'A Canadian classic, these no-bake bars are rich, chocolatey, and perfect for any occasion.',
    ingredientsLists: [
      { // Top Layer
        title: 'Top Layer',
        ingredients: [
          ing(2, tsp, 'butter'),
          ing(4, oz, 'semisweet baker’s chocolate')
        ]
      },
      { // Mid Layer
        title: 'Mid Layer',
        ingredients: [
          ing(1/2, cup, 'softened butter'),
          ing(3, tbsp, 'heavy cream'),
          ing(2, tbsp, 'custard powder'),
          ing(2, cup, 'confectioner’s sugar')
        ]
      },
      { // Bottom Layer
        title: 'Bottom Layer',
        ingredients: [
          ing(1/2, cup, 'butter'),
          ing(1/4, cup, 'white sugar'),
          ing(5, tbsp, 'cocoa powder'),
          ing(1, null, 'egg'),
          ing(1.75, cup, 'graham cracker crumbs'),
          ing(1, cup, 'flaked coconut'),
          ing(.5, cup, 'chopped almonds', 'optional')
        ]
      }
    ],
    stepsLists: [
      { // Bottom Layer
        title: 'Bottom Layer',
        steps: [
          'In double boiler, melt butter, cocoa, and sugar',
          'Stir ‘til melted. Beat in egg until thick (2-3 min)',
          'Remove from heat, add the rest of the bottom.',
          'Press very firmly into 8x8 inch pan.',
          'Chill to set.',
        ]
      },
      { // Mid Layer
        title: 'Mid Layer',
        steps: [
          'Mix butter, heavy cream, and custard until light and fluffy.',
          'Spread over bottom layer. Chill to set (again).'
        ]
      },
      { // Top Layer
        title: 'Top Layer',
        steps: [
          'Mix chocolate and butter in microwave (???).',
          'You almost definitely need extra chocolate.',
          'Pour over top. Tap tap tap until even!',
          'Let set in fridge (again (again)).',
        ]
      }
    ]
  },
  { // Firecracker Shrimp Roll with Crab Aioli
    title: 'Firecracker Shrimp Roll',
    subtitle: 'with Crab Aioli',
    category: lunch,
    seasons: [summer],
    ingredientsLists: [
      {
        ingredients: [
          ing(4, null, 'soft sandwich rolls, split and toasted'),
          ing(2, cup, 'thinly sliced romaine lettuce'),
          ing(2, lb, 'shrimp', 'peeled and deveined'),
        ]
      },
      {
        title: 'Soak',
        ingredients: [
          ing(1, cup, 'buttermilk'),
          ing(2, tsp, 'hot sauce'),
          ing(1, tsp, 'chipotle pepper'),
          ing(1, tsp, 'cayenne'),
          ing(1, tsp, 'pepper'),
          ing(2, tsp, 'salt'),
        ]
      },
      {
        title: 'Breading',
        ingredients: [
          ing(1, cup, 'all-purpose flour'),
          ing(1/3, cup, 'corn meal'),
          ing(2, tsp, 'paprika'),
          ing(2, tsp, 'salt')
        ]
      },
      {
        title: 'Crab Aioli',
        ingredients: [
          ing(1, cup, 'mayonnaise'),
          ing(1, cup, 'lump crabmeat'),
          ing(2, clove, 'garlic', 'finely crushed'),
          ing(1/4, tsp, 'Worcestershire sauce'),
          ing(1, tsp, 'lemon juice'),
          ing(1, tbsp, 'chopped tarragon'),
          ing(0, null, 'salt and cayenne'),
        ]
      }
    ],
    stepsLists: simpleSteps([
      'Add all the Crab Aioli stuff to bowl and mix.',
      'Pop into fridge until needed.',
      'Mix the soak ingredients and whisk.',
      'Mix the breading materials in new bowl.',
      'Transfer shrimp to soak for 5 mins.',
      'Spread crab Aioli *generously* on bread, add lettuce.',
      'Transfer shrimp to breading, toss.',
      'Put into pan with oil on med-high heat.',
      'Put on paper towel lined plate, then to sandwich roll immediately.',
    ])
  },
  { // Chorizo Pumpkin Pasta
    ...simpleRecipe({
      title: 'Chorizo Pumpkin Pasta',
      subtitle: 'with Sage and Parmesan',
      category: dinner,
      seasons: [fall],
      ingredients: [
        ing(3, cup, 'uncooked spiral pasta', '12 oz'),
        ing(12, oz, 'fullcook chorizo chicken sausage'),
        ing(1, cup, 'canned pumpkin'),
        ing(1, cup, 'half-and-half cream'),
        ing(3/4, tsp, 'salt'),
        ing(1/4, tsp, 'pepper'),
        ing(1.5, cup, 'shredded Manchego OR Monterey jack cheese')
      ],
      steps: [
        'Cook pasta, drain, reserve ¾ cup water.',
        'In large skillet, sauté sausage until light brown.',
        'Reduce heat to med-low.',
        'Add pumpkin, cream, salt, pepper.',
        'Cook and stir until heated through.',
        'Toss in pasta and enough water to moisten.',
        'Stir in cheese.',
      ]
    })
  },
  { // Truffle Gnocchi
    ...simpleRecipe({
      title: 'Truffle Gnocchi',
      category: dinner,
      seasons: [autumn, winter],
      ingredients: [
        ing(32, oz, 'gnocchi'),
        ing(2, tbsp, 'truffle butter'),
        ing(1, tbsp, 'butter'),
        ing(3, tbsp, 'all-purpose flour'),
        ing(2, cup, 'whole milk'),
        ing(1.5, cup, 'Wisconsin Swiss cheese'),
        ing(1, cup, 'Wisconsin white cheddar'),
        ing(.5, cup, 'Wisconsin parmesean'),
        ing(2, tbsp, 'Wisconsin parmesean'),
        ing(1, tsp, 'ground white pepper'),
        ing(1/4, cup, 'italian bread crumbs'),
        ing(1, clove, 'garlic')
      ],
      steps: [
        'Oven to 375°',
        'Cook gnocchi as says package.',
        'Separate a small bit of truffle butter from the 2 tbl. ',
        'Melt rest of 2 tbl truffle and 1 tbl regular butter in oven proof pan.',
        'Whisk in flour for ~3 mins.',
        'Whisk in milk for 5-10 mins.',
        'Melt extra trutter into bread crumbs.',
        'Mix with 2 tbl parmesan and garlic in food processor. Set aside.',
        'Add remaining cheeses to sauce. Stir.',
        'Add salt and white pepper.',
        'Add drained gnocchi and stir.',
        'Oven for 10-15 mins.',
        'Torch cheese?',
        'Into bowl, some breadcrumb topping.',
      ]
    })
  },
  { // Bavarian Apple-Sausage Hash
    ...simpleRecipe({
      title: 'Bavarian Apple-Sausage Hash',
      category: dinner,
      seasons: [autumn],
      ingredients: [
        ing(2, tbsp, 'canola oil'),
        ing(1/2, cup, 'onion', 'chopped'),
        ing(4, null, 'fully cooked apple chicken sausages'),
        ing( 1.5, cup, 'brussel sprouts', 'thinly sliced'),
        ing(1, null, 'large tart apple, peeled and chopped', 'like Granny Smith'),
        ing(1, tsp, 'caraway seeds'),
        ing(1/4, tsp, 'salt'),
        ing(1/4, tsp, 'pepper'),
        ing(2, tbsp, 'finely chopped walnuts', 'to crunch preference'),
        ing(1, tbsp, 'brown sugar'),
        ing(1, tbsp, 'whole grain mustard'),
        ing(1, tbsp, 'cider vinegar'),
      ],
      steps: [
        'In large skillet, heat oil on med-high, sauté onion.',
        'Add sausages, brussel sprouts, apple, and seasonings. Sauté until lightly browned, 6-8 min.',
        'Stir in walnuts, brown sugar, mustard, and vinegar. Cook and stir for 2 mins.',
      ]
    })
  },
  { // Turkey and Biscuit Stew
    ...simpleRecipe({
      title: 'Turkey and Biscuit Stew',
      category: dinner,
      seasons: [autumn, winter],
      ingredients: [
        ing(2, cups, 'cooked turkey'),
        ing(1/3, cup, 'chopped onion'),
        ing(1/4, cup, 'butter', 'cubed'),
        ing(1/3, cup, 'all-purpose flour'),
        ing(1/2, tsp, 'salt'),
        ing(1/8, tsp, 'pepper'),
        ing(1.25, cup, 'chicken broth'),
        ing(3/4, cup, 'whole milk'),
        ing(1, cup, 'cooked peas'),
        ing(1, cup, 'sliced baby carrots'),
        ing(4, null, 'refrigerated buttermilk biscuit doughs'),
      ],
      steps: [
        'Preheat oven to 375°F.',
        'Cube turkey, cook if not already.',
        'Sauté onion in butter until tender.',
        'Stir in flour, salt, pepper, until blended.',
        'Gradually add broth and milk.',
        'Cook about 2 mins, until thickened and bubbly.',
        'Add turkey, peas, and carrots. Heat.',
        'Arrange biscuits over stew.',
        'Bake in oven for 20-25 min.',
      ]
    })
  },
  { // WIP Nic's Custom Beef Ramen
    ...simpleRecipe({
      title: 'WIP Nic\'s Custom Beef Ramen',
      category: dinner,
      seasons: [fall, winter],
      ingredients: [
        ing(2, null, 'beef cut boys'),
        ing(1/2, null, 'box noodles'),
        ing(1, null, 'beef broth'),
        ing(2, null, 'eggs'),
        ing(0, null, 'celery', 'sliced thin'),
        ing(0, null, 'carrots', 'sliced thin'),
        ing(0, null, 'green onion'),
      ],
      steps: [
        'Salt and pepper beef',
        'Sear beef in pan',

        'Put noodles in beef broth and bring to a boil',

        'Eggies into water. Boil until medium-boiled eggs.',

        'When noodles are nearing done, slice up the beef and put in with noodles.',

        'Green onion atop'
      ]
    })
  },
  { // No Bake Peanut Butter Bars
    ...simpleRecipe({
      title: 'No Bake Peanut Butter Bars',
      category: dessert,
      seasons: [],
      ingredients: [
        ing(3/4, cup, 'almond flour'),
        ing(4, tbsp, 'butter'),
        ing(1/4, cup, 'powdered sugar'),
        ing(1/2, cup, 'peanut butter'),
        ing(1/2, tsp, 'vanilla'),
        ing(1/2, cup, 'sugar-free chocolate chips'),
      ],
      steps: [
        'Mix all except chocolate chips.',
        'Layer flat into roughly 6” pan.',
        'Refrigerate mix for about 15 min.',
        'Melt chocolate in microwave.',
        'Pour chocolate over chilled peanut butter mix.',
        'Chill in fridge for an hour.',
      ]
    })
  },
  { // Snack Sandwich
    ...simpleRecipe({
      title: 'Snack Sandwich',
      category: snack,
      seasons: [],
      ingredients: [
        ing(1, null, 'egg'),
        ing(3, 'slices', 'white bread'),
        ing([2, 4], slices, 'american cheese'),
        ing([2, 4], slices, 'ham'),
        ing(0, null, 'dijon mustard'),
        ing(0, null, 'raspberry jam')
      ],
      steps: [
        'White bread',
        'Layer american cheese and ham',
        'White bread with rasp jam',
        'Layer american cheese and ham',
        'Remove crust, square up sandwich.',
        'Whisk egg into bowl.',
        'Completely coat sandwich in egg.',
        'Pan fry on all sides until egg is done.'
      ]
    })
  },
  { // Warming Gnocchi
    ...simpleRecipe({
      title: 'Warming Gnocchi',
      subtitle: 'with Spinach and Chicken',
      category: dinner,
      seasons: [winter],
      ingredients: [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ing(1, 'package (16 oz)', 'potato gnocchi'),
        ing(2, tbsp, 'olive oil'),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ing(1, 'package (12 oz)', '(12 oz) fully cooked italian chicken sausage links, halved and sliced.'),
        ing(2, null, 'shallots finely chopped'),
        ing(2, null, 'garlic cloves, minced'),
        ing(1, cup, 'white wine or chicken broth'),
        ing(1, tbsp, 'cornstarch'),
        ing(1/2, cup, 'chicken broth'),
        ing(3, cups, 'fresh baby spinach'),
        ing(1/4, cup, 'shredded parmesan cheese'),
      ],
      steps: [
        'Cook gnocchi according to package directions.',
        'In large skillet, heat oil over med-high.',
        'Cook sausage/shallots until sausage is browned.',
        'Add garlic, cook 1 min longer.',
        'Stir in wine, bring to boil. Cook until liquid reduced by half, 3-4 mins.',
        'In small bowl, mix cornstarch and broth until smooth. Stir into sausage mixture.',
        'Return to boil, stirring constantly until thickened. About 1-2 min.',
        'Add spinach + cheese (and a dab of cream?), cook until spinach wilts.',
        'Drain gnocchi, add to pan and heat through.',
        'Serve!'
        ]
    })
  },
  { // Honey Butter Chicken
    ...simpleRecipe({
      title: 'Honey Butter Chicken',
      category: dinner,
      seasons: [fall, winter],
      ingredients: [
        ing(0, null, 'boneless skinless chicken thighs'),
        ing(1, tsp, 'olive oil'),
        ing(2, tbsp, 'butter'),
        ing(2.5, tbsp, 'honey'),
        ing(1.5, tbsp, 'cider vinegar'),
        ing(1, null, 'garlic clove'),
        saltAndPepper,
      ],
      steps: [
        'Oil and half butter into pan on high heat.',
        'Cube chicken. Into drying pan.',
        'Add garlic.',
        'Cook chicken through.',
        'Add the rest.',
        'Add some spice as desired. (celery salt)'
      ]
    })
  },
  { // Korea Beef-a Bowl
    ...simpleRecipe({
      title: 'Korea Beef-a Bowl',
      category: dinner,
      seasons: [...allSeasons],
      ingredients: [
        ing(1, lb, 'ground beef', '90% lean'),
        saltAndPepper,
        ing(3, null, 'garlic cloves, minced'),
        ing(1/4, cup, 'brown sugar'),
        ing(1/4, cup, 'soy sauce'),
        ing(2, tsp, 'sesame oil'),
        ing(1/4, tsp, 'ground ginger'),
        ing(1/4, tsp, 'crushed red pepper flakes'),
        ing(0, null, 'green onions'),
        ing(0, null, 'sesame seeds'),
      ],
      steps: [
        'Crumble beef into skillet.',
        'Add a tiny bit salt.',
        'Mix brown sugar, soy, ginger, sesame oil, red pepper, pepper in bowl.',
        'Cook beef until browned.',
        'Poor mix over beef.',
        'Simmer 1-2 minutes.',
        'Slice green onions.',
        'Serve on top of rice in GODDAMN BOWL.',
        'Garnish with green onion.',
        'Garnish with sesame seeds.'
      ]
    })
  },
  { // No-Fork Burrito
    ...simpleRecipe({
      title: 'No-Fork Burrito',
      category: lunch,
      seasons: [],
      ingredients: [
        ing(1, lb, 'sausage'),
        ing(1/2, cup, 'green onions'),
        ing(1/2, null, 'red bell pepper', 'diced'),
        ing(1/2, null, 'poblano chili'),
        ing(4, oz, 'cream cheese'),
        ing(8, oz, 'Monterey Jack & Sharp Cheddar'),
        ing(0, null, 'Southwest sweet and smoky'),
        ing(0, null, 'Paprika'),
        ing(0, null, 'Ground Mustard'),
      ],
      steps: [
        'Brown meat.',
        'Mix in veggies until softened.',
        'Put cheeses in bowl with meat.',
        'Mix until cheese is thoroughly melted and integrated.',
        'Back into pan for more cooking.',
        'Add spices to taste.',
        'Put under broiler for 3 mins.',
        'Scoop into tortilla, wrap.'
      ]
    })
  },
  // { // Super hardy beef and root vegetable stew
  //   title: "Super Hardy Beef and Root Vegetable Stew",
  //   category: dinner,
  //   seasons: [winter],
  //   description: "A rich and hearty stew perfect for cold days, packed with tender beef and a medley of root vegetables.",
  //   ingredientsLists: [
  //     {
  //       title: "For the beef",
  //       ingredients: [
  //         ing(2, lbs, 'beef chuck, cut into 1.5-inch cubes'),
  //         ing(2, tbsp, "all-purpose flour"),
  //         ing(1, tsp, "salt"),
  //         ing(1/2, tsp, "black pepper"),
  //         ing(2, tbsp, "olive oil or vegetable oil"),
  //       ]
  //     },
  //     {
  //       title: "For the stew",
  //       ingredients: [
  //         ing(1, null, "large onion, diced"),
  //         ing(3, null, "garlic cloves, minced"),
  //         ing(2, tbsp, "tomato paste"),
  //         ing(1, cup, "dry red wine (optional; substitute with more broth if preferred)"),
  //         ing(4, cups, "beef broth"),
  //         ing(1, tbsp, "Worcestershire sauce"),
  //         ing(1, tsp, "smoked paprika (optional but recommended for depth)"),
  //         ing(2, null, "bay leaves"),
  //         ing(1, tsp, "dried thyme (or 2-3 sprigs fresh thyme)"),
  //         ing(1, tsp, "dried rosemary (or 1 sprig fresh rosemary"),
  //       ]
  //     },
  //     {
  //       title: "Vegetables",
  //       ingredients: [
  //         ing(3, null, "large carrots, peeled and cut into 1-inch chunks"),
  //         ing(2, null, "large potatoes, peeled and cut into 1-inch chunks"),
  //         ing(2, null, "parsnips or turnips, peeled and cut into 1-inch chunks"),
  //         ing(1, cup, "frozen peas", "added at the end for sweetness"),
  //       ]
  //     }
  //   ],
  //   stepsLists: [
  //     {
  //       title: "Prepare the beef",
  //       steps: [
  //         "In a large bowl, toss the beef cubes with flour, salt, and pepper until evenly coated.",
  //         "Heat the oil in a large heavy-bottomed pot or Dutch oven over medium-high heat.",
  //         "Sear the beef in batches (don’t overcrowd the pan) until browned on all sides, about 2-3 minutes per batch. Remove and set aside.",
  //       ]
  //     },
  //     {
  //       title: "Build the base",
  //       steps: [
  //         "Lower the heat to medium. Add a little more oil if needed, then sauté the onions for 4-5 minutes, until softened.",
  //         "Stir in the garlic and tomato paste, cooking for another minute until fragrant.",
  //         "Deglaze the pot with red wine (if using), scraping up the browned bits on the bottom. Let the wine simmer for 2 minutes to reduce slightly.",
  //         "Simmer the stew:",
  //         "Return the beef to the pot, along with the beef broth, Worcestershire sauce, smoked paprika, bay leaves, thyme, and rosemary.",
  //         "Bring to a gentle boil, then reduce the heat to low. Cover and simmer for 1 hour, stirring occasionally.",
  //       ]
  //     },
  //     {
  //       title: "Add the vegetables",
  //       steps: [
  //         "Add the carrots, potatoes, and parsnips/turnips to the pot. Stir to combine, then cover and simmer for another 45 minutes, or until the beef and vegetables are tender.",
  //         "Finish and serve:",
  //         "Stir in the frozen peas and cook for another 5 minutes.",
  //         "Remove the bay leaves and herb sprigs. Taste and adjust seasoning with salt and pepper.",
  //         "Serve hot with crusty bread or over buttery mashed potatoes for an extra-hearty meal.",
  //       ]
  //     },
  //     {
  //       title: "Tips and Variations",
  //       steps: [
  //         "For extra richness: Stir in 1-2 tbsp of butter or a splash of heavy cream at the end.",
  //         "Make it even heartier: Add mushrooms, pearl onions, or chunks of celery.",
  //         "For a thicker stew: Remove 1 cup of the broth, blend with some of the vegetables, and stir back into the pot. Alternatively, make a quick cornstarch slurry (1 tbsp cornstarch + 2 tbsp water) and stir it in during the last 5 minutes of cooking.",
  //         "This stew is hearty, comforting, and packed with deep, rich flavors to warm you up on a cold winter day. Enjoy! 🥣",
  //       ]
  //     }
  //   ]
  // },
  { // Korean-Inspired Beef Stew
    ...simpleRecipe({
      title: 'Korean-Inspired Beef Stew',
      category: dinner,
      seasons: [winter],
      ingredients: [
        ing(1.5, lbs, 'beef stew meat'),
        ing(1, null, 'medium onion, sliced'),
        ing(3, cups, 'beef broth'),
        ing(2, null, 'medium Yukon Gold potatoes, cubed'),
        ing([1, 2], null, 'medium carrots, sliced'),
        ing([3, 4], null, 'cloves garlic, minced'),
        ing([2, 3], tbsp, 'soy sauce'),
        ing(1, tbsp, 'sesame oil'),
        ing([1, 2], tbsp, 'sriracha (adjust for heat preference)'),
        ing(1, tbsp, 'sugar or honey'),
        ing(1, tsp, 'grated ginger (optional)'),
        ing(1, tbsp, 'cornstarch mixed with 2 tbsp water', 'optional, for thickening'),
        ing([1, 2], null, 'green onions, chopped', 'for garnish'),
        ing(0, null, "Sesame seeds", "for garnish")
      ],
      steps: [
        'Heat sesame oil in a large pot over medium-high heat. Add beef and brown on all sides.',
        'Add garlic and onion, cooking until fragrant (about 2 minutes). Stir in sriracha, soy sauce, and sugar/honey.',
        'Add beef broth, potatoes, and carrots. Bring to a boil, then lower to a simmer and cover. Cook for 1.5-2 hours, until beef is tender.',
        'Stir in the cornstarch slurry during the last 10 minutes if a thicker stew is desired.',
        'Top with green onions and sesame seeds. Optional: serve over steamed rice',
      ]
    })
  },
  { // Boar Hock Stew
    ...simpleRecipe({
      title: 'Boar Hock Stew',
      category: dinner,
      seasons: [winter],
      ingredients: [
        ing(2, lbs, 'pork butt'),
        ing(0, null, 'salt'),
        ing(2, tsp, 'extra-virgin olive oil'),
        ing(3, null, 'large carrots, peeled and chopped'),
        ing(2, null, 'medium yellow onions, chopped'),
        ing(1, null, 'leek'),
        ing(2, null, 'large bay leaves'),
        ing(1, tbsp, 'minced fresh thyme'),
        ing(2, tsp, 'ground fennel'),
        ing(1, tbsp, 'pressed or grated garlic'),
        ing(6, cups, 'low-sodium chicken broth'),
        ing(1.5, lbs, 'yukon gold or all purpose potatoes', 'peeled and chopped into 3/4-inch pieces'),
        ing(1.5, cups, 'cooked, peeled chestnuts', 'coarsly chopped'),
        ing(1.5, tsp, 'sherry vinegar'),
        ing(1/2, cup, 'chopped fresh parsley')
      ],
      steps: [
        'Without cutting it up, sprinkle pork with salt and pepper.',
      'In large pot over medium heat, warm olive oil.',
        'Add pork in single layer and cook, undisturbed, until brown on bottom. 4 min.',
        'Turn pork, cook another 4 minutes. Transfer to large bowl.',
        'Once cool, cut pork into 3/4-inch pieces.',
      'Turn pot to medium-high.',
        'Add carrots, onions, bay leaves, thyme, fennel, and salt.',
        'Cook, scraping the bottom of the pan with wooden spoon until vegetables soften, about 5 mins.',
      'Adjust to medium-low.',
        'Cover, stir occasionally. 6 min.',
        'Scrape bottom of pot again,',
      'Adjust to medium high, add garlic.',
        'Cook, stirring, until fragrant, about 40 sec.',
        'Add chicken broth and reserved pork and any accumulated juices.',
      'Bring to a simmer, reduce to medium-low, cover, let simmer for 40 mins.',
        'And back to medium-high.',
        'Get to strong simmer, add potatoes, leeks, and 1 1/4 cups of chestnuts. Season with salt and pepper.',
        'Would you believe it\'s time for medium-low? Replace lid, simmer for 20 mins.',
        'Remove from heat and let it sit for 30 minutes. Remove bay leaves.',
        'Transfer about 3/4 cup of stew (including potato cubes) to blender, blend smooth (30 sec.).',
        'Scrape smooth mixture and add the vinegar, stir to incorporate.',
        'If needed, re-heat stew before serving.',
        'This shit is delicious on day 2 as well.'
      ]
    })
  },
  { // Stir Fry Japanese BBQ Ramen Noodles
    ...simpleRecipe({
      title: 'Stir Fry Japanese BBQ Ramen Noodles',
      searchTerms: ['stir fry', 'streetfood', 'street food'],
      category: dinner,
      seasons: [],
      ingredients: [
        ing(3, null, 'packages Ramen noodles'),
        ing(3, tbsp, 'tablespoons olive oil (or cooking oil of choice)'),
        ing(1, lbs, 'pound boneless, skinless chicken thighs (optional)'),
        ing(1, null, 'onion diced'),
        {...saltAndPepper},
        ing([6, 7], null, 'cloves garlic minced'),
        ing(1/3, cup, 'Bachan\'s Japanese BBQ sauce (or you can use hoisin sauce)'),
        ing(2, tbsp, 'soy sauce'),
        ing([1, 2], tbsp, 'sriracha'),
        ing(4, tbsp, 'tablespoons butter'),
        ing(1, null, 'bunch green onions'),
        ing(0, null, 'Optional: sesame seeds, more Japanese BBQ sauce, yum yum sauce')
      ],
      steps: [
        'Boil the noodles according to package directions (do not use flavor packet), drain and rinse very well with cold water so they don\'t overcook.',
        'Set a large skillet or wok over medium high heat. Once hot add the olive oil along with the chicken (if using), onion, kosher salt, and pepper. Cook 3 to 4 minutes.',
        'Add the garlic and the cooked noodles, Japanese BBQ sauce (or hoisin sauce), soy sauce, sriracha, and butter.',
        'Cook for 5 to 7 minutes, stirring and pressing the noodles so they become slightly crisp. Add the green onions and cook another 1 to 2 minutes.',
        'Serve with sesame seeds and add more Japanese BBQ sauce and/or yum yum sauce if desired.',
      ]
    })
  },
  { // Baby Ruth Cookies
    ...simpleRecipe({
      title: 'Babe Ruth Cookies',
      category: dessert,
      seasons: [fall],
      ingredients: [
        ing(1/2, cup, 'butter or shortening, softened', 'about 115g'),
        ing(3/4, cup, 'granulated sugar', 'about 150g'),
        ing(1, null, 'large egg'),
        ing(1 + 1/3, cups, 'all purpose flour', 'about 160 g'),
        ing(1/2, tsp, 'baking soda'),
        ing(1/2, tsp, 'salt'),
        ing(1/2, tsp, 'vanilla'),
        ing(2 + 1/2, null, 'regular size Baby Ruth candy bars (about 140 g) cut into small pieces'),
      ],
      steps: [
        'Cream the butter and sugar together until it’s nice and smooth.',
        'Beat in the egg until combined.',
        'Add the flour, baking soda, salt, and vanilla and stir until the dough starts to come together.',
        'Add the Baby Ruth pieces and stir until they’re evenly dispersed and the dough is completely mixed.',
        'Cover and chill the dough in the refrigerator for at least a few hours or as long as a couple of days.',
        'Preheat the oven to 375°F (190°C) and line baking sheets with parchment paper.',
        'If you want to stick to how the original recipe was written, roll half-teaspoon pieces of dough (about 8 grams) into balls and set them an inch (3 cm) apart on the prepared baking sheet. For ones that are closer to the size of the cookies in drawings from the time, divide the dough into 18 equal portions and place on the cookie sheets 2 inches (5 cm) apart.',
        'Bake the cookies for 10 to 12 minutes or until they’re golden brown on top. Let them cool before serving them forth.',
      ]
    })
  },
  { // Super hardy beef and root vegetable stew
    title: "Super Hardy Beef and Root Vegetable Stew",
    category: dinner,
    seasons: [winter],
    description: "A rich and hearty stew perfect for cold days, packed with tender beef and a medley of root vegetables.",
    ingredientsLists: [
      {
        title: "For the beef",
        ingredients: [
          ing(2, lbs, 'beef chuck, cut into 1.5-inch cubes'),
          ing(2, tbsp, "all-purpose flour"),
          ing(1, tsp, "salt"),
          ing(1/2, tsp, "black pepper"),
          ing(2, tbsp, "olive oil or vegetable oil"),
        ]
      },
      {
        title: "For the stew",
        ingredients: [
          ing(1, null, "large onion, diced"),
          ing(3, null, "garlic cloves, minced"),
          ing(2, tbsp, "tomato paste"),
          ing(1, cup, "dry red wine (optional; substitute with more broth if preferred)"),
          ing(4, cups, "beef broth"),
          ing(1, tbsp, "Worcestershire sauce"),
          ing(1, tsp, "smoked paprika (optional but recommended for depth)"),
          ing(2, null, "bay leaves"),
          ing(1, tsp, "dried thyme (or 2-3 sprigs fresh thyme)"),
          ing(1, tsp, "dried rosemary (or 1 sprig fresh rosemary"),
        ]
      },
      {
        title: "Vegetables",
        ingredients: [
          ing(3, null, "large carrots, peeled and cut into 1-inch chunks"),
          ing(2, null, "large potatoes, peeled and cut into 1-inch chunks"),
          ing(2, null, "parsnips or turnips, peeled and cut into 1-inch chunks"),
          ing(1, cup, "frozen peas", "added at the end for sweetness"),
        ]
      }
    ],
    stepsLists: [
      {
        title: "Prepare the beef",
        steps: [
          "In a large bowl, toss the beef cubes with flour, salt, and pepper until evenly coated.",
          "Heat the oil in a large heavy-bottomed pot or Dutch oven over medium-high heat.",
          "Sear the beef in batches (don’t overcrowd the pan) until browned on all sides, about 2-3 minutes per batch. Remove and set aside.",
        ]
      },
      {
        title: "Build the base",
        steps: [
          "Lower the heat to medium. Add a little more oil if needed, then sauté the onions for 4-5 minutes, until softened.",
          "Stir in the garlic and tomato paste, cooking for another minute until fragrant.",
          "Deglaze the pot with red wine (if using), scraping up the browned bits on the bottom. Let the wine simmer for 2 minutes to reduce slightly.",
          "Simmer the stew:",
          "Return the beef to the pot, along with the beef broth, Worcestershire sauce, smoked paprika, bay leaves, thyme, and rosemary.",
          "Bring to a gentle boil, then reduce the heat to low. Cover and simmer for 1 hour, stirring occasionally.",
        ]
      },
      {
        title: "Add the vegetables",
        steps: [
          "Add the carrots, potatoes, and parsnips/turnips to the pot. Stir to combine, then cover and simmer for another 45 minutes, or until the beef and vegetables are tender.",
          "Finish and serve:",
          "Stir in the frozen peas and cook for another 5 minutes.",
          "Remove the bay leaves and herb sprigs. Taste and adjust seasoning with salt and pepper.",
          "Serve hot with crusty bread or over buttery mashed potatoes for an extra-hearty meal.",
        ]
      },
      {
        title: "Tips and Variations",
        steps: [
          "For extra richness: Stir in 1-2 tbsp of butter or a splash of heavy cream at the end.",
          "Make it even heartier: Add mushrooms, pearl onions, or chunks of celery.",
          "For a thicker stew: Remove 1 cup of the broth, blend with some of the vegetables, and stir back into the pot. Alternatively, make a quick cornstarch slurry (1 tbsp cornstarch + 2 tbsp water) and stir it in during the last 5 minutes of cooking.",
          "This stew is hearty, comforting, and packed with deep, rich flavors to warm you up on a cold winter day. Enjoy! 🥣",
        ]
      }
    ]
  },
  { // Pumpkin Spice Cookies
    title: 'Pumpkin Spice Cookies',
    description: 'Soft, chewy pumpkin spice cookies perfect for fall, topped with optional icing for extra sweetness.',
    category: dessert,
    seasons: [fall],
    ingredientsLists: [
      {
        title: "Cookies",
        ingredients: [
          ing(1/2, cup, 'shortening'),
          ing(3/4, cup, 'sugar'),
          ing(1/2, cup, 'canned pumpkin pie mix'),
          ing(1/4, cup, 'molasses'),
          ing(3, cups, 'all-purpose flour'),
          ing(1, teaspoon, 'baking soda'),
          ing(1, teaspoon, 'ground ginger'),
          ing(1, teaspoon, 'ground cinnamon'),
          ing(1/2, teaspoon, 'baking powder'),
          ing(1/2, teaspoon, 'salt'),
        ]
      },
      {
        title: "Icing (If you want to make it)",
        ingredients: [
          ing(4, cups, "confectioners' sugar"),
          ing(1/3, cup, "butter, softened"),
          ing([3, 4], tablespoons, "2% milk"),
          ing(0, null, "Food coloring", "optional"),
        ]
      }
    ],
    stepsLists: [
      {
        title: "Bake the Cookies",
        steps: [
          'Cream shortening and sugar until light and fluffy.',
          'Beat in pumpkin pie mix and molasses. In another bowl, whisk next 6 ingredients; gradually beat into creamed mixture. ',
          'Refrigerate several hours, until firm.',
          'Preheat oven to 375° F.',
          'On a lightly floured surface, roll each portion of dough to 1/4-in. thickness.',
          'Cut with floured 2-1/2-in. pumpkin-shaped cookie cutters. ',
          'Bake until edges are firm, 8-10 minutes.',
          'Remove from pans to wire racks to cool.',
        ]
      },
      {
        title: "Icing",
        steps: [
          'Beat confectioners\' sugar, butter and enough milk to reach spreading consistency.',
          'If desired, tint with food coloring.',
          'Decorate cookies as desired.'
        ]
      }
    ]
  },
  { // Glazed Maple Shortbread Cookies
    title: 'Glazed Maple Shortbread Cookies',
    description: 'Buttery shortbread cookies with a sweet maple glaze, perfect for falltime flavors.',
    category: dessert,
    seasons: [fall],
    ingredientsLists: [
      {
        title: "Cookies",
        ingredients: [
          ing(1, cup, 'softened butter'),
          ing(3/4, cup, 'sugar'),
          ing(3, tbsp, 'cornstarch'),
          ing(1, tsp, 'maple flavoring'),
          ing(1+(3/4), cups, 'all-purpose flour'),
        ]
      },
      {
        title: "Glaze",
        ingredients: [
          ing(3/4, cup, 'confectioners sugar', '+ 1 tbsp'),
          ing(1/3, cup, 'maple syrup'),
        ]
      }
    ],
    stepsLists: [
      {
        title: "Bake the Cookies",
        steps: [
          'beat butter, sugar, and cornstarch.',
          'Beat in flavoring.',
          'Gradually beat in flour.',
          'Flatten dough, fridge for 45 min',
          'Oven to 325° F.',
          'Roll dough about .25 in thick, cookie cut into shapes.',
          'Bake for 20-25 mins.',
          'Mix glaze, cover cookies. Let set.',
        ]
      },
    ]
  },
  { // Toasted Pumpkin Seeds
    ...simpleRecipe({
      title: 'Toasted Pumpkin Seeds',
      category: snack,
      seasons: [autumn],
      ingredients: [
        ing(1, null, 'pumpkin of raw pumpkin seeds'),
      ],
      steps: [
        'Boil the seeds in salted water for 10 minutes.',
        'Drain and pat dry.',
        'Toss with olive oil and salt (and any other seasonings you like).',
        'Spread in single layer on baking sheet.',
        'Bake at 300°F for about 20-40 minutes, stirring occasionally, until golden brown.',
        'Let cool before eating.'
      ]
    })
  },
  { // Garlic Hawaiian Rolls
    ...simpleRecipe({
      title: 'Garlic Hawaiian Rolls',
      category: snack,
      seasons: [summer],
      ingredients: [
        ing(12, null, 'Hawaiian rolls'),
      ],
      steps: [
        'Preheat oven to 350°F (175°C).',
        'Slice the Hawaiian rolls in half horizontally, keeping them connected at the back.',
        'Place the bottom half of the rolls in a baking dish.',
        'Spread a generous layer of garlic butter over the bottom half of the rolls.',
        'Place the top half of the rolls back on top.',
        'Cover the baking dish with aluminum foil.',
        'Bake for 15-20 minutes, until the rolls are warm and the butter has melted into them.',
        'Remove from oven, let cool slightly, then slice and serve.'
      ]
    })
  },
  { // Turkish Chicken Kebabs
    ...simpleRecipe({
      title: 'Turkish Chicken Kebabs',
      category: dinner,
      seasons: [spring, summer],
      ingredients: [
        ing(2, lbs, 'chicken thighs'),
        ing(1, cup, 'whole-milk Greek yogurt'),
        ing(2, tbsp, 'lemon juice'),
        ing(2, tbsp, 'olive oil'),
        ing(2, tbsp, 'ketchup'),
        ing(6, null, 'cloves garlic, minced'),
        ing(1, tbsp, 'red pepper flakes'),
        ing(1, tbsp, 'kosher salt'),
        ing(1.5, tsp, 'cumin'),
        ing(1, tsp, 'ground pepper'),
        ing(1, tsp, 'paprika'),
        ing(1/8, tsp, 'ground cinnamon'),
        ing(0, null, 'skewers')
      ],
      steps: [
        'Probably do more cinnamon, less red pepper flakes, and salt on chicken, not in mix…',
        'Mix everything in a bowl.',
        'Slice up chicken, drop in bowl.',
        'Cover, fridge for 2+ hours for marinate.',
        'Put chicken slabs onto skewers.',
        'Grill!',
      ]
    })
  },
  { // Honey-Garlic Shrimp
    ...simpleRecipe({
      title: 'Honey-Garlic Shrimp',
      category: dinner,
      seasons: [],
      ingredients: [
        ing(1, lb, ' large raw shrimp (16-20 count)'),
        ing(1, tbsp, 'minced fresh garlic'),
        ing(2, tbsp, 'honey'),
        ing(1/2, tsp, 'fresh grated ginger'),
        ing(1, tbsp, 'soy sauce'),
        ing(1, tsp, 'Asian fish sauce'),
        ing(2, tsp, 'vegetable oil'),
        ing(1, cup, 'thin sliced green onion'),
      ],
      steps: [
        'Thaw the shrimp.',
        'Wisk everything except onion, oil, and shrimp.',
        'Add shrimp, toss thoroughly. Cover.',
        'Shrimp in fridge for 30-60 min.',
        'Oil on pan, get that guy shimmering.',
        'Shrimp into pan and let that bad boy start searing. 2 minutes.',
        'Add extra marinade, flip shrimp, sear 1 min.',
        'Serve on top of rice noodles or something.',
      ]
    })
  },
  { // Bourbon Chicken
    ...simpleRecipe({
      title: 'Bourbon Chicken',
      category: dinner,
      seasons: [],
      ingredients: [
        ing(2, lbs, 'chicken breasts'),
        ing(3, tbsp, 'cornstarch divided'),
        ing(0.5, tsp, 'salt'),
        ing(0.25, tsp, 'black pepper'),
        ing(4, tbsp, 'canola oil'),
        ing(2, null, 'cloves garlic minced'),
        ing(1, cup, 'water'),
        ing(0.5, cup, 'apple juice'),
        ing(0.25, cup, 'bourbon'),
        ing(0.5, cup, 'chicken broth'),
        ing(2/3, cup, 'soy sauce'),
        ing(1/3, cup, 'ketchup'),
        ing(2, tbsp, 'apple cider vinegar'),
        ing(1, cup, 'packed light brown sugar'),
        ing(0.5, tsp, 'onion powder'),
        ing(0.5, tsp, 'ground ginger'),
        ing(0.5, tsp, 'crushed red pepper flakes')
      ],
      steps: [
        'Cut chicken into 1 inch pieces and toss with 2 tbsp of cornstarch, salt, pepper.',
        'Add 2 tbsp canola oil to skillet on medium heat, let heat until adding chicken would sizzle.',
        'Add about half the chicken, let it cook 3 min without stirring. Flip, cook another 3 mins.',
        'Remove chicken onto plate. Add remaining oil. Cook rest of chicken the same way.',
        'Remove chicken to plate, add garlic and cook until you smell it. 20 sec',
        'Add water, apple juice, bourbon, broth, soy, ketchup, apple cider vinegar, brown sugar, onion powder, ground ginger, and red pepper flakes.',
        'Bring to boil, add chicken back.',
        'Cook until sauce is reduced by approx. half.',
        'Mix 1 tbsp cornstarch with tbsp water and stir.',
        'Add cornstarch thickener to sauce and stir.',
        'Cook briefly until thickening thickens.',
      ]
    })
  },
  { // Marry Me Chicken
    ...simpleRecipe({
      title: 'Marry Me Chicken',
      category: dinner,
      seasons: [],
      ingredients: [
        ing(1, tbsp, 'extra virgin olive oil'),
        ing(6, null, 'bone-in, skin-on chicken thighs'),
        ing(2, null, 'cloves garlic, minced'),
        ing(1, tbsp, 'thyme'),
        ing(3/4, cup, 'low sodium chicken broth'),
        ing(1/2, cup, 'heavy cream'),
        ing(1/2, cup, 'chopped sun-dried tomatoes'),
        ing(1/4, cup, 'freshly grated parmesan'),
        ing(0, null, 'not-so-fresh basil'),
      ],
      steps: [
        'Preheat oven to 375° F.',
        'In skillet on med-high, heat oil, season chicken, and sear until golden (4-5 mn per side).',
        'Transfer chicken to plate, pour off half of the fat from skillet.',
        'Skillet to medium heath. Add garlic, thyme, red pepper flakes, and fragrate 1 minute.',
        'Add heavy cream, sun-dried tomatoes, and parmesan. Season with more salt. ',
        'Bring to simmer. Readd chicken.',
        'Put in oven and bake 17-20 mins.',
        'Gornish with bisil and servo.',
      ]
    })
  },
  { // Korean Bulgogi Beef BBQ
    ...simpleRecipe({
      title: 'Korean Bulgogi Beef BBQ',
      category: dinner,
      seasons: [],
      ingredients: [
        ing(1+(1/4), lbs, 'boneless beef short rib, 1/8 in. thick'),
        ing(4, null, 'finely crushed garlic cloves'),
        ing(1, tbsp, 'freshly grated ginger'),
        ing(1/3, cup, 'grated Asian pear (non-substitutable)'),
        ing(0.25, cup, 'grated yellow onion'),
        ing(0.25, cup, 'soy sauce'),
        ing(1, tbsp, 'toasted sesame oil'),
        ing([1, 2], tbsp, 'brown sugar'),
        ing(1, tbsp, 'Korean chili flakes (Gochugaru)'),
        ing(0.5, tsp, 'kosher salt'),
        ing(1, tbsp, 'vegetable oil'),
        ing(null, null, 'sliced green onions'),
        ing(null, null, 'steamed rice'),
      ],
      steps: [
        'Mix garlic, onion, ginger, sesame oil, brown sugar, soy, chili flakes, and Asian pear in a bowl.',
        'Stir stir! Put meat in to marinade for 1-8 hours.',
        'Season with slight salt. Slight vegetable oil.',
        'Cook on smoking hot skillet. Single layer.',
        'Cook 2-3 minutes per side, highest heat.',
        'Serve on rice. Top with green onions.',
      ]
    })
  },
  { // Honey Mustard Chicken & Veggies
    ...simpleRecipe({
      title: 'Honey Mustard Chicken & Veggies',
      category: dinner,
      seasons: [],
      ingredients: [
        ing(.5, cup, 'Dijon mustard'),
        ing(.5, cup, 'honey'),
        ing(1.5, tsp, 'sea salt, divided'),
        ing(1, tbsp, 'apple cider vinegar'),
        ing(1, tsp, 'paprika'),
        ing(.5, tsp, 'pepper'),
        ing(3, tbsp, 'extra-virgin olive oil'),
        ing(2, null, 'large shallots, roughly chopped'),
        ing(1, lb, 'fingerling potatoes (or Yukon golds)'),
        ing(2, null, 'sprits rosemary, stems removed, leaves chopped'),
        ing(.5, lb, 'green beans'),
        ing(2, lbs, 'boneless, skinless, chicken breasts'),
      ],
      steps: [
        'Preheat oven to 375° F.',
        'Honey mustard: Combine Dijon, honey, ½ tsp salt, apple cider vinegar, paprika. Stir to smooth.',
        'Season chicken breasts with salt and pepper.',
        'Heat 1tbsp olive oil in skillet. Sear chicken until gold brown (~3 min/side). Move chicken to plate.',
        'Add shallots and potatoes and remaining oil.',
        'Toss to combine. Sprinkle rosemary on.',
        'In oven uncovered for 15 mins.',
        'Add chicken (and chicken juices), and green beans into skillet. Cook 15 more mins.',
        'Add sauce to skillet, cook another 10-15 mins until chicken is 165° F.',
      ]
    })
  },
  { // Spicy Caramelized Pork
    ...simpleRecipe({
      title: 'Spicy Caramelized Pork',
      category: dinner,
      seasons: [],
      ingredients: [
        saltAndPepper,
        ing(1.5, lbs, 'pork'),
        ing(0.5, cup, 'brown sugar'),
        ing(0.5, tsp, 'cayenne'),
        ing(0.5, tsp, 'ground ginger'),
        ing(0.5, null, 'yellow onion'),
      ],
      steps: [
        'Mix all but pork and onion.',
        'Coat pork in mix.',
        'Pan fry until browned.',
        '375° oven for20 mins.',
        'Bring back to stove.',
        'Remove pork, add diced onion.',
        'Cook shortly until gold.',
        'Add pork and remaining mix.',
        'Sear until mix barely bubbles.',
      ]
    })
  },
  { // Pan-Roasted 5-Spice Pork
    title: 'Pan-Roasted 5-Spice Pork',
    category: dinner,
    seasons: [],
    ingredientsLists: [
      {
        title: 'Starring',
        ingredients: [
          ing(2, lb, 'Boneless pork loin'),
        ]
      },
      {
        title: 'Marinade',
        ingredients: [
          saltAndPepper,
          ing(1/4, cup, 'rice vinegar'),
          ing(2, tbsp, 'fish sauce'),
          ing(1, tbsp, 'soy sauce'),
          ing(1, tsp, 'Chinese 5-spice'),
          ing(1, tsp, 'garlic')
        ]
      }
    ],
    stepsLists: [{
      steps: [
        'Cut and score pork loin',
        'Mix marinade together.',
        'Dip both sides pork in marinade.',
        'Pan fry on medium.',
      ]
    }]
  },
  { // Chicken Fettuccini Alfredo
    ...simpleRecipe({
      title: 'Chicken Fettuccini Alfredo',
      category: dinner,
      seasons: [spring, summer],
      ingredients: [
        ing(12, oz, 'Chicken breasts'),
        saltAndPepper,
        ing(12, oz, 'Fettuccine'),
        ing(3, tbsp, 'butter'),
        ing(2, cup, 'heavy cream'),
        ing(1.5, cup, 'shredded parmesan'),
        ing(2, dash, 'Nutmeg'),
        ing(null, null, 'Chipotle')
      ],
      // SNOW?
      steps: [
        'Boil pasta',
        'Slice chicken into ¼ in. strips.',
        'Season with salt and pepper.',
        'Melt 1 tbl spoon butter in skillet',
        'Brown chicken 1 layer at a time.',
        'Transfer chicken out of skillet.',
        'Add remaining butter.',
        'Let butter melt.',
        'Whisk in cream and nutmeg.',
        'Simmer for 2 minutes.',
        'Lower heat, whisk in cheese.',
        'Drain water from pasta.',
        'Combine parts in pasta pan.',
        'Serve on plate.',
        'Top with chipotle to taste.',
      ]
    })
  },
  { // Honey Glaze Holiday Ham
    ...simpleRecipe({
      title: 'Honey Glaze Holiday Ham',
      category: dinner,
      seasons: [winter],
      ingredients: [
        ing(3/4, cup, 'water'),
        ing( 2, null, 'whole star anise'),
        ing( 12, null, 'cloves'),
        ing( 1, null, 'ham', '7 lbs'),
        ing( 1, cup, 'brown sugar'),
        ing( 1/4, cup, 'honey'),
        ing( 2, tbsp, 'Dijon'),
        ing( 2, tbsp, 'rice vinegar'),
        ing( 1+1/2, tsp, 'black pepper'),
        ing( 1/2, tsp, 'Worcestershire sauce'),
        ing( 1, pinch, 'cayenne'),
      ],
      steps: [
        'Oven to 325F.',
        'Put water, clove, and anise in pan.',
        'Put rack in pan and ham on rack, ',
        'Whisk brown sugar, honey, mustard, vinegar, pepper, and sauce together in bowl and brush over ham.',
        'Put ham in oven, brush more every 20-30 minutes for about 1.5 to 2.5 hours'
      ]
    }),
  },
  { // Sausage Tortellini Alfredo
    ...simpleRecipe({
      title: 'Sausage Tortellini Alfredo',
      category: dinner,
      seasons: [],
      ingredients: [
        ing(9, oz, 'tortellini'),
        ing(10, lb, 'brats or sausage'),
        ing(2, tbsp, 'butter'),
        ing(3, clove, 'garlic'),
        ing(1/4, tsp, 'crushed red pepper flakes'),
        ing(1, handfull, 'spinach', 'optional'),
        ing(1, cup, 'milk'),
        ing(2, tbsp, 'flour'),
        ing(1/2, cup, 'heavy whipping cream'),
        ing(2, oz, 'cubed cream cheese'),
        ing(1/4, cup, 'grated parmesan cheese'),
        saltAndPepper
      ],
      steps: [
        'Boil tortellini per instructions.',
        'Slice brats. Cook brats in pan.',
        'Remove brats and set aside.',
        'Butter into the same pan brats were cooked in, let melt.',
        'Add garlic, red pepper, and spinach. Saute for 1 min.',
        'Add Flour, then and whisk until browned.',
        'Add milk and heavy whipping cream, whisk constantly until thickened. 2 min',
        'Add in cheese, stir until melted.',
        'Re-add sausage and add pasta. Bammo!',
      ]
    })
  },
  { // Madame Cristo
    ...simpleRecipe({
      title: 'Madame Cristo',
      category: lunch,
      seasons: [],
      ingredients: [
        ing(2, slices, 'bread'),
        ing(2, null, 'eggs'),
        ing(2, slices, 'cheese', 'or more'),
        ing(2, slices, 'honey ham', 'or more'),
        ing(2.5, tbsp, 'heavy cream or milk'),
        ing(1/2, tsp, 'salt'),
        ing(0, pinch, 'nutmeg'),
        ing(0, pinch, 'cayenne'),
      ],
      steps: [
        'Egg + cream/milk + salt + cayenne + nutmeg into bowl. Mix!',
        'Toast the bread.',
        'Place bread then cheese then ham.',
        'Do the same on both halves.',
        'Connect halves. Dip (soak) in mix.',
        'Butter in pan.',
        'Put in hot pan and let sizzle!',
        'Poach an egg in boiling water.',
        ' Plate, poached egg, cayenne, and chives!',
      ]
    })
  },
  { // Chicken and Scallion Yakitori
    ...simpleRecipe({
      title: 'Chicken and Scallion Yakitori',
      category: dinner,
      seasons: [],
      ingredients: [
        ing(2, null, 'Chicken breasts'),
        ing(1/8, cup, 'chicken broth'),
        ing(1/4, cup, 'mirin'),
        ing(1/4, cup, 'soy'),
        ing(1/8, cup, 'sake'),
        ing(1/8, cup, 'water'),
        ing(1, tbsp, 'brown sugar'),
        ing(6, null, 'white/light green scallions'),
      ],
      steps: [
        'Combine stock, mirin, soy, sake, sugar, water into pot.',
        'Bring to boil then simmer for 15 mins.',
        'Thinly slice chicken and place on skewer.',
        'Place cut scallions on separate skewers.',
        'Season both with salt.',
        'Brush both with sauce.',
        'Place on medium-hot grill. Occasionally turn/brush with more sauce until done.',
      ]
    })
  }
].sort((a, b) => a.title.localeCompare(b.title));

export default recipes;
