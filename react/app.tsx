import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import axios from 'axios';

import { Keys } from '../config/keys';

import { routing } from './routing';
import store from './store';

axios.defaults.baseURL = '/api';
axios.defaults.headers.common['auth'] = Keys.api.GET;
axios.defaults.headers.post['auth'] = Keys.api.POST;

ReactDOM.render(
    <Provider store={store}>
        <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory} routes={routing} />
    </Provider>,
    document.getElementById('admin')
);