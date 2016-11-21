import * as path from 'path';
import * as Router from 'koa-router';
import * as send from 'koa-send';

import { ApiKeys } from '../config/api-keys';

import countController from './controllers/count.controller';
import gameController from './controllers/game.controller';
import gourmetController from './controllers/gourmet.controller';

const router = new Router();
const api = new Router();
const game = new Router();
const gourmet = new Router();

game.get('/', gameController.list)
  .post('/', gameController.creat)
  .get('/:url', gameController.find)
  .post('/:url', gameController.update)
  .post('/:url/delete', gameController.remove);

gourmet.get('/', gourmetController.list)
  .post('/', gourmetController.create)
  .get('/:id', gourmetController.find)
  .post('/:id', gourmetController.update)
  .post('/:id/delete', gourmetController.remove);

api.use(async (ctx, next) => {
  let auth = ctx.headers.auth;

  if (auth == ApiKeys[ctx.method]) {
    await next();
  } else {
    ctx.status = 401;
    ctx.body = 'Unauthorized';
  }
})

api.get('/counts', countController.list)
  .use('/games', game.routes(), game.allowedMethods())
  .use('/gourmets', gourmet.routes(), gourmet.allowedMethods());

router.use('/api', api.routes(), api.allowedMethods())
  .get('/admin*', async (ctx, next) => {
    await send(ctx, 'admin.html', { root: path.join(__dirname, '..', '/public') });
  })
  .get('*', async (ctx, next) => {
    await send(ctx, 'index.html', { root: path.join(__dirname, '..', '/public') });
  })

export default router;