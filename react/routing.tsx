import { App } from './containers/app';
import { Dashboard } from './containers/dashboard';
import { Games } from './containers/games';
import { Game } from './containers/game';
import { Trophy } from './containers/trophy';
import { Gourmets } from './containers/gourmets';
import { Gourmet } from './containers/gourmet';
import { HsSeasons } from './containers/hs-seasons';
import { HsSeason } from './containers/hs-season';
import { HsDecks } from './containers/hs-decks';
import { HsDeck } from './containers/hs-deck';
import { HsMatches } from './containers/hs-matches';
import { HsMatch } from './containers/hs-match';

const ROUTING_CONFIG = [
    {
        path: '/admin',
        component: App,
        indexRoute: { component: Dashboard },
        childRoutes: [
            { path: 'games', component: Games },
            { path: 'games/:url', component: Game },
            { path: 'games/:url/trophy', component: Trophy },
            { path: 'gourmets', component: Gourmets },
            { path: 'gourmets/:id', component: Gourmet },
            { path: 'hearthstone-seasons', component: HsSeasons },
            { path: 'hearthstone-seasons/:url', component: HsSeason },
            { path: 'hearthstone-decks', component: HsDecks },
            { path: 'hearthstone-decks/:id', component: HsDeck},
            { path: 'hearthstone-matches', component: HsMatches },
            { path: 'hearthstone-match', component: HsMatch }
        ]
    }
];

export let routing = ROUTING_CONFIG;