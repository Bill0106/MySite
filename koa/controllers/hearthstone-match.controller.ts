import * as moment from 'moment';

import * as HearthstoneDeck from '../models/hearthstone-deck.model';
import * as HearthstoneMatch from '../models/hearthstone-match.model';

import { HearthstonePlayerClasses } from '../../config/hearthstone-player-classes';
import { HearthstoneMatchResult } from '../../config/hearthstone-match-result';

const list = async (ctx) => {
    try {
        let query = HearthstoneMatch.repositry.find();

        if (ctx.query.season) {
            let startTime = moment(ctx.query.season, 'x').startOf('month').startOf('day').valueOf();
            let endTime = moment(ctx.query.season, 'x').endOf('month').endOf('day').valueOf();

            query = query.where('time').gte(startTime).lte(endTime);
        } else if (ctx.query.year) {
            let startTime = moment(ctx.query.year, 'YYYY').startOf('year').startOf('day').valueOf();
            let endTime = moment(ctx.query.year, 'YYYY').endOf('year').endOf('day').valueOf();

            query = query.where('time').gte(startTime).lte(endTime);
        } else if (ctx.query.deck) {
            query = query.where('deck_id').equals(ctx.query.deck);
        } else {
            let limit = parseInt(ctx.query.limit) || 100;
            let page = parseInt(ctx.query.page) || 1;
            let skip = limit * (page - 1);

            query = query.limit(limit).skip(skip);
        }

        ctx.body = {
            list: await query.sort({ time: 'desc' }).exec(),
            total: await HearthstoneMatch.repositry.count({}),
        };
    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
};

const create = async (ctx) => {
    try {
        let data = ctx.request.body;

        let deck = await HearthstoneDeck.repositry.findById(data.deck);
        if (!deck) {
            throw 'Deck Not Found';
        }

        if (!HearthstonePlayerClasses.find(item => item.value === data.opponent)) {
            throw 'Invalid Opponent';
        }

        if (!HearthstoneMatchResult.find(item => item.value === data.result)) {
            throw 'Invalid Result';
        }

        data.deck_id = deck._id;
        data.time = moment().valueOf();
        let match = new HearthstoneMatch.repositry(data);
        await match.save();

        ctx.body = {
            success: true,
            data: {
                id: match._id,
            },
        };
    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
};

const remove = async (ctx) => {
    try {
        const match = await HearthstoneMatch.repositry.findById(ctx.params.id);
        if (!match) {
            throw new Error('Match Not Found');
        }

        await match.remove();

        ctx.body = match._id;
    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
};

export default { list, create, remove };