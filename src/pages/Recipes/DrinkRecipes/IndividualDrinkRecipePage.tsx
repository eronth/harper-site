import IndividualRecipePage from '../SharedRecipeComponents/IndividualRecipePage/IndividualRecipePage';
import recipes from './drink-recipe-data';
import hotChocolateRecipes from './hot-chocolate-recipe-data';

export default function IndividualDrinkRecipePage() {
  return (
    <IndividualRecipePage 
      recipes={[...recipes, ...hotChocolateRecipes]}
      backPath="/drink-recipes"
      backLabel="Drink Recipes"
      unnumbered
    />
  );
}
