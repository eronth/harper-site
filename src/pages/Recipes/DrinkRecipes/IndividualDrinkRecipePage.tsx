import IndividualRecipePage from '../SharedRecipeComponents/IndividualRecipePage/IndividualRecipePage';
import recipes from './drink-recipe-data';

export default function IndividualDrinkRecipePage() {
  return (
    <IndividualRecipePage 
      recipes={recipes}
      backPath="/drink-recipes"
      backLabel="Drink Recipes"
    />
  );
}
