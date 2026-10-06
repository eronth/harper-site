import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import type { Ingredient, Recipe, Steps } from "../recipe-types";
import { withFoodBlogModeParam } from "../FoodBlogModeToggle/food-blog-mode";
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

// How close a decimal must be to a fraction to display as that fraction
const fractionTolerance = 0.015;

const unicodeFractions: Record<string, number> = {
  '½': 1/2, '⅓': 1/3, '⅔': 2/3, '¼': 1/4, '¾': 3/4,
  '⅕': 1/5, '⅖': 2/5, '⅗': 3/5, '⅘': 4/5, '⅙': 1/6, '⅚': 5/6,
  '⅛': 1/8, '⅜': 3/8, '⅝': 5/8, '⅞': 7/8,
};
const fractionChars = Object.keys(unicodeFractions).join('');
// One amount: '1 1/4', '1/4', '1.5', '.5', '1½', or '½'
const amount = `\\d+\\s+\\d+\\/\\d+|\\d+\\/\\d+|\\d*\\.?\\d+[${fractionChars}]?|[${fractionChars}]`;
// An amount or range ('1-2'), then whatever follows it ('tbsp', 'cup', ...)
const stepAmountPattern = new RegExp(`^\\s*(${amount})(?:\\s*[-–]\\s*(${amount}))?(.*)$`, 's');

function parseAmount(text: string): number {
  return text.trim().split(/\s+/).reduce((total, part) => {
    const [numerator, denominator] = part.split('/');
    if (denominator) {
      return total + Number(numerator) / Number(denominator);
    }
    const fraction = unicodeFractions[part.slice(-1)] ?? 0;
    const whole = fraction ? part.slice(0, -1) : part;
    return total + (whole ? Number(whole) : 0) + fraction;
  }, 0);
}

type Props = {
  recipe: Recipe;
  unnumbered?: boolean; // If true, steps will be displayed as an unnumbered list
  interactive?: boolean; // If true, enables checkboxes for tracking progress
  className?: string; // Optional additional class for styling
  useFoodBlogPreamble: boolean; // If true, displays the food blog preamble
};
export default function RecipeCard({ recipe, unnumbered, interactive = false, className, useFoodBlogPreamble }: Props) {
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

  // Determine the base path for the recipe link, carrying the current
  // food blog mode along so the individual page opens in the same mode
  const getRecipeLink = (): string => {
    const currentPath = location.pathname;
    const recipeSlug = createSlug(recipe.title);

    if (currentPath.includes('/food-recipes')) {
      return withFoodBlogModeParam(`/food-recipes/recipe/${recipeSlug}`, useFoodBlogPreamble);
    } else if (currentPath.includes('/drink-recipes')) {
      return withFoodBlogModeParam(`/drink-recipes/recipe/${recipeSlug}`, useFoodBlogPreamble);
    }

    // Fallback - shouldn't happen in normal use
    return withFoodBlogModeParam(`/recipe/${recipeSlug}`, useFoodBlogPreamble);
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
    // First split off the whole number
    let wholePart = Math.floor(quantity);
    let decimalPart = quantity - wholePart;
    // Float math (⅔ × 2 = 1.3333333333333333) and approximations like 0.33
    // land near a fraction rather than on it, so snap anything close enough
    if (decimalPart < fractionTolerance) {
      decimalPart = 0;
    } else if (decimalPart > 1 - fractionTolerance) {
      wholePart += 1;
      decimalPart = 0;
    }
    // If the decimal part is 0, return just the whole number
    if (decimalPart === 0) {
      return wholePart.toString();
    }
    const wholeText = wholePart ? `${wholePart}` : '';
    const fraction = decimalToFraction(decimalPart);
    // No matching symbol? Show a rounded decimal rather than dropping it
    return fraction ? `${wholeText}${fraction}` : `${+quantity.toFixed(2)}`;
  }

  function decimalToFraction(decimal: number): string {
    const fractions: [number, string][] = [
      // Halve
      [1/2, '½'],
      // Thirds
      [1/3, '⅓'], [2/3, '⅔'],
      // Fourths
      [1/4, '¼'], [3/4, '¾'],
      // Fifths for some reason
      [1/5, '⅕'], [2/5, '⅖'], [3/5, '⅗'], [4/5, '⅘'],
      // Sixths
      [1/6, '⅙'], [5/6, '⅚'],
      // Eighths
      [1/8, '⅛'], [3/8, '⅜'], [5/8, '⅝'], [7/8, '⅞'],
    ];
    return fractions.find(([value]) => Math.abs(value - decimal) < fractionTolerance)?.[1] ?? '';
  }

  // Scales {amount} tokens in step text, e.g. 'Heat {1 tbsp} oil' or 'Reduce to {½ cup}'.
  // At ×1 the text inside the braces is shown exactly as written.
  function scaleStepText(text: string): string {
    return text.replace(/\{([^{}]*)\}/g, (_, inner: string) => {
      const match = inner.match(stepAmountPattern);
      if (quantity === 1 || !match) {
        return inner;
      }
      const [, low, high, rest] = match;
      const scaledLow = fractionize(parseAmount(low) * quantity);
      const scaledHigh = high ? `-${fractionize(parseAmount(high) * quantity)}` : '';
      return `${scaledLow}${scaledHigh}${rest}`;
    });
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
              <span className="step-text">{scaleStepText(steps.step0)}</span>
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
                <span className="step-text">{scaleStepText(step)}</span>
              </label>
            </li>
          );
        })}
      </>;
    } else {
      return <>
        {steps.step0 && <li className="step-0">{scaleStepText(steps.step0)}</li>}
        {steps.steps.map((step, j) => (
          <li key={'step-list-'+listIndex+'-item-'+j}>{scaleStepText(step)}</li>
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
          <h2 className={recipe.category.toLowerCase()+' '+(className || '')}>{recipe.title}</h2>
        ) : (
          <Link to={getRecipeLink()} className="recipe-title-link">
            <h2 className={recipe.category.toLowerCase()+' '+(className || '')}>{recipe.title}</h2>
          </Link>
        )}
      </div>
      <div className="subtitle">{recipe.subtitle || <>&nbsp;</>}</div>
      {useFoodBlogPreamble && recipe.foodBlogPreamble && (
        <div className="food-blog-preamble">
          {recipe.foodBlogPreamble}
        </div>
      )}
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
                    <li key={'ingredient-list-'+i+'-item-'+j}
                      className={checkedIngredients.has(ingredientId) ? 'completed' : ''}>
                      <label className="ingredient-checkbox-label">
                        <input
                          type="checkbox"
                          checked={checkedIngredients.has(ingredientId)}
                          onChange={() => handleIngredientCheck(ingredientId)}
                          className="ingredient-checkbox"
                        />
                        <FontAwesomeIcon icon={
                          checkedIngredients.has(ingredientId)
                          ? faSquareCheck : faSquare
                        } className="checkbox-icon" />
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
