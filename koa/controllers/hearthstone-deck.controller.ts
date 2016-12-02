import * as HearthstoneDeck from '../models/hearthstone-deck.model';

import { HsPlayerClasses } from '../../config/hs-player-classes';

const list = async (ctx) => {
    try {
        let limit = parseInt(ctx.query.limit) || 30;
        let page = parseInt(ctx.query.page) || 1;
        let skip = limit * (page - 1);

        let query = HearthstoneDeck.repositry.find();
        if (ctx.query.ids) {
            let ids = ctx.query.ids.split(',');
            ids = ids.filter(id => id != '');
            query = query.where('_id').in(ids);
        } else {
            query = query.limit(limit).skip(skip);
        }

        ctx.body = {
            list: await query.sort({ active: 'desc' }),
            total: await HearthstoneDeck.repositry.count({}),
        };
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const find = async (ctx) => {
    try {
        ctx.body = await HearthstoneDeck.repositry.findById(ctx.params.id);
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const create = async (ctx) => {
    try {
        let data = ctx.request.body;

        if (!HsPlayerClasses.find(item => item.value == data.playerClass)) {
            throw "Invalide Class";
        }
        
        let deck = new HearthstoneDeck.repositry(data);
        await deck.save();

        ctx.body = {
            success: true,
            data: {
                id: deck._id
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

        if (!HsPlayerClasses.find(item => item.value == data.playerClass)) {
            throw "Invalide Class";
        }

        await HearthstoneDeck.repositry.findByIdAndUpdate(ctx.params.id, data);

        ctx.body = {
            success: true,
            data: {
                id: data.id
            }
        }
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const remove = async (ctx) => {
    try {
        await HearthstoneDeck.repositry.findByIdAndRemove(ctx.params.id);

        ctx.body = {
            success: true
        }
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const active = async (ctx) => {
    try {
        let deck = await HearthstoneDeck.repositry.findById(ctx.params.id);
        if (!deck) {
            throw "Deck Not Found"
        }

        if (deck.active) {
            throw "Deck Has Actived"
        }

        deck.active = true;
        await deck.update(deck);

        ctx.body = {
            success: true
        }
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const inactive = async (ctx) => {
    try {
        let deck = await HearthstoneDeck.repositry.findById(ctx.params.id);
        if (!deck) {
            throw "Deck Not Found"
        }

        if (!deck.active) {
            throw "Deck Has Inactived"
        }

        deck.active = false;
        await deck.update(deck);

        ctx.body = {
            success: true
        }
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

export default { list, find, create, update, remove, active, inactive }