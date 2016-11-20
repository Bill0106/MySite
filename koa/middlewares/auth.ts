import { ApiAuth } from '../../config/api-keys';

const api = async (ctx, next) => {
    let auth = ctx.headers.auth;
    
    if (auth == ApiAuth[ctx.method]) {
        await next();
    } else {
        ctx.status = 401;
        ctx.body = 'Unauthorized';
    }
}

export default { api }