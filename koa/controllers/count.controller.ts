import * as Game from '../models/game.model';
import * as Gourmet from '../models/gourmet.model';
import * as HearthstoneSeason from '../models/hearthstone-season.model';
import * as HearthstoneDeck from '../models/hearthstone-deck.model';
import * as HearthstoneMatch from '../models/hearthstone-match.model';

const list = async (ctx, next) => {
    try {
        ctx.body = [
            {
                table: 'games',
                count: await Game.repositry.count({})
            },
            {
                table: 'gourmets',
                count: await Gourmet.repositry.count({})
            },
            {
                table: 'hearthstone-seasons',
                count: await HearthstoneSeason.repositry.count({})
            },
            {
                table: 'hearthstone-decks',
                count: await HearthstoneDeck.repositry.count({})
            },
            {
                table: 'hearthstone-matches',
                count: await HearthstoneMatch.repositry.count({})
            }
        ]
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

export default { list }