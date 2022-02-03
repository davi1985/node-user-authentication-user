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

usersRoute.get(
  '/users',
  async (request: Request, response: Response, next: NextFunction) => {
    const userRepository = new UserRepository();
    const users = await userRepository.findAllUsers();

    return response.status(STATUS_CODE.OK).json(users);
  },
);

usersRoute.get(
  '/users/:uuid',
  async (
    request: Request<{ uuid: string }>,
    response: Response,
    next: NextFunction,
  ) => {
    const { uuid } = request.params;

    const userRepository = new UserRepository();
    const user = await userRepository.findById(uuid);

    return response.status(STATUS_CODE.OK).json(user);
  },
);

// usersRoute.post(
//   '/users',
//   (request: Request, response: Response, next: NextFunction) => {
//     const { username } = request.body;

//     const user = {
//       uuid: 'asdf1231',
//       username,
//     };

//     users.push(user);

//     return response.status(STATUS_CODE.CREATED).json(user);
//   },
// );

usersRoute.put(
  '/users/:uuid',
  (
    request: Request<{ uuid: string }>,
    response: Response,
    next: NextFunction,
  ) => {
    const { uuid } = request.params;
    const { username } = request.body;

    return response.status(STATUS_CODE.OK).json({ uuid, username });
  },
);

usersRoute.delete(
  '/users/:uuid',
  (
    request: Request<{ uuid: string }>,
    response: Response,
    next: NextFunction,
  ) => {
    const { uuid } = request.params;

    return response.status(STATUS_CODE.OK).json();
  },
);
export { usersRoute };
