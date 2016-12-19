import App from './components/app.component'
import Dashboard from './containers/dashboard.container'
import Games from './containers/games.container'

const ROUTING_CONFIG = [
    {
        path: '/admin',
        component: App,
        indexRoute: { component: Dashboard },
        childRoutes: [
            { path: 'games', component: Games },
        ]
    }
];

export const routing = ROUTING_CONFIG;