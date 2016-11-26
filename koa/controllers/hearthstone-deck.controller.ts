import * as HearthstoneDeck from '../models/hearthstone-deck.model';

import { HsPlayerClasses } from '../../config/hs-player-classes';

const list = async (ctx) => {
    try {
        let limit = parseInt(ctx.query.limit) || 30;
        let page = parseInt(ctx.query.page) || 1;
        let skip = limit * (page - 1);

        ctx.body = {
            list: await HearthstoneDeck.repositry.find().limit(limit).skip(skip).sort({ active: 'desc' }),
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

        data.cards = formatCards(data.cards);
        
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

        data.cards = formatCards(data.cards);
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

function formatCards(cards: any): any {
    let tmp = [];
    for (let card of cards) {
        if (tmp[card._id]) {
            tmp[card._id] = 2;
        } else {
            tmp[card._id] = 1;
        }
    }

    let data = [];
    for (let card in tmp) {
        let item = {
            card: card,
            count: tmp[card],
        }

        data.push(item);
    }
    
    return data;
}

export default { list, find, create, update, remove, active, inactive }