import IndividualRecipePage from '../SharedRecipeComponents/IndividualRecipePage/IndividualRecipePage';
import recipes from '../../../data/recipes/drink-recipe-data';
import hotChocolateRecipes from '../../../data/recipes/hot-chocolate-recipe-data';

export default function IndividualDrinkRecipePage() {
  return (
    <IndividualRecipePage 
      recipes={[...recipes, ...hotChocolateRecipes]}
      backPath="/drink-recipes"
      backLabel="Drink Recipes"
      className="drink"
      unnumbered
    />
  );
}
