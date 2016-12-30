import * as HearthstoneDeck from '../models/hearthstone-deck.model';

import { HearthstonePlayerClasses } from '../../config/hearthstone-player-classes';

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
        } else if (ctx.query.active) {
            query = query.where('active').equals(ctx.query.active);
        } else {
            query = query.limit(limit).skip(skip);
        }

        ctx.body = {
            list: await query.sort({ active: 'desc' }).sort({ playerClass: 'desc' }),
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

        if (!HearthstonePlayerClasses.find(item => item.value == data.playerClass)) {
            throw {message: "Invalide Class"};
        }
        
        let deck = new HearthstoneDeck.repositry(data);
        await deck.save();

        ctx.body = deck._id
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const update = async (ctx) => {
    try {
        let data = ctx.request.body;

        if (!HearthstonePlayerClasses.find(item => item.value == data.playerClass)) {
            throw {message: "Invalide Class"};
        }

        let deck = await HearthstoneDeck.repositry.findById(ctx.params.id);
        deck.update(data);

        ctx.body = deck._id
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const remove = async (ctx) => {
    try {
        let deck = await HearthstoneDeck.repositry.findById(ctx.params.id);
        deck.remove();

        ctx.body = deck._id;
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const active = async (ctx) => {
    try {
        let deck = await HearthstoneDeck.repositry.findById(ctx.params.id);
        if (!deck) {
            throw {message: "Deck Not Found"};
        }

        if (deck.active) {
            throw {message: "Deck Has Actived"};
        }

        deck.active = true;
        await deck.update(deck);

        ctx.body = deck._id;
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

const inactive = async (ctx) => {
    try {
        let deck = await HearthstoneDeck.repositry.findById(ctx.params.id);
        if (!deck) {
            throw {message: "Deck Not Found"};
        }

        if (!deck.active) {
            throw {message: "Deck Has Inactived"};
        }

        deck.active = false;
        await deck.update(deck);

        ctx.body = deck._id;
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

export default { list, find, create, update, remove, active, inactive }