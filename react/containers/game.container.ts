import { connect } from 'react-redux';
import { fetchGame, changField, updateGame, initGameCreate, createGame } from '../actions/games.action';
import GamePage from '../components/game-page.component';

const mapStateToProps = (state) => {
    return {
        game: state.game
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGame: (url) => dispatch(fetchGame(url)),
        createGame: (game) => dispatch(createGame(game)),
        updateGame: (game) => dispatch(updateGame(game)),
        changeField: (field, value) => dispatch(changField(field, value)),
        initGameCreate: () => dispatch(initGameCreate())
    }
}

const Game = connect(mapStateToProps, mapDispatchToProps)(GamePage);

export default Game;