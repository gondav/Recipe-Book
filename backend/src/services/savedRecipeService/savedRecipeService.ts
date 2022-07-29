import { savedRecipeRepository } from '../../repositories/savedRecipeRepository';
import { IRecipeDomainModel } from '../../models/domainModels/IRecipeDomainModel';
import { userRepository } from '../../repositories/userRepository';
import { recipeRepository } from '../../repositories/recipeRepository';
import { notFoundError, serverError } from '../errorCreatorService';

export const savedRecipeService = {
  async getSavedRecipesByUserId(userId: number): Promise<IRecipeDomainModel[]> {
    return await savedRecipeRepository.getSavedRecipesByUserId(userId);
  },

  async saveRecipe(userId: number, recipeId: number): Promise<void> {
    const user = await userRepository.getUserById(userId);
    const recipe = await recipeRepository.getRecipe(recipeId);

    if (!user.length) {
      return Promise.reject(notFoundError(`User does not exist`));
    }

    if (!recipe.length) {
      return Promise.reject(notFoundError('Recipe does not exist'));
    }
    const result = await savedRecipeRepository.saveRecipe(userId, recipeId);

    if (result.affectedRows < 1) {
      return Promise.reject(serverError('Cannot save recipe'));
    }
  },

  async removeSavedRecipe(savedRecipeId: number): Promise<void> {
    const savedRecipe = await userRepository.getUserById(savedRecipeId);

    if (!savedRecipe.length) {
      return Promise.reject(notFoundError(`Cannot find saved recipe`));
    }
    const result = await savedRecipeRepository.removeSavedRecipe(savedRecipeId);

    if (result.affectedRows < 1) {
      return Promise.reject(serverError('Cannot delete recipe'));
    }
  }
};
