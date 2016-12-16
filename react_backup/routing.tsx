import { App } from './containers/app';
import Dashboard from './containers/dashboard';
import { List } from './containers/list';
import { Game } from './containers/game';
import { Trophy } from './containers/trophy';
import { Gourmet } from './containers/gourmet';
import { HearthstoneSeason } from './containers/hearthstone-season';
import { HearthstoneDeck } from './containers/hearthstone-deck';
import { HearthstoneMatch } from './containers/hearthstone-match';
import { Blog } from './containers/blog';

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
            { path: 'hearthstone-seasons/:url', component: HearthstoneSeason },
            { path: 'hearthstone-decks', component: List },
            { path: 'hearthstone-decks/:id', component: HearthstoneDeck},
            { path: 'hearthstone-matches', component: List },
            { path: 'hearthstone-matches/add', component: HearthstoneMatch },
            { path: 'blogs', component: List },
            { path: 'blogs/:url', component: Blog }
        ]
    }
];

export let routing = ROUTING_CONFIG;