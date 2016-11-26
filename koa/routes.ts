/// <reference path="../declarations.d.ts"/>

import * as path from 'path';
import * as Router from 'koa-router';
import * as send from 'koa-send';
import * as multer from 'koa-multer';

import { Keys } from '../config/keys';

import countController from './controllers/count.controller';
import imageController from './controllers/image.controller';
import gameController from './controllers/game.controller';
import gourmetController from './controllers/gourmet.controller';
import hearthstoneSeasonController from './controllers/hearthstone-season.controller';

const router = new Router();
const api = new Router();
const game = new Router();
const gourmet = new Router();
const hearthstoneSeason = new Router();

const upload = multer({ dest: 'uploads/' });

game.get('/', gameController.list)
  .post('/', gameController.create)
  .get('/:url', gameController.find)
  .post('/:url', gameController.update)
  .post('/:url/delete', gameController.remove);

gourmet.get('/', gourmetController.list)
  .post('/', gourmetController.create)
  .get('/:id', gourmetController.find)
  .post('/:id', gourmetController.update)
  .post('/:id/delete', gourmetController.remove);

hearthstoneSeason.get('/', hearthstoneSeasonController.list)
  .post('/', hearthstoneSeasonController.create)
  .get('/:url', hearthstoneSeasonController.find)
  .post('/:url', hearthstoneSeasonController.update)
  .post('/:url/delete', hearthstoneSeasonController.remove);

api.use(async (ctx, next) => {
  let auth = ctx.headers.auth;

  if (auth == Keys.api[ctx.method]) {
    await next();
  } else {
    ctx.status = 401;
    ctx.body = 'Unauthorized';
  }
})

api.get('/counts', countController.list)
  .post('/images', upload.single('file'), imageController.create)
  .use('/games', game.routes(), game.allowedMethods())
  .use('/gourmets', gourmet.routes(), gourmet.allowedMethods())
  .use('/hearthstone-seasons', hearthstoneSeason.routes(), hearthstoneSeason.allowedMethods());

router.use('/api', api.routes(), api.allowedMethods())
  .get('/admin*', async (ctx, next) => {
    await send(ctx, 'admin.html', { root: path.join(__dirname, '..', '/public') });
  })
  .get('*', async (ctx, next) => {
    await send(ctx, 'index.html', { root: path.join(__dirname, '..', '/public') });
  })

export default router;