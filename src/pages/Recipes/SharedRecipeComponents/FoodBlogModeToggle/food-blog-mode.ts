// Recipe links carry the current mode in the URL so an individual recipe page
// opens in whatever mode the list page was showing.
export const foodBlogModeParam = 'foodBlogMode';

export function foodBlogModeFromParams(params: URLSearchParams): boolean {
  return params.get(foodBlogModeParam) === 'true';
}

// Appends the mode to a recipe path when it is on, so the link round-trips it
export function withFoodBlogModeParam(path: string, foodBlogMode: boolean): string {
  return foodBlogMode ? `${path}?${foodBlogModeParam}=true` : path;
}
