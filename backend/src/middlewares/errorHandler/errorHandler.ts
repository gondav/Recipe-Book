import { Request, Response, NextFunction } from 'express';
import { IApiError } from '../../models/IApiError';

export default function errorHandler(
  error: IApiError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof Error || !error.status) {
    return res.status(500).send('Something went wrong, please try again.');
  }
  return res.status(error.status).json(error.message);
}
