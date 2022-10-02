import { Request, Response, NextFunction } from 'express';
import { savedRecipeService } from '../../services/savedRecipeService/savedRecipeService';
import {
  badRequestError,
  unauthorizedError
} from '../../services/errorCreatorService';
import { jwtService } from '../../services/jwtService/jwt.service';

export const savedRecipeController = {
  async getSavedRecipesByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userId = Number(req.params.userId);
    const userIdFromTokenPayload = jwtService.getUserIdFromTokenPayload(req);

    if (!userId || isNaN(userId) || userId < 1) {
      return next(badRequestError('User id needs to be a positive integer'));
    }

    if (userId !== userIdFromTokenPayload) {
      return next(unauthorizedError('Not Authorized'));
    }
    const recipes = await savedRecipeService.getSavedRecipesByUserId(userId);

    res.status(200).json({ recipeList: recipes });
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
    const userId = jwtService.getUserIdFromTokenPayload(req);

    if (!userId) {
      return next(unauthorizedError('Not Authorized'));
    }

    if (!savedRecipeId || isNaN(savedRecipeId) || savedRecipeId < 1) {
      return next(badRequestError('Id needs to be a positive integer'));
    }
    await savedRecipeService.removeSavedRecipe(savedRecipeId, userId);

    res.status(200).json({ message: 'Recipe removed from saved recipes' });
  }
};
