import React from "react";
import type { Ingredient, Recipe } from "../food-recipe-data";
import './RecipeCard.css';

type Props = {
  recipe: Recipe;
};
export default function RecipeCard({ recipe }: Props) {
  const [quantity, setQuantity] = React.useState(1);
  const maxQuantity = 5;
  const seasons = recipe.seasons || [];
  const springEnabled = seasons.includes('Spring') ? 'enabled' : 'disabled';
  const summerEnabled = seasons.includes('Summer') ? 'enabled' : 'disabled';
  const autumnEnabled = seasons.includes('Autumn') ? 'enabled' : 'disabled';
  const winterEnabled = seasons.includes('Winter') ? 'enabled' : 'disabled';

  function ingredientToString(ingredient: Ingredient): string {
    const parts: string[] = [];
    if (ingredient.quantity) {
      parts.push(`${fractionize(ingredient.quantity * quantity)}`);
    }
    if (ingredient.unit) {
      parts.push(ingredient.unit);
    }
    parts.push(ingredient.name);
    if (ingredient.adjustments) {
      parts.push(`(${ingredient.adjustments})`);
    }
    return parts.join(' ').trim();
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
      case 0.25: return '¼';
      case 0.5: return '½';
      case 0.75: return '¾';
      case 0.33: return '⅓';
      case 0.66: return '⅔';
      case 0.125: return '⅛';
      case 0.375: return '⅜';
      case 0.625: return '⅝';
      case 0.875: return '⅞';
      default: return '';
    };
  }

  const seasonsIcons = (<>
    <img alt="Spring"
      src={`/src/assets/season-icons/${springEnabled}/spring.png`}
    />
    <img alt="Summer"
      src={`/src/assets/season-icons/${summerEnabled}/summer.png`}
    />
    <img alt="Autumn"
      src={`/src/assets/season-icons/${autumnEnabled}/autumn.png`}
    />
    <img alt="Winter"
      src={`/src/assets/season-icons/${winterEnabled}/winter.png`}
    />
  </>);

  return (
    <div className="recipe-card">
      <div className="season-icons">
        {seasonsIcons}
      </div>
      <div className="recipe-title-region">
        <h2>{recipe.title}</h2>
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
      </div> 
      <hr />
      <div>
        <h3>Starring:</h3>
        {
          recipe.ingredientsLists.map((list, i) => (<div key={'ingredient-list-'+i}>
            { list.title && <h4>{list.title}</h4> }
            <ul>
              {list.ingredients.map((ingredient, j) => (
                <li key={'ingredient-list-'+i+'-item-'+j}>{ingredientToString(ingredient)}</li>
              ))}
            </ul>
          </div>))
        }
      </div>
      <hr />
      <div>
        <h3>Directions:</h3>
        {
          recipe.stepsLists.map((list, i) => (<div key={'steps-list-'+i}>
            { list.title && <h4>{list.title}</h4> }
            <ol>
              {list.steps.map((step, j) => (
                <li key={'step-list-'+i+'-item-'+j}>{step}</li>
              ))}
            </ol>
          </div>))
        }
      </div>
    </div>
  );
}