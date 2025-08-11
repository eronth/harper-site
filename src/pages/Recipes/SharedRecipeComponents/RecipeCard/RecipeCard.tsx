import React from "react";
import { Link, useLocation } from "react-router-dom";
import type { Ingredient, Recipe, Steps } from "../recipe-types";
import './RecipeCard.css';

// Import season icons
import springEnabledIcon from '../../../../assets/season-icons/enabled/spring.png';
import summerEnabledIcon from '../../../../assets/season-icons/enabled/summer.png';
import autumnEnabledIcon from '../../../../assets/season-icons/enabled/autumn.png';
import winterEnabledIcon from '../../../../assets/season-icons/enabled/winter.png';
import springDisabledIcon from '../../../../assets/season-icons/disabled/spring.png';
import summerDisabledIcon from '../../../../assets/season-icons/disabled/summer.png';
import autumnDisabledIcon from '../../../../assets/season-icons/disabled/autumn.png';
import winterDisabledIcon from '../../../../assets/season-icons/disabled/winter.png';

type Props = {
  recipe: Recipe;
  unnumbered?: boolean; // If true, steps will be displayed as an unnumbered list
};
export default function RecipeCard({ recipe, unnumbered }: Props) {
  const location = useLocation();
  const [quantity, setQuantity] = React.useState(1);
  const maxQuantity = 5;
  const seasons = recipe.seasons || [];
  const isSpringEnabled: boolean = seasons.includes('Spring');
  const isSummerEnabled: boolean = seasons.includes('Summer');
  const isAutumnEnabled: boolean = seasons.includes('Autumn');
  const isWinterEnabled: boolean = seasons.includes('Winter');

  // Create a slug from recipe title for URL-friendly ID
  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Determine the base path for the recipe link
  const getRecipeLink = (): string => {
    const currentPath = location.pathname;
    const recipeSlug = createSlug(recipe.title);
    
    if (currentPath.includes('/food-recipes')) {
      return `/food-recipes/recipe/${recipeSlug}`;
    } else if (currentPath.includes('/drink-recipes')) {
      return `/drink-recipes/recipe/${recipeSlug}`;
    }
    
    // Fallback - shouldn't happen in normal use
    return `/recipe/${recipeSlug}`;
  };

  function ingredientToDisplay(ingredient: Ingredient): React.ReactNode {
    const parts: string[] = [];
    if (ingredient.quantity) {
      if (Array.isArray(ingredient.quantity)) {
        parts.push(`${fractionize(ingredient.quantity[0] * quantity)} - ${fractionize(ingredient.quantity[1] * quantity)}`);
      } else {
        parts.push(`${fractionize(ingredient.quantity * quantity)}`);
      }
    }
    if (ingredient.unit) {
      parts.push(ingredient.unit);
    }
    parts.push(ingredient.name);
    return (<>
      {parts.join(' ').trim()}
      {ingredient.adjustments 
        && <span className="adjustments"> ({ingredient.adjustments})</span>
      }
    </>);
  }

  const fractionize = (quantity: number): string => {
    // First pull the decimal part of the number
    const decimalPart = quantity % 1;
    // If the decimal part is 0, return an the original number
    if (decimalPart === 0) {
      return quantity.toString();
    } else {
      const wholePart = Math.floor(quantity);
      const wholeText = wholePart ? `${wholePart}` : '';
      return `${wholeText}${decimalToFraction(decimalPart)}`;
    }
  }

  function decimalToFraction(decimal: number): string {
    switch (decimal) {
      // Halve
      case 0.5: return '½';
      // Fourths
      case 0.25: return '¼';
      case 0.75: return '¾';
      // Thirds
      case 0.33:
      case 1/3: return '⅓';
      case 0.66:
      case 2/3: return '⅔';
      // Eighths
      case 0.125: return '⅛';
      case 0.375: return '⅜';
      case 0.625: return '⅝';
      case 0.875: return '⅞';
      default: return '';
    };
  }

  const seasonsIcons = (<>
    <img alt={`${isSpringEnabled ? '' : 'not '}Spring`}
      src={isSpringEnabled ? springEnabledIcon : springDisabledIcon}
    />
    <img alt={`${isSummerEnabled ? '' : 'not '}Summer`}
      src={isSummerEnabled ? summerEnabledIcon : summerDisabledIcon}
    />
    <img alt={`${isAutumnEnabled ? '' : 'not '}Autumn`}
      src={isAutumnEnabled ? autumnEnabledIcon : autumnDisabledIcon}
    />
    <img alt={`${isWinterEnabled ? '' : 'not '}Winter`}
      src={isWinterEnabled ? winterEnabledIcon : winterDisabledIcon}
    />
  </>);

  const stepsInnards = (steps: Steps, listIndex: number) => {
    return <>
      {steps.step0 && <li className="step-0">{steps.step0}</li>}
      {steps.steps.map((step, j) => (
        <li key={'step-list-'+listIndex+'-item-'+j}>{step}</li>
      ))}
    </>;
  }

  const quantitySwitcher = (
    <span className="qty-select">
      <label htmlFor='recipe-quantity-select'>
        Qty ×
      </label>
      <select id='recipe-quantity-select'
        value={quantity} 
        onChange={e => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: maxQuantity }, (_, i) => i + 1).map(qty => (
          <option key={'quantity-option-'+qty} value={qty}>{qty}</option>
        ))}
      </select>
    </span>
  );

  return (
    <div className="recipe-card">
      <div className="season-icons-row">
        <div className="season-icons">
          {seasonsIcons}
        </div>
        {quantitySwitcher}
      </div>
      <div className="recipe-title-region">
        <Link to={getRecipeLink()} className="recipe-title-link">
          <h2 className={recipe.category.toLowerCase()}>{recipe.title}</h2>
        </Link>
      </div>
      <div className="subtitle">{recipe.subtitle || <>&nbsp;</>}</div>
      <hr />
      <div>
        <h3>Starring:</h3>
        {
          recipe.ingredientsLists.map((list, i) => (<div key={'ingredient-list-'+i}>
            { list.title && <h4>{list.title}</h4> }
            <ul>
              {list.ingredients.map((ingredient, j) => (
                <li key={'ingredient-list-'+i+'-item-'+j}>{ingredientToDisplay(ingredient)}</li>
              ))}
            </ul>
          </div>))
        }
      </div>
      <hr />
      <div>
        <h3>Directions:</h3>
        {
          recipe.stepsLists.map((steps, i) => (<div key={'steps-list-'+i}>
            { steps.title && <h4>{steps.title}</h4> }
            {unnumbered 
            ? <ul>
                {stepsInnards(steps, i)}
              </ul>
            : <ol start={steps.step0 ? 0 : 1}>
                {stepsInnards(steps, i)}
              </ol>
            }
          </div>))
        }
      </div>
    </div>
  );
}