import * as Game from '../models/game.model';
import * as Gourmet from '../models/gourmet.model';
import * as HearthstoneSeason from '../models/hearthstone-season.model';
import * as HearthstoneDeck from '../models/hearthstone-deck.model';
import * as HearthstoneMatch from '../models/hearthstone-match.model';
import * as Blog from '../models/blog.model';

const list = async (ctx, next) => {
    try {
        ctx.body = [
            {
                title: 'Games',
                count: await Game.repositry.count({})
            },
            {
                title: 'Gourmets',
                count: await Gourmet.repositry.count({})
            },
            {
                title: 'Hearthstone-Seasons',
                count: await HearthstoneSeason.repositry.count({})
            },
            {
                title: 'Hearthstone-Decks',
                count: await HearthstoneDeck.repositry.count({})
            },
            {
                title: 'Hearthstone-Matches',
                count: await HearthstoneMatch.repositry.count({})
            },
            {
                title: 'Blogs',
                count: await Blog.repositry.count({})
            }
        ]
    } catch (error) {
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}

export default { list }