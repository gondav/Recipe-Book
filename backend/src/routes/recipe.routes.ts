import express from 'express';
import { recipeController } from '../controllers/recipeController';

export const recipeRouter = express.Router();

recipeRouter.get('/recipes', recipeController.getRecipes);
