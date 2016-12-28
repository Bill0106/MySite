import * as moment from 'moment';

import * as Gourmet from '../models/gourmet.model';

const list = async (ctx) => {
    try {
        let limit = parseInt(ctx.query.limit) || 20;
        let page = parseInt(ctx.query.page) || 1;
        let skip = limit * (page - 1);

        let gourmets = await Gourmet.repositry.find().limit(limit).skip(skip).sort({ date: 'desc' });
        for (let i = 0; i < gourmets.length; i++) {
            gourmets[i].food = new Buffer(gourmets[i].food, 'base64').toString();
            gourmets[i].restaurant = new Buffer(gourmets[i].restaurant, 'base64').toString();
        }

        ctx.body = {
            list: gourmets,
            total: await Gourmet.repositry.count({})
        };
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const find = async (ctx) => {
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

const create = async (ctx) => {
    try {
        let data = ctx.request.body;

        data.food = new Buffer(data.food).toString('base64');
        data.restaurant = new Buffer(data.restaurant).toString('base64');
        data.date = moment(data.date, 'YYYY-MM-DD').valueOf();

        let gourmet = new Gourmet.repositry(data);
        await gourmet.save();

        ctx.body = {
            success: true,
            data: {
                id: gourmet._id
            }
        }
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const update = async (ctx) => {
    try {
        let data = ctx.request.body;

        data.food = new Buffer(data.food).toString('base64');
        data.restaurant = new Buffer(data.restaurant).toString('base64');
        data.date = moment(data.date, 'YYYY-MM-DD').valueOf();

        await Gourmet.repositry.findByIdAndUpdate(ctx.params.id, data);

        ctx.body = {
            success: true,
            data: {
                id: ctx.params.id
            }
        }
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const remove = async (ctx) => {
    try {
        let gourmet = await Gourmet.repositry.findById(ctx.params.id);
        await gourmet.remove();

        ctx.body = gourmet._id;
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

export default { list, find, create, update, remove }