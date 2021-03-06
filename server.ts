import * as Koa from 'koa';
import * as mongoose from 'mongoose';
import * as server from 'koa-static';
import * as bodyParser from 'koa-bodyparser';

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

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.set('WWW-Authenticate', 'Basic');
            ctx.body = 'Unauthorized';
        } else {
            throw err;
        }
    }
});

app.use(bodyParser())
    .use(server(__dirname + '/public'))
    .use(router.routes())
    .use(router.allowedMethods())

console.log('Server running on port 8888');
app.listen(8888);

export default app;