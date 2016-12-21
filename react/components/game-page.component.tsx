import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { GameFields } from '../../config/fields/game';
import PageHeader from './page-header.component';
import Form from './form.component';

interface GamePageProps extends RouteComponentProps<void, void> {
    game: any;
    getGame: any;
    changeField: any;
}

class GamePage extends React.Component<GamePageProps, void> {
    componentDidMount() {
        const { params, getGame } = this.props;
        getGame(params['url']);
    }

    render() {
        const { game, params, changeField } = this.props;

        if (game.fetched) {
            document.title = game.item.name + ' - Games | Admin'
        }
        
        return (
            <div className="container-fluid">
                <PageHeader title={game.item ? game.item.name : ''} />
                <Form fields={GameFields} data={params['url'] == 'add' ? '' : game.item} change={(f, v) => changeField(f, v)} />
            </div>
        );
    }
}

export default GamePage;