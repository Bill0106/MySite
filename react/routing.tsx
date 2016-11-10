import { App } from './containers/app';
import { Dashboard } from './containers/dashboard';
import { List } from './containers/list';
import { Game } from './containers/game';
import { Trophy } from './containers/trophy';
import { Gourmet } from './containers/gourmet';
import { HsSeason } from './containers/hs-season';
import { HsDeck } from './containers/hs-deck';
import { HsMatch } from './containers/hs-match';

const ROUTING_CONFIG = [
    {
        path: '/admin',
        component: App,
        indexRoute: { component: Dashboard },
        childRoutes: [
            { path: 'games', component: List },
            { path: 'games/:url', component: Game },
            { path: 'games/:url/trophy', component: Trophy },
            { path: 'gourmets', component: List },
            { path: 'gourmets/:id', component: Gourmet },
            { path: 'hearthstone-seasons', component: List },
            { path: 'hearthstone-seasons/:url', component: HsSeason },
            { path: 'hearthstone-decks', component: List },
            { path: 'hearthstone-decks/:id', component: HsDeck},
            { path: 'hearthstone-matches', component: List },
            { path: 'hearthstone-matches/add', component: HsMatch }
        ]
    }
];

export let routing = ROUTING_CONFIG;