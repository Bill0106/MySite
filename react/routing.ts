import App from './components/app.component';
import Dashboard from './containers/dashboard.container'

const ROUTING_CONFIG = [
    {
        path: '/admin',
        component: App,
        indexRoute: { component: Dashboard },
    }
];

export const routing = ROUTING_CONFIG;