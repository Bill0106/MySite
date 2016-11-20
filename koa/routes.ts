import * as Router from 'koa-router';
import { Request } from 'koa';

import auth from './middlewares/auth';

import gameController from './controllers/game.controller';
import gourmetController from './controllers/gourmet.controller';

const api = new Router();
const game = new Router();
const gourmet = new Router();

game
  .get('/', gameController.list)
  .post('/', gameController.creat)
  .get('/:url', gameController.find)
  .post('/:url', gameController.update)
  .post('/:url/delete', gameController.remove);

gourmet
  .get('/', gourmetController.list)
  .post('/', gourmetController.create)
  .get('/:id', gourmetController.find)
  .post('/:id', gourmetController.update)
  .post('/:id/delete', gourmetController.remove);

api
  .prefix('/api')
  .use(auth.api)
  .use('/games', game.routes(), game.allowedMethods())
  .use('/gourmets', gourmet.routes(), gourmet.allowedMethods());

export default api;