import { NextFunction, Request, Response, Router } from 'express';
import STATUS_CODE from 'http-status-codes';

const statusRoute = Router();

statusRoute.get('/status', (_: Request, res: Response) => {
  res.status(STATUS_CODE.OK).send({ foo: 'Success' });
});

export { statusRoute };
