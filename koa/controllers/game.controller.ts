import * as moment from 'moment';

import * as Game from '../models/game.model';
import * as GameTrophy from '../models/game-trophy.model';

const list = async (ctx) => {
    try {
        let limit = parseInt(ctx.query.limit) || 20;
        let page = parseInt(ctx.query.page) || 1;
        let skip = limit * (page - 1);

        let query = Game.repositry.find();

        if (ctx.query.ids) {
            let ids = ctx.query.ids.split(',');
            ids = ids.filter(id => id != '');
            query = query.where('_id').in(ids);
        } else {
            query = query.limit(limit).skip(skip).sort({ buy_at: 'desc' }).sort({ release_at: 'desc' });
        }

        let games = await query.exec();
        await games.map(game => {
            game.title = new Buffer(game.title, 'base64').toString();
        });

        ctx.body = {
            list: games,
            total: await Game.repositry.count({}),
        };
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const find = async (ctx) => {
    try {
        let game = await Game.repositry.findOne({ url: ctx.params.url });
        game.title = new Buffer(game.title, 'base64').toString();
        ctx.body = game;
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const create = async (ctx) => {
    try {
        let data = ctx.request.body;

        data.title = new Buffer(data.title).toString('base64');
        data.release_at = moment(data.release_at, 'YYYY-MM-DD').valueOf();
        data.buy_at = moment(data.buy_at, 'YYYY-MM-DD').valueOf();
        data.url = data.url || data.name.toLowerCase().replace(/ /g, '-').replace(/:/g, '');

        let game = new Game.repositry(data);
        await game.save();
        
        ctx.body = {
            success: true,
            data: {
                id: game._id
            }
        }
    } catch (error) {
        ctx.status = error.status || 500;
        ctx.body = {
            success: false,
            error: error.message,
        }
    }
}

const update = async (ctx) => {
    try {
        let data = ctx.request.body;

        data.title = new Buffer(data.title).toString('base64');
        data.release_at = moment(data.release_at, 'YYYY-MM-DD').valueOf();
        data.buy_at = moment(data.buy_at, 'YYYY-MM-DD').valueOf();
        data.url = data.url || data.name.toLowerCase().replace(/ /g, '-').replace(/:/g, '');

        await Game.repositry.findByIdAndUpdate(data.id, data);
        
        ctx.body = {
            success: true,
            data: {
                id: data.id
            }
        }
    } catch (error) {
        ctx.status = error.status || 500;
        ctx.body = {
            success: false,
            error: error.message,
        }
    }
}

const remove = async (ctx) => {
    try {
        let game = await Game.repositry.findOne({ url: ctx.params.url });

        let trophy = await GameTrophy.repositry.findOne({ game_id: game._id });
        if (trophy) {
            await trophy.remove();
        }

        await game.remove();

        ctx.body = {
            success: true,
            data: {
                id: game._id
            }
        }
    } catch (error) {
        ctx.status = error.status || 500;
        ctx.body = {
            success: false,
            error: error.message,
        }
    }
}

export default { list, find, create, update, remove }