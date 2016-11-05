import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import { routing } from './routing';

ReactDOM.render(
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory} routes={routing} />,
    document.getElementById('admin')
);