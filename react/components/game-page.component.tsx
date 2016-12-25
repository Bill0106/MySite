import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { GameFields } from '../../config/fields/game';
import PageHeader from './page-header.component';
import Alert from './alert.component';
import Form from './form.component';

interface GamePageProps extends RouteComponentProps<void, void> {
    game: any;
    getGame: any;
    createGame: any;
    updateGame: any;
    changeField: any;
    initGameCreate: any;
}

class GamePage extends React.Component<GamePageProps, void> {
    componentDidMount(nextProps, nextState) {
        const { initGameCreate, params, getGame } = this.props;

        if (params['url'] == 'add') {
            initGameCreate();
        } else {
            getGame(params['url']);
        }
    }

    handlePost() {
        const { createGame, updateGame, game, params } = this.props;

        if (params['url'] == 'add') {
            createGame(game.item);
        } else {
            updateGame(game.item);
        }

        window.scrollTo(0, 0);
    }

    render() {
        const { game, params, changeField } = this.props;

        if (game.fetched) {
            document.title = game.item.name + ' - Games | Admin';
        } else {
            document.title = 'Add - Games | Admin';
        }

        return (
            <div className="container-fluid">
                <PageHeader title={params['url'] == 'add' ? 'Add Game' : game.item.name } />
                <Alert fetch={game} />
                <Form fields={GameFields} data={game.item} change={(f, v) => changeField(f, v)} submit={this.handlePost.bind(this)} />
            </div>
        );
    }
}

export default GamePage;