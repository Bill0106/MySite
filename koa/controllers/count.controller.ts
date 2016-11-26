import * as Game from '../models/game.model';
import * as Gourmet from '../models/gourmet.model';
import * as HearthstoneSeason from '../models/hearthstone-season.model';
import * as HearthstoneDeck from '../models/hearthstone-deck.model';
import * as HearthstoneMatch from '../models/hearthstone-match.model';

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
            },
            {
                table: 'Hearthstone Decks',
                count: await HearthstoneDeck.repositry.count({})
            },
            {
                table: 'Hearthstone Matches',
                count: await HearthstoneMatch.repositry.count({})
            }
        ]
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

export default { list }