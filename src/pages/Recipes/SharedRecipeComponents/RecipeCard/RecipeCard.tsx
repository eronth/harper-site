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
  interactive?: boolean; // If true, enables checkboxes for tracking progress
};
export default function RecipeCard({ recipe, unnumbered, interactive = false }: Props) {
  const location = useLocation();
  const [quantity, setQuantity] = React.useState(1);
  const maxQuantity = 5;
  const seasons = recipe.seasons || [];
  const isSpringEnabled: boolean = seasons.includes('Spring');
  const isSummerEnabled: boolean = seasons.includes('Summer');
  const isAutumnEnabled: boolean = seasons.includes('Autumn');
  const isWinterEnabled: boolean = seasons.includes('Winter');

  // State for tracking checked ingredients and steps (only when interactive)
  const [checkedIngredients, setCheckedIngredients] = React.useState<Set<string>>(new Set());
  const [checkedSteps, setCheckedSteps] = React.useState<Set<string>>(new Set());

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

  // Interactive functions (only used when interactive=true)
  const getIngredientId = (listIndex: number, itemIndex: number): string => {
    return `ingredient-${listIndex}-${itemIndex}`;
  };

  const getStepId = (listIndex: number, itemIndex: number, isStep0: boolean = false): string => {
    return `step-${listIndex}-${isStep0 ? '0' : itemIndex}`;
  };

  const handleIngredientCheck = (id: string) => {
    setCheckedIngredients(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleStepCheck = (id: string) => {
    setCheckedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Calculate progress (only used when interactive=true)
  const getTotalIngredients = (): number => {
    return recipe.ingredientsLists.reduce((total, list) => total + list.ingredients.length, 0);
  };

  const getTotalSteps = (): number => {
    return recipe.stepsLists.reduce((total, stepsList) => {
      return total + stepsList.steps.length + (stepsList.step0 ? 1 : 0);
    }, 0);
  };

  const getProgress = () => {
    const totalIngredients = getTotalIngredients();
    const totalSteps = getTotalSteps();
    const totalItems = totalIngredients + totalSteps;
    const completedItems = checkedIngredients.size + checkedSteps.size;
    
    return {
      ingredientsProgress: totalIngredients > 0 ? (checkedIngredients.size / totalIngredients) * 100 : 0,
      stepsProgress: totalSteps > 0 ? (checkedSteps.size / totalSteps) * 100 : 0,
      totalProgress: totalItems > 0 ? (completedItems / totalItems) * 100 : 0,
      completedIngredients: checkedIngredients.size,
      totalIngredients,
      completedSteps: checkedSteps.size,
      totalSteps
    };
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
    if (interactive) {
      return <>
        {steps.step0 && (
          <li className={`step-0 ${checkedSteps.has(getStepId(listIndex, 0, true)) ? 'completed' : ''}`}>
            <label className="step-checkbox-label">
              <input
                type="checkbox"
                checked={checkedSteps.has(getStepId(listIndex, 0, true))}
                onChange={() => handleStepCheck(getStepId(listIndex, 0, true))}
                className="step-checkbox"
              />
              <span className="step-text">{steps.step0}</span>
            </label>
          </li>
        )}
        {steps.steps.map((step, j) => {
          const stepId = getStepId(listIndex, j);
          return (
            <li key={'step-list-'+listIndex+'-item-'+j} className={checkedSteps.has(stepId) ? 'completed' : ''}>
              <label className="step-checkbox-label">
                <input
                  type="checkbox"
                  checked={checkedSteps.has(stepId)}
                  onChange={() => handleStepCheck(stepId)}
                  className="step-checkbox"
                />
                <span className="step-text">{step}</span>
              </label>
            </li>
          );
        })}
      </>;
    } else {
      return <>
        {steps.step0 && <li className="step-0">{steps.step0}</li>}
        {steps.steps.map((step, j) => (
          <li key={'step-list-'+listIndex+'-item-'+j}>{step}</li>
        ))}
      </>;
    }
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

  // Progress summary (only for interactive mode)
  const progress = interactive ? getProgress() : null;
  const progressSummary = interactive && progress ? (
    <div className="progress-summary">
      <div>
        <strong>Prep Progress: {Math.round(progress.ingredientsProgress)}%</strong>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill ingredient-progress" 
          style={{ width: `${progress.ingredientsProgress}%` }}
        />
      </div>
      <div>
        <strong>Cooking Progress: {Math.round(progress.stepsProgress)}%</strong>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill step-progress" 
          style={{ width: `${progress.stepsProgress}%` }}
        />
      </div>
      <div className="progress-details">
        Ingredients: {progress.completedIngredients}/{progress.totalIngredients} • 
        Steps: {progress.completedSteps}/{progress.totalSteps}
      </div>
    </div>
  ) : null;

  return (
    <div className={`recipe-card ${interactive ? 'interactive-recipe-card' : ''}`}>
      <div className="season-icons-row">
        <div className="season-icons">
          {seasonsIcons}
        </div>
        {quantitySwitcher}
      </div>
      <div className="recipe-title-region">
        {interactive ? (
          <h2 className={recipe.category.toLowerCase()}>{recipe.title}</h2>
        ) : (
          <Link to={getRecipeLink()} className="recipe-title-link">
            <h2 className={recipe.category.toLowerCase()}>{recipe.title}</h2>
          </Link>
        )}
      </div>
      <div className="subtitle">{recipe.subtitle || <>&nbsp;</>}</div>
      {progressSummary}
      <hr />
      <div>
        <h3>Starring:</h3>
        {
          recipe.ingredientsLists.map((list, i) => (<div key={'ingredient-list-'+i}>
            { list.title && <h4>{list.title}</h4> }
            <ul className={interactive ? "ingredients-list" : ""}>
              {list.ingredients.map((ingredient, j) => {
                if (interactive) {
                  const ingredientId = getIngredientId(i, j);
                  return (
                    <li key={'ingredient-list-'+i+'-item-'+j} className={checkedIngredients.has(ingredientId) ? 'completed' : ''}>
                      <label className="ingredient-checkbox-label">
                        <input
                          type="checkbox"
                          checked={checkedIngredients.has(ingredientId)}
                          onChange={() => handleIngredientCheck(ingredientId)}
                          className="ingredient-checkbox"
                        />
                        <span className="ingredient-text">{ingredientToDisplay(ingredient)}</span>
                      </label>
                    </li>
                  );
                } else {
                  return (
                    <li key={'ingredient-list-'+i+'-item-'+j}>{ingredientToDisplay(ingredient)}</li>
                  );
                }
              })}
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
            ? <ul className={interactive ? "steps-list" : ""}>
                {stepsInnards(steps, i)}
              </ul>
            : <ol start={steps.step0 ? 0 : 1} className={interactive ? "steps-list" : ""}>
                {stepsInnards(steps, i)}
              </ol>
            }
          </div>))
        }
      </div>
    </div>
  );
}