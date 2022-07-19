import { Request, Response } from 'express';
import { recipeService } from '../services/recipeService';

export const recipeController = {
  async getRecipes(_req: Request, res: Response) {
    try {
      const recipes = await recipeService.getRecipes();
      res.status(200).json({ recipes: recipes });
    } catch (error) {
      console.log(error);
    }
  }
};
