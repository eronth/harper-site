export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter';

export type RecipeCategory =
  MealCategory | DrinkCategory;

type MealCategory = 
'Breakfast' | 'Lunch' | 'Dinner' 
//| 'Appetizer' | 'Side Dish'
| 'Dessert' | 'Desert'
| 'Drink';

type DrinkCategory =
'Cocktail' | 'Smoothie' | 'Coffee' | 'Tea' | 'Other'

