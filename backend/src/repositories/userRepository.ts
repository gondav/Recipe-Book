import { IUserDomainModel } from '../models/domainModels/IUserDomainModel';
import { db } from '../data/connection';
import { IGetUserDataModel } from '../models/dataModels/IGetUserDataModel';
import { IRegisterUserDataModel } from 'src/models/dataModels/IRegisterUserDataModel';
import { IDbResultDataModel } from 'src/models/dataModels/IDbResultDataModel';

export const userRepository = {
  async getUserById(userId: number): Promise<IUserDomainModel> {
    return await db.query<IUserDomainModel>('SELECT * FROM user WHERE id = ?', [
      String(userId)
    ]);
  },

  async getUserByEmail(email: string): Promise<IGetUserDataModel> {
    return await db.query<IGetUserDataModel>(
      'SELECT email, password FROM user WHERE email = ?',
      [email]
    );
  },

  async registerUser(
    registerUser: IRegisterUserDataModel
  ): Promise<IDbResultDataModel> {
    return await db.query<IDbResultDataModel>(
      'INSERT INTO recipe_book.user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
      [
        registerUser.firstName,
        registerUser.lastName,
        registerUser.email,
        registerUser.password
      ]
    );
  },

  async updatePassword(
    newPassword: string,
    email: string
  ): Promise<IDbResultDataModel> {
    return await db.query<IDbResultDataModel>(
      'UPDATE recipe_book.user SET password = ? WHERE email = ?',
      [newPassword, email]
    );
  },

  async deleteUser(userId: number): Promise<IDbResultDataModel> {
    return await db.query<IDbResultDataModel>(
      'DELETE FROM recipe_book.user WHERE id = ?',
      [String(userId)]
    );
  }
};
