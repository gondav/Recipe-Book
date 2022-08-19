import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { recipeRouter } from './recipe.routes';
import { userRouter } from './user.routes';
import { savedRecipeRouter } from './savedRecipe.routes';
import authChecker from '../middlewares/authChecker/authChecker';

const apiRouter = express.Router();

apiRouter.use(morgan('dev'));
apiRouter.use(cors());
apiRouter.use(express.json());

apiRouter.use('/recipe', recipeRouter);
apiRouter.use('/user', userRouter);
apiRouter.use(authChecker);
apiRouter.use('/savedrecipe', savedRecipeRouter);

export default apiRouter;
