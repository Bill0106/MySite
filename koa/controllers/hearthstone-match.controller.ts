import * as moment from 'moment';

import * as HearthstoneDeck from '../models/hearthstone-deck.model';
import * as HearthstoneMatch from '../models/hearthstone-match.model';

import { HsPlayerClasses } from '../../config/hs-player-classes';
import { HsMatchResult } from '../../config/hs-match-result';

const list = async (ctx) => {
    try {
        let limit = parseInt(ctx.query.limit) || 100;
        let page = parseInt(ctx.query.page) || 1;
        let skip = limit * (page - 1);

        let startTime = moment().startOf('month').startOf('day').valueOf();
        let endTime = moment().endOf('month').endOf('day').valueOf();
        if (ctx.query.season) {
            startTime = moment(ctx.query.season, 'x').startOf('month').startOf('day').valueOf();
            endTime = moment(ctx.query.season, 'x').endOf('month').endOf('day').valueOf();
        } else if (ctx.query.year) {
            startTime = moment(ctx.query.year, 'YYYY').startOf('year').startOf('day').valueOf();
            endTime = moment(ctx.query.year, 'YYYY').endOf('year').endOf('day').valueOf();
        }
        
        let query = HearthstoneMatch.repositry.find();
        if (ctx.query.deck) {
            query = query.where('deck_id').equals(ctx.query.deck);
        } else {
            query = query.where('time').gte(startTime).lte(endTime);
        }

        ctx.body = {
            list: await query.sort({ time: 'desc'}).exec(),
            total: await query.count({})
        }
    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
}

const create = async (ctx) => {
    try {
        let data = ctx.request.body;

        let deck = await HearthstoneDeck.repositry.findById(data.deck);
        if (!deck) {
            throw "Deck Not Found";
        }

        if (!HsPlayerClasses.find(item => item.value == data.opponent)) {
            throw "Invalid Opponent";
        }

        if (!HsMatchResult.find(item => item.value == data.result)) {
            throw "Invalid Result";
        }

        data.time = moment().valueOf();
        let match = new HearthstoneMatch.repositry(data);
        await match.save();

        ctx.body = {
            success: true,
            data: {
                id: match._id
            }
        }
    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
}

const remove = async (ctx) => {
    try {
        await HearthstoneMatch.repositry.findByIdAndRemove(ctx.params.id);

        ctx.body = {
            success: true,
        }
    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
}

export default { list, create, remove }