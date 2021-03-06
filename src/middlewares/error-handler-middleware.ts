import { NextFunction, Request, Response } from 'express';
import STATUS_CODE from 'http-status-codes';
import { DatabaseError } from '../models/errors/database-error-model';
import { ForbiddenError } from '../models/errors/forbidden-error.model';

export const errorHandler = (error: any, _: Request, response: Response) => {
  if (error instanceof DatabaseError) {
    return response.sendStatus(STATUS_CODE.BAD_REQUEST);
  }

  if (error instanceof ForbiddenError) {
    return response.sendStatus(STATUS_CODE.FORBIDDEN);
  }

  return response.sendStatus(STATUS_CODE.INTERNAL_SERVER_ERROR);
};
