import jwt from 'jsonwebtoken';
import config from '../../config';
import { Request } from 'express';
import { serverError } from '../errorCreatorService';
import { IJwtPayload } from '../../models/IJwtPayload';

export const jwtService = {
  async generateAccessToken(id: number, email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const payload: IJwtPayload = {
        id,
        email
      };
      const secretKey = config.jwt.secretKey;
      const options = { expiresIn: config.jwt.expiresIn };

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
  },

  getUserIdFromTokenPayload(req: Request): number | null {
    const token = this.getTokenFromRequest(req);

    if (!token) {
      return null;
    }
    const decoded = jwt.decode(token) as IJwtPayload;

    return decoded.id;
  }
};
