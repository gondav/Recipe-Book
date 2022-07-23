import { IRegisterUserDataModel } from '../../models/dataModels/IRegisterUserDataModel';
import { IUserDomainModel } from '../../models/domainModels/IUserDomainModel';
import { userRepository } from '../../repositories/userRepository';
import {
  conflictError,
  forbiddenError,
  notFoundError,
  serverError
} from '../errorCreatorService';
import { hashPasswordService } from '../hashPasswordService/hashPasswordService';

export const userService = {
  async getUserById(userId: number): Promise<IUserDomainModel> {
    const user = await userRepository.getUserById(userId);

    if (!Object.keys(user).length) {
      return Promise.reject(notFoundError('User does not exist'));
    }
    return user;
  },

  async registerUser(newUser: IRegisterUserDataModel): Promise<void> {
    const registeredUser = await userRepository.getUserByEmail(newUser.email);

    if (Object.keys(registeredUser).length) {
      return Promise.reject(
        conflictError(`User with email ${newUser.email} already exists`)
      );
    }
    const newUserRegistration = { ...newUser };
    newUserRegistration.password =
      await hashPasswordService.generateHashedPassword(newUser.password);

    const registration = await userRepository.registerUser(newUserRegistration);

    if (registration.affectedRows < 1) {
      return Promise.reject(serverError('Cannot add registration'));
    }
  },

  async updatePassword(
    email: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const registeredUser = await userRepository.getUserByEmail(email);

    if (!Object.keys(registeredUser).length) {
      return Promise.reject(
        notFoundError('User not found or account does not exist')
      );
    }
    const isPasswordValid = await hashPasswordService.comparePassword(
      oldPassword,
      registeredUser.password
    );

    if (!isPasswordValid) {
      Promise.reject(
        forbiddenError('You have entered an invalid username or password')
      );
    }
    const password = await hashPasswordService.generateHashedPassword(
      newPassword
    );
    const passwordUpdate = await userRepository.updatePassword(password, email);

    if (passwordUpdate.affectedRows < 1) {
      return Promise.reject(serverError('Cannot update password'));
    }
  },

  async loginUser(email: string, password: string): Promise<IUserDomainModel> {
    const user = await userRepository.getUserByEmail(email);

    if (!Object.keys(user).length) {
      return Promise.reject(
        forbiddenError('You have entered an invalid username or password')
      );
    }
    const isPasswordValid = hashPasswordService.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return Promise.reject(
        forbiddenError('You have entered an invalid username or password')
      );
    }
    return user;
  },

  async deleteUser(userId: number): Promise<void> {
    const result = await userRepository.deleteUser(userId);

    if (result.affectedRows < 1) {
      return Promise.reject(serverError('Cannot delete user'));
    }
  }
};
