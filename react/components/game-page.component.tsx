import * as React from 'react';

import { ItemProps } from '../interface/item.interface';

class GamePage extends React.Component<ItemProps, void> {
    componentDidMount() {
        const { location } = this.props;
        console.log(location);
    }
    

    render() {
        return (
            <div>
                Game
            </div>
        );
    }
}

export default GamePage;