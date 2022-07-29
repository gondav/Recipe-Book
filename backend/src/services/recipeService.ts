import { IDetailedRecipeDomainModel } from '../models/domainModels/IDetailedRecipeDomainModel';
import { IRecipeDomainModel } from '../models/domainModels/IRecipeDomainModel';
import { recipeRepository } from '../repositories/recipeRepository';
import { notFoundError } from './errorCreatorService';

export const recipeService = {
  async getRecipes(): Promise<IRecipeDomainModel[]> {
    return await recipeRepository.getRecipes();
  },

  async getRecipe(recipeId: number): Promise<IRecipeDomainModel> {
    const recipe = await recipeRepository.getRecipe(recipeId);

    if (!recipe.length) {
      return Promise.reject(notFoundError('Recipe was not found'));
    }
    return recipe[0];
  },

  async getDetailedRecipe(
    recipeId: number
  ): Promise<IDetailedRecipeDomainModel> {
    const basicRecipeDetails = await this.getRecipe(recipeId);
    const recipeIngredients = await recipeRepository.getRecipeIngredients(
      recipeId
    );

    return { basicRecipeDetails, recipeIngredients };
  },

  async getRecipesByTagName(tagName: string): Promise<IRecipeDomainModel[]> {
    const recipes = await recipeRepository.getRecipesByTagName(tagName);

    if (!recipes.length) {
      return Promise.reject(
        notFoundError(`Recipe with category name ${tagName} was not found`)
      );
    }
    return recipes;
  }
};
