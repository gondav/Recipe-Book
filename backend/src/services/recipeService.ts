import { IRecipeDomainModel } from '../models/domainModels/IRecipeDomainModel';
import { recipeRepository } from '../repositories/recipeRepository';

export const recipeService = {
  async getRecipes(): Promise<IRecipeDomainModel[] | Error> {
    try {
      return await recipeRepository.getRecipes();
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
