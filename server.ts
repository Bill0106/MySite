import * as Koa from 'koa';
import * as mongoose from 'mongoose';
import * as server from 'koa-static';
import * as send from 'koa-send';

import router from './koa/routes';

(<any>mongoose).Promise = global.Promise;
mongoose.connect('mongodb://localhost/database');
mongoose.connection.on('error', console.error);

const app = new Koa();

app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;

    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app
    .use(server(__dirname + '/public'))
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async (ctx, next) => {
        if (ctx.path.indexOf('/api') === 0) {
            next();
        } else if (ctx.path.indexOf('/admin') === 0) {
            await send(ctx, 'admin.html', { root: __dirname + '/public' });
        } else {
            await send(ctx, 'index.html', { root: __dirname + '/public' });
        }
    })

app.listen(8888);

export default app;