import { IApiError } from '../models/IApiError';

const generalError =
  (status: number) =>
  (message: string): IApiError => {
    return {
      status,
      message
    };
  };

export const badRequestError = generalError(400);
export const forbiddenError = generalError(403);
export const notFoundError = generalError(404);
export const notAcceptableError = generalError(406);
export const conflictError = generalError(409);
export const serverError = generalError(500);
