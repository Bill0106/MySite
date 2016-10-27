import { App } from './containers/app';
import { Dashboard } from './containers/dashboard';
import { Games } from './containers/games';

const ROUTING_CONFIG = [
    {
        path: '/admin',
        component: App,
        indexRoute: { component: Dashboard },
        childRoutes: [
            { path: 'games', component: Games }
        ]
    }
];


export let routing = ROUTING_CONFIG;