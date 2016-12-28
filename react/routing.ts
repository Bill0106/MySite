import App from './components/app.component';
import Dashboard from './containers/dashboard.container';
import Games from './containers/games.container';
import Game from './containers/game.container';
import Gourmets from './containers/gourmets.container';
import Gourmet from './containers/gourmet.container';
import HearthstoneSeasons from './containers/hearthstone-seasons.container';

const ROUTING_CONFIG = [
    {
        path: '/admin',
        component: App,
        indexRoute: { component: Dashboard },
        childRoutes: [
            { path: 'games', component: Games },
            { path: 'games/:url', component: Game },
            { path: 'gourmets', component: Gourmets },
            { path: 'gourmets/:id', component: Gourmet },
            { path: 'hearthstone-seasons', component: HearthstoneSeasons },
        ]
    }
];

export const routing = ROUTING_CONFIG;