import { IRecipeIngredientsDomainModel } from './IRecipeIngredientsDomainModel';
import { IRecipeDomainModel } from './IRecipeDomainModel';

export interface IDetailedRecipeDomainModel {
  basicRecipeDetails: IRecipeDomainModel;
  recipeIngredients: IRecipeIngredientsDomainModel[];
}
