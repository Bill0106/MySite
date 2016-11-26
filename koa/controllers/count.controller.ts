import * as Game from '../models/game.model';
import * as Gourmet from '../models/gourmet.model';
import * as HearthstoneSeason from '../models/hearthstone-season.model';

const list = async (ctx, next) => {
    try {
        ctx.body = [
            {
                table: 'Games',
                count: await Game.repositry.count({})
            },
            {
                table: 'Gourmets',
                count: await Gourmet.repositry.count({})
            },
            {
                table: 'Hearthstone Seasons',
                count: await HearthstoneSeason.repositry.count({})
            }
        ]
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

export default { list }