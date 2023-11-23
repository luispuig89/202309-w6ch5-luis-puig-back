import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repos/users/users.mongo.repo.js';
import { Auth } from '../services/auth.js';

const debug = createDebug('W7E:users:controller');

export class UsersController {
  // eslint-disable-next-line no-unused-vars
  constructor(private repo: UsersMongoRepo) {
    debug('Instantiated');
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.getAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.create(req.body);
      res.status(201);
      res.statusMessage = 'Created';
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.login(req.body);

      const data = {
        user: result,
        token: Auth.signJWT({
          id: result.id,
          email: result.email,
        }),
      };
      res.status(202);
      res.statusMessage = 'Accepted';
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}
