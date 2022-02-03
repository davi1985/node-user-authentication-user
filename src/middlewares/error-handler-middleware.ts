import { NextFunction, Request, Response } from 'express';
import STATUS_CODE from 'http-status-codes';
import { DatabaseError } from '../models/errors/database-error-model';

export const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error instanceof DatabaseError) {
    return response.sendStatus(STATUS_CODE.BAD_REQUEST);
  }

  return response.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
};
