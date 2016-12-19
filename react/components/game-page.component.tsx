import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface GamePageProps extends RouteComponentProps<void, void> {
    game: any;
    getGame: any
}

class GamePage extends React.Component<GamePageProps, void> {
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