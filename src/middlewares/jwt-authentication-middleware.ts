import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { ForbiddenError } from '../models/errors/forbidden-error.model';
import { UserRepository } from '../repositories/user-repository';

export const JWTAuthenticationMiddleware = async (
  request: Request,
  _: Response,
  next: NextFunction,
) => {
  try {
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      throw new ForbiddenError('Credentials not informed');
    }

    const [authenticationType, token] = authorizationHeader.split(' ');

    if (authenticationType !== 'Bearer' || !token) {
      throw new ForbiddenError('Authentication type invalid.');
    }

    try {
      const tokenPayload = JWT.verify(token, 'my_secret_key');

      if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
        throw new ForbiddenError('Invalid token.');
      }

      const user = {
        uuid: tokenPayload.sub,
        username: tokenPayload.username,
      };
      request.user = user;

      next();
    } catch (error) {
      throw new ForbiddenError('Invalid token.');
    }
  } catch (error) {
    next(error);
  }
};
