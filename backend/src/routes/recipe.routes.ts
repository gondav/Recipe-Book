import express from 'express';
import errorChecker from '../middlewares/errorChecker/errorChecker';
import { recipeController } from '../controllers/recipeController';

export const recipeRouter = express.Router();

recipeRouter.get('/recipes', errorChecker(recipeController.getRecipes));
recipeRouter.get(
  '/recipes/:recipeId',
  errorChecker(recipeController.getRecipe)
);
recipeRouter.get(
  '/recipes/details/:recipeId',
  errorChecker(recipeController.getDetailedRecipe)
);
recipeRouter.get(
  '/recipes/category/:tagName',
  errorChecker(recipeController.getRecipesByTagName)
);
