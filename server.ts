import * as Koa from 'koa';
import * as mongoose from 'mongoose';
import * as server from 'koa-static';

import router from './koa/routes';

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

app.listen(8888);

export default app;