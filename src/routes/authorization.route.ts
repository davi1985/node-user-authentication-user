import { NextFunction, Request, Response, Router } from 'express';
import JWT from 'jsonwebtoken';
import { ForbiddenError } from '../models/errors/forbidden-error.model';
import { UserRepository } from '../repositories/user-repository';
import STATUS_CODE from 'http-status-codes';
import { basicAuthenticationMiddleware } from '../middlewares/basic-authentication-middleware';

const authorizationRoute = Router();

authorizationRoute.post(
  '/token',
  basicAuthenticationMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = request.user;

      if (!user) {
        throw new ForbiddenError('User not informed.');
      }

      const jwtPayload = { username: user.username };
      const jwtOptions = { subject: user?.uuid };
      const secretKey = 'my_secret_key';

      const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

      return response.status(STATUS_CODE.OK).json({ token: jwt });
    } catch (error) {
      next(error);
    }
  },
);

export { authorizationRoute };
