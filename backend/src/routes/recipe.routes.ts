import express from 'express';
import errorChecker from '../middlewares/errorChecker/errorChecker';
import { recipeController } from '../controllers/recipeController';

export const recipeRouter = express.Router();

recipeRouter.get('/recipes', errorChecker(recipeController.getRecipes));
recipeRouter.get(
  '/recipes/:recipe_id',
  errorChecker(recipeController.getRecipe)
);
recipeRouter.get(
  '/recipes/details/:recipe_id',
  errorChecker(recipeController.getDetailedRecipe)
);
