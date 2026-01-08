import type { RecipeCategory, Season } from "../../../types/recipe-types";

export type QuantityUnit = 'g' | 'kg' 
| 'ml' | 'l' 
| 'cup' | 'gal' | 'quart'
| 'tbsp' | 'tsp' | 'generous tbsp'
| 'oz' | 'lb' 
| 'piece' | 'spoonful' | 'pinch' | 'bunch' | 'dash' | 'splash' | 'clove'
| 'strips' | 'bottle'
| 'dashes' | 'bar spoon' | 'slices' | 'handfull';

type StandardRecipeParts = {
  title: string;
  subtitle?: string;
  category: RecipeCategory;
  searchTerms?: string[];
  description?: string;
  seasons: Season[];
};

export type Recipe = StandardRecipeParts & {
  ingredientsLists: Ingredients[];
  stepsLists: Steps[];
};

export type SimplifiedRecipe = StandardRecipeParts & {
  ingredients: Ingredient[];
  step0?: string;
  steps: string[];
};

type Ingredients = {
  title?: string;
  ingredients: Ingredient[];
};

export type Ingredient = {
  name: string;
  quantity: number | [number, number];
  unit?: QuantityUnit | null;
  adjustments?: string;
};

export type Steps = {
  title?: string;
  step0?: string;
  steps: string[];
};

