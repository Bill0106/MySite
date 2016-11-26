import * as HearthstoneCard from '../models/hearthstone-card.model';

const list = async (ctx) => {
    try {
        let query = HearthstoneCard.repositry.find();

        if (ctx.query.playerClass) {
            query = query.where('playerClass').equals(ctx.query.playerClass);
        }

        if (ctx.query.standard) {
            query = query.where('standard').equals(true);
        }

        if (ctx.query.cost) {
            if (ctx.query.cost == 1) {
                query = query.where('cost').lte(1);
            } else if (ctx.query.cost == 7) {
                query = query.where('cost').gte(7);
            } else {
                query = query.where('cost').equals(ctx.query.cost);
            }
        }

        if (ctx.query.ids) {
            let ids = ctx.query.ids.split(',');
            ids = ids.filter(id => id != '');
            query = HearthstoneCard.repositry.find().where('_id').in(ids);
        }

        ctx.body = await query.sort({ cost: 'asc' }).exec();
    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = error.message;
    }
}

export default { list }