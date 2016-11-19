import * as Gourmet from '../models/gourmet.model';

const list = async (ctx, next) => {
    let limit = parseInt(ctx.query.limit) || 20;
    let page = parseInt(ctx.query.page) || 1;
    let skip = limit * (page - 1);

    try {
        let result = await Promise.all([
            Gourmet.repositry.find().limit(limit).skip(skip).sort({ buy_at: 'desc' }).sort({ release_at: 'desc' }),
            Gourmet.repositry.count({})
        ]);

        ctx.body = {
            list: result[0],
            total: result[1],
        };
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const find = async (ctx, next) => {
    try {
        let gourmet = await Gourmet.repositry.findById(ctx.params.id); 
        gourmet.food = new Buffer(gourmet.food, 'base64').toString();
        gourmet.restaurant = new Buffer(gourmet.restaurant, 'base64').toString();
        ctx.body = gourmet;
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const create = async (ctx, next) => {}

const update = async (ctx, next) => {}

const remove = async (ctx, next) => {}

export default { list, find, create, update, remove }