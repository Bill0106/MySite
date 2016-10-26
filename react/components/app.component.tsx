import * as React from 'react';

import { Nav } from './nav.component';

export class App extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <Nav/>
                { this.props.children }
            </div>
        )
    }
}