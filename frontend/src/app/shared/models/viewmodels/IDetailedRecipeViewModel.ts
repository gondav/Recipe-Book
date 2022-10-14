import { IBasicRecipeDetailsViewModel } from './IBasicRecipeDetailsViewModel';
import { IRecipeIngredientViewModel } from './IRecipeIngredientViewModel';

export interface IDetailedRecipeViewModel {
  basicRecipeDetails: IBasicRecipeDetailsViewModel;
  recipeIngredients: IRecipeIngredientViewModel[];
}
