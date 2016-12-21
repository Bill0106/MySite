import { connect } from 'react-redux';
import { fetchGame, changField } from '../actions/games.action';
import GamePage from '../components/game-page.component';

const mapStateToProps = (state) => {
    return {
        game: state.game
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGame: (url) => dispatch(fetchGame(url)),
        changeField: (field, value) => dispatch(changField(field, value))
    }
}

const Game = connect(mapStateToProps, mapDispatchToProps)(GamePage);

export default Game;