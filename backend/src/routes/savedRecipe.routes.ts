import express from 'express';
import { savedRecipeController } from '../controllers/savedRecipeController/savedRecipeController';
import errorChecker from '../middlewares/errorChecker/errorChecker';
import authChecker from '../middlewares/authChecker/authChecker';

export const savedRecipeRouter = express.Router();

savedRecipeRouter.get(
  '/savedrecipes/:userId',
  authChecker,
  errorChecker(savedRecipeController.getSavedRecipesByUserId)
);
savedRecipeRouter.post(
  '/savedrecipes',
  authChecker,
  errorChecker(savedRecipeController.saveRecipe)
);
savedRecipeRouter.delete(
  '/savedrecipes/:savedRecipeId',
  authChecker,
  errorChecker(savedRecipeController.removeSavedRecipe)
);
