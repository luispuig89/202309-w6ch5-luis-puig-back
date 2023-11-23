import { Router as createRouter } from 'express';
import { FilmsController } from '../controllers/films.controller.js';
import createDebug from 'debug';
import { FilmsMongoRepo } from '../repos/films/films.mongo.repo.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';

const debug = createDebug('W7E:notes:router');

export const filmsRouter = createRouter();
debug('Starting');

const repo = new FilmsMongoRepo();
const controller = new FilmsController(repo);
const interceptor = new AuthInterceptor();

filmsRouter.get('/', controller.getAll.bind(controller));
filmsRouter.get('/search', controller.search.bind(controller));
filmsRouter.get('/:id', controller.getById.bind(controller));
filmsRouter.post(
  '/',
  interceptor.authorization.bind(interceptor),
  controller.create.bind(controller)
);
filmsRouter.patch('/:id', controller.update.bind(controller));
filmsRouter.delete('/:id', controller.delete.bind(controller));
