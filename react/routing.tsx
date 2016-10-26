import { App } from './components/app.component';
import { Dashboard } from './components/dashboard.component';
import { Games } from './components/games.component';

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