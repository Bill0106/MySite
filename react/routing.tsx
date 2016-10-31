import { App } from './containers/app';
import { Dashboard } from './containers/dashboard';
import { Games } from './containers/games';
import { Game } from './containers/game';

const ROUTING_CONFIG = [
    {
        path: '/admin',
        component: App,
        indexRoute: { component: Dashboard },
        childRoutes: [
            { path: 'games', component: Games },
            { path: 'games/:url', component: Game }
        ]
    }
];


export let routing = ROUTING_CONFIG;