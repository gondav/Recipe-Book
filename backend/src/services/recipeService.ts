import { IRecipeDomainModel } from '../models/domainModels/IRecipeDomainModel';
import { recipeRepository } from '../repositories/recipeRepository';
import { notFoundError } from './errorCreatorService';

export const recipeService = {
  async getRecipes(): Promise<IRecipeDomainModel[]> {
    return await recipeRepository.getRecipes();
  },

  async getRecipe(recipe_id: number): Promise<IRecipeDomainModel> {
    const recipe = await recipeRepository.getRecipe(recipe_id);

    if (!recipe.recipe_id) {
      return Promise.reject(notFoundError('Ticket was not found'));
    }
    return recipe;
  }
};
