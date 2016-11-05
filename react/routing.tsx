import { App } from './containers/app';
import { Dashboard } from './containers/dashboard';
import { Games } from './containers/games';
import { Game } from './containers/game';
import { Trophy } from './containers/trophy';
import { Gourmets } from './containers/gourmets';

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
        ]
    }
];

export let routing = ROUTING_CONFIG;