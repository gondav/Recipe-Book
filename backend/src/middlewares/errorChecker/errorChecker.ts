import { Request, Response, NextFunction } from 'express';

const errorChecker =
  (middleWare: Function) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(middleWare(req, res, next)).catch(next);
  };

export default errorChecker;
