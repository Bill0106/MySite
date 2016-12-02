import * as React from 'react';
import axios from 'axios';

import { Nav } from '../components/nav';
import { Keys } from '../../config/keys';

export class App extends React.Component<{}, {}> {
    constructor() {
        super();

        axios.defaults.baseURL = '/api';
        axios.defaults.headers.common['auth'] = Keys.api.GET;
        axios.defaults.headers.post['auth'] = Keys.api.POST;
    }

    render() {
        return (
            <div>
                <Nav/>
                { this.props.children }
            </div>
        )
    }
}