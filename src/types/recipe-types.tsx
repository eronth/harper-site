export const seasonCategories = ['Spring', 'Summer', 'Autumn', 'Winter'] as const;
export type Season = typeof seasonCategories[number];

export const mealCategories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Desert'] as const;
export type MealCategory = typeof mealCategories[number];

export const drinkCategories = ['Cocktail', 'Smoothie', 'Coffee', 'Tea', 'Hot Chocolate','Other'] as const;
export type DrinkCategory = typeof drinkCategories[number];

export type RecipeCategory = MealCategory | DrinkCategory;