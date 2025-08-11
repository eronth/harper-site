import IndividualRecipePage from '../SharedRecipeComponents/IndividualRecipePage/IndividualRecipePage';
import recipes from './food-recipe-data';

export default function IndividualFoodRecipePage() {
  return (
    <IndividualRecipePage 
      recipes={recipes}
      backPath="/food-recipes"
      backLabel="Food Recipes"
    />
  );
}
