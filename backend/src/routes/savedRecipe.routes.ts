import express from 'express';
import authChecker from '../middlewares/authChecker/authChecker';
import { savedRecipeController } from '../controllers/savedRecipeController/savedRecipeController';
import errorChecker from '../middlewares/errorChecker/errorChecker';

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
