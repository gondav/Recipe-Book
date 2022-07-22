import { NextFunction, Request, Response } from 'express';
import { badRequestError } from '../services/errorCreatorService';
import { recipeService } from '../services/recipeService';

export const recipeController = {
  async getRecipes(_req: Request, res: Response, _next: NextFunction) {
    const recipes = await recipeService.getRecipes();
    res.status(200).json({ recipeList: recipes });
  },

  async getRecipe(req: Request, res: Response, next: NextFunction) {
    const recipe_id = parseInt(req.params.recipe_id);

    if (isNaN(recipe_id) || recipe_id < 1) {
      return next(badRequestError('Recipe id needs to be a positive integer'));
    }
    const recipe = await recipeService.getRecipe(recipe_id);

    return res.status(200).json({ recipe: recipe });
  },

  async getDetailedRecipe(req: Request, res: Response, next: NextFunction) {
    const recipe_id = parseInt(req.params.recipe_id);

    if (isNaN(recipe_id) || recipe_id < 1) {
      return next(badRequestError('Recipe id needs to be a positive integer'));
    }
    const detailedRecipe = await recipeService.getDetailedRecipe(recipe_id);

    return res.status(200).json({ detailedRecipe });
  },

  async getRecipesByTagName(req: Request, res: Response, next: NextFunction) {
    const { tag_name } = req.params;

    if (!tag_name) {
      return next(badRequestError('Please provide a recipe category'));
    }
    const recipes = await recipeService.getRecipesByTagName(tag_name);

    return res.status(200).json({ recipesByCategory: recipes });
  }
};
