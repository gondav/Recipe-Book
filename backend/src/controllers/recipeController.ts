import { NextFunction, Request, Response } from 'express';
import { recipeService } from '../services/recipeService';

export const recipeController = {
  async getRecipes(_req: Request, res: Response, _next: NextFunction) {
    const recipes = await recipeService.getRecipes();
    res.status(200).json({ recipes: recipes });
  }
};
