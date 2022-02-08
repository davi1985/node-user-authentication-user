/**
 * GET /users
 * GET /users/:uuid
 * POST /users
 * PUT /user/:uuid
 * DELETE /user/:uuid
 */

import { NextFunction, Request, Response, Router } from 'express';
import STATUS_CODE from 'http-status-codes';

import { UserRepository } from '../repositories/user-repository';

const usersRoute = Router();

usersRoute.get('/users', async (_: Request, response: Response) => {
  const userRepository = new UserRepository();
  const users = await userRepository.findAllUsers();

  return response.status(STATUS_CODE.OK).json(users);
});

usersRoute.get(
  '/users/:uuid',
  async (
    request: Request<{ uuid: string }>,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { uuid } = request.params;

      const userRepository = new UserRepository();
      const user = await userRepository.findById(uuid);

      return response.status(STATUS_CODE.OK).json(user);
    } catch (error) {
      next(error);
    }
  },
);

usersRoute.post('/users', async (request: Request, response: Response) => {
  const { username, password } = request.body;

  const userRepository = new UserRepository();
  const uuid = await userRepository.create({ username, password });

  return response.status(STATUS_CODE.CREATED).json(uuid);
});

usersRoute.put(
  '/users/:uuid',
  async (
    request: Request<{ uuid: string }>,
    response: Response,
    next: NextFunction,
  ) => {
    const { uuid } = request.params;
    const { username, password } = request.body;

    const userRepository = new UserRepository();
    await userRepository.updtate({ username, password, uuid });

    return response.status(STATUS_CODE.OK).json();
  },
);

usersRoute.delete(
  '/users/:uuid',
  async (
    request: Request<{ uuid: string }>,
    response: Response,
    next: NextFunction,
  ) => {
    const { uuid } = request.params;

    const userRepository = new UserRepository();
    await userRepository.remove(uuid);

    return response.status(STATUS_CODE.OK).json();
  },
);

export { usersRoute };
