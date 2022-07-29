import express from 'express';
import { savedRecipeController } from '../controllers/savedRecipeController/savedRecipeController';
import errorChecker from '../middlewares/errorChecker/errorChecker';

export const savedRecipeRouter = express.Router();

savedRecipeRouter.get(
  '/savedrecipes/:userId',
  errorChecker(savedRecipeController.getSavedRecipesByUserId)
);
savedRecipeRouter.post(
  '/savedrecipes',
  errorChecker(savedRecipeController.saveRecipe)
);
savedRecipeRouter.delete(
  '/savedrecipes/:savedRecipeId',
  errorChecker(savedRecipeController.removeSavedRecipe)
);
