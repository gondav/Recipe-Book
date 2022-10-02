import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { unauthorizedError } from '../../services/errorCreatorService';
import { jwtService } from '../../services/jwtService/jwt.service';

export default function authChecker(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = jwtService.getTokenFromRequest(req);

  if (!token) {
    return next(unauthorizedError('Not authorized'));
  }

  jwt.verify(token, config.jwt.secretKey as string, (err, payload) => {
    if (err) {
      return next(unauthorizedError('Not authorized'));
    }
    res.locals.payload = payload;

    return next();
  });
}
