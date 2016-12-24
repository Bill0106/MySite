import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { GameFields } from '../../config/fields/game';
import PageHeader from './page-header.component';
import Alert from './alert.component';
import Form from './form.component';

interface GamePageProps extends RouteComponentProps<void, void> {
    game: any;
    getGame: any;
    changeField: any;
    updateGame: any;
}

class GamePage extends React.Component<GamePageProps, void> {
    componentDidMount() {
        const { params, getGame } = this.props;
        getGame(params['url']);
    }

    handlePost() {
        const { updateGame, game } = this.props;
        updateGame(game.item);
        window.scrollTo(0, 0);
    }

    render() {
        const { game, params, changeField } = this.props;

        if (game.fetched) {
            document.title = game.item.name + ' - Games | Admin'
        }
        
        return (
            <div className="container-fluid">
                <PageHeader title={game.item ? game.item.name : ''} />
                <Alert fetch={game} />
                <Form fields={GameFields} data={params['url'] == 'add' ? '' : game.item} change={(f, v) => changeField(f, v)} submit={this.handlePost.bind(this)} />
            </div>
        );
    }
}

export default GamePage;