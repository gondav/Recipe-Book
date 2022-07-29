import { Request, Response, NextFunction } from 'express';
import { savedRecipeService } from '../../services/savedRecipeService/savedRecipeService';
import { badRequestError } from '../../services/errorCreatorService';

export const savedRecipeController = {
  async getSavedRecipesByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userId = Number(req.params.userId);

    if (!userId || isNaN(userId) || userId < 1) {
      return next(badRequestError('User id needs to be a positive integer'));
    }
    const recipes = await savedRecipeService.getSavedRecipesByUserId(userId);

    res.status(200).json({ recipes });
  },

  async saveRecipe(req: Request, res: Response, next: NextFunction) {
    const { userId, recipeId } = req.body;

    if (!userId || isNaN(userId) || userId < 1) {
      return next(badRequestError('User id needs to be a positive integer'));
    }

    if (!recipeId || isNaN(recipeId) || recipeId < 1) {
      return next(badRequestError('Recipe id needs to be a positive integer'));
    }
    await savedRecipeService.saveRecipe(userId, recipeId);

    res.status(201).json({ message: 'Recipe saved' });
  },

  async removeSavedRecipe(req: Request, res: Response, next: NextFunction) {
    const savedRecipeId = Number(req.params.savedRecipeId);

    if (!savedRecipeId || isNaN(savedRecipeId) || savedRecipeId < 1) {
      return next(badRequestError('Id needs to be a positive integer'));
    }
    await savedRecipeService.removeSavedRecipe(savedRecipeId);

    res.status(200).json({ message: 'Recipe removed from saved recipes' });
  }
};
