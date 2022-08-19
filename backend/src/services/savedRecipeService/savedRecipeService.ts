import { savedRecipeRepository } from '../../repositories/savedRecipeRepository';
import { IRecipeDomainModel } from '../../models/domainModels/IRecipeDomainModel';
import { userRepository } from '../../repositories/userRepository';
import { recipeRepository } from '../../repositories/recipeRepository';
import {
  conflictError,
  notFoundError,
  serverError
} from '../errorCreatorService';

export const savedRecipeService = {
  async getSavedRecipesByUserId(userId: number): Promise<IRecipeDomainModel[]> {
    return await savedRecipeRepository.getSavedRecipesByUserId(userId);
  },

  async saveRecipe(userId: number, recipeId: number): Promise<void> {
    const user = await userRepository.getUserById(userId);

    if (!user.length) {
      return Promise.reject(notFoundError(`User does not exist`));
    }
    const recipe = await recipeRepository.getRecipe(recipeId);

    if (!recipe.length) {
      return Promise.reject(notFoundError('Recipe does not exist'));
    }
    const savedRecipeId = await savedRecipeRepository.getSavedRecipeId(
      userId,
      recipeId
    );

    if (savedRecipeId.length) {
      return Promise.reject(conflictError('Recipe is already saved'));
    }
    const result = await savedRecipeRepository.saveRecipe(userId, recipeId);

    if (result.affectedRows < 1) {
      return Promise.reject(serverError('Cannot save recipe'));
    }
  },

  async removeSavedRecipe(
    savedRecipeId: number,
    userId: number
  ): Promise<void> {
    const result = await savedRecipeRepository.removeSavedRecipe(
      savedRecipeId,
      userId
    );

    if (result.affectedRows < 1) {
      return Promise.reject(serverError('Cannot delete recipe'));
    }
  }
};
