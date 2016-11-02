import * as React from 'react';
import axios from 'axios';

import { Nav } from '../components/nav';
import { AuthKeys } from '../../config/auth-keys';

export class App extends React.Component<{}, {}> {
    constructor() {
        super();

        axios.defaults.headers.common['auth'] = AuthKeys.get;
        axios.defaults.headers.post['auth'] = AuthKeys.post;
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