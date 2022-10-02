import express from 'express';
import { userController } from '../controllers/userController';
import errorChecker from '../middlewares/errorChecker/errorChecker';

export const userRouter = express.Router();

userRouter.post('/users', errorChecker(userController.registerUser));
userRouter.get('/users/:id', errorChecker(userController.getUserById));
userRouter.put('/users', errorChecker(userController.updatePassword));
userRouter.post('/login', errorChecker(userController.loginUser));
userRouter.delete('/users/:id', errorChecker(userController.deleteUser));
