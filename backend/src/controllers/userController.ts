import { Request, Response, NextFunction } from 'express';
import { jwtService } from '../services/jwtService/jwt.service';
import {
  badRequestError,
  notAcceptableError
} from '../services/errorCreatorService';
import { userService } from '../services/userService/userService';

export const userController = {
  async getUserById(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    if (!id || isNaN(id) || id < 1) {
      return next(badRequestError('User id needs to be a positive integer'));
    }
    const user = await userService.getUserById(id);
    res.status(200).json({ user });
  },

  async registerUser(req: Request, res: Response, next: NextFunction) {
    const newUser = req.body;

    if (
      !newUser ||
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.email ||
      !newUser.password
    ) {
      return next(
        badRequestError(
          'Please provide first name, last name, email and password'
        )
      );
    }

    if (!userController.checkPassword(newUser.password)) {
      return next(
        notAcceptableError(
          'Password must be at least 6 characters long and contain a letter and number'
        )
      );
    }
    if (!userController.checkEmail(newUser.email)) {
      return next(notAcceptableError('Please enter a valid email address'));
    }
    await userService.registerUser(newUser);

    res.status(201).json({ message: 'Registration was successful' });
  },

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    const { email, oldPassword, newPassword } = req.body;

    if (oldPassword === newPassword) {
      return next(
        badRequestError(
          'The new password must be different from the old password'
        )
      );
    }

    if (!userController.checkPassword(newPassword)) {
      return next(
        notAcceptableError(
          'Password must be at least 6 characters long and contain a letter and number'
        )
      );
    }
    await userService.updatePassword(email, oldPassword, newPassword);

    res.status(200).json({ message: 'Password has been updated' });
  },

  async loginUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(badRequestError('Please enter your email and password'));
    }

    const user = await userService.loginUser(email, password);
    const accessToken = await jwtService.generateAccessToken(
      user.id,
      user.email
    );

    res.status(200).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessToken
    });
  },

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);

    if (!id || isNaN(id) || id < 1) {
      return next(badRequestError('User id needs to be a positive integer'));
    }
    await userService.deleteUser(id);

    res.status(200).json({ message: 'Account deleted successfully' });
  },

  checkPassword(password: string): boolean {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z]).{6,}$/;
    return passwordPattern.test(password);
  },

  checkEmail(email: string): boolean {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailPattern.test(email);
  }
};
