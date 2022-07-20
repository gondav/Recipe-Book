import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { recipeRouter } from './recipe.routes';

const apiRouter = express.Router();

apiRouter.use(morgan('dev'));
apiRouter.use(cors());
apiRouter.use(express.json());

apiRouter.use('/recipe', recipeRouter);

export default apiRouter;
