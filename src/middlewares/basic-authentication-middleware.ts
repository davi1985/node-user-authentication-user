import { NextFunction, Request, Response } from 'express';
import { ForbiddenError } from '../models/errors/forbidden-error.model';
import { UserRepository } from '../repositories/user-repository';

export const basicAuthenticationMiddleware = async (
  request: Request,
  _: Response,
  next: NextFunction,
) => {
  try {
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      throw new ForbiddenError('Credentials not informed');
    }

    const [authenticationType, token] = authorizationHeader?.split(' ');

    if (authenticationType !== 'Basic' || !token) {
      throw new ForbiddenError('Authentication type invalid.');
    }

    const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

    const [username, password] = tokenContent.split(':');

    if (!username || !password) {
      throw new ForbiddenError('Credentials are empty.');
    }

    const usersRepository = new UserRepository();

    const userFounded = await usersRepository.findByUserNameAndPassword(
      username,
      password,
    );

    if (!userFounded) {
      throw new ForbiddenError('Username or password are invalid.');
    }

    request.user = userFounded;

    next();
  } catch (error) {
    next(error);
  }
};
