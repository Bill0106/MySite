import * as moment from 'moment';

import * as HearthstoneSeason from '../models/hearthstone-season.model';

const list = async (ctx) => {
    try {
        let limit = parseInt(ctx.query.limit) || 12;
        let page = parseInt(ctx.query.page) || 1;
        let skip = limit * (page - 1);

        let query = HearthstoneSeason.repositry.find();
        if (ctx.query.months) {
            let months = ctx.query.months.split(',');
            months = months.filter(month => month != '');
            query = query.where('month').in(months);
        } else {
            query = query.limit(limit).skip(skip);
        }

        ctx.body = {
            list: await query.sort({ month: 'desc' }),
            total: await HearthstoneSeason.repositry.count({}),
        };
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const find = async (ctx) => {
    try {
        let season = await HearthstoneSeason.repositry.findOne({ url: ctx.params.url });
        season.month = moment(season.month.toString(), 'YYYYMM').valueOf();
        ctx.body = season;
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const create = async (ctx) => {
    try {
        let data = ctx.request.body;
        data.month = moment(data.month, 'YYYY-MM-DD').startOf('month').startOf('day').format('YYYYMM');
        data.url = data.url || data.title.toLowerCase().replace(/ /g, '-').replace(/:/g, '');

        let season = new HearthstoneSeason.repositry(data);
        await season.save();

        ctx.body = season._id
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const update = async (ctx) => {
    try {
        let data = ctx.request.body;

        if (!Number.isInteger(data.month)) {
            data.month = moment(data.month, 'YYYY-MM-DD').startOf('month').startOf('day').format('YYYYMM');
        }
        data.url = data.url || data.title.toLowerCase().replace(/ /g, '-').replace(/:/g, '');

        let season = await HearthstoneSeason.repositry.findOne({ url: ctx.params.url });
        await season.update(data);

        ctx.body = season._id
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const remove = async (ctx) => {
    try {
        let season = await HearthstoneSeason.repositry.findOne({ url: ctx.params.url });

        await season.remove();

        ctx.body = season._id;
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

export default { list, find, create, update, remove }