import jwt from 'jsonwebtoken';
import config from '../../config';
import { Request } from 'express';
import { serverError } from '../errorCreatorService';

export const jwtService = {
  async generateAccessToken(id: number, email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const payload = {
        id,
        email
      };
      const secretKey = config.jwt.secretKey;
      const options = { expiresIn: '30m' };

      jwt.sign(payload, secretKey as string, options, (err, token) => {
        if (err || !token) {
          reject(serverError('Something went wrong, please try again'));
        }
        resolve(token!);
      });
    });
  },

  getTokenFromRequest(req: Request): string | undefined {
    return req.headers.authorization?.split(' ')[1];
  }
};
