import { IDetailedRecipeDomainModel } from '../models/domainModels/IDetailedRecipeDomainModel';
import { IRecipeDomainModel } from '../models/domainModels/IRecipeDomainModel';
import { recipeRepository } from '../repositories/recipeRepository';
import { notFoundError } from './errorCreatorService';

export const recipeService = {
  async getRecipes(): Promise<IRecipeDomainModel[]> {
    return await recipeRepository.getRecipes();
  },

  async getRecipe(recipe_id: number): Promise<IRecipeDomainModel> {
    const recipe = await recipeRepository.getRecipe(recipe_id);

    if (!Object.keys(recipe).length) {
      return Promise.reject(notFoundError('Recipe was not found'));
    }
    return recipe;
  },

  async getDetailedRecipe(
    recipe_id: number
  ): Promise<IDetailedRecipeDomainModel> {
    const basicRecipeDetails = await this.getRecipe(recipe_id);
    const recipeIngredients = await recipeRepository.getRecipeIngredients(
      recipe_id
    );

    return { basicRecipeDetails, recipeIngredients };
  }
};
