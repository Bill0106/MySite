import { connect } from 'react-redux';
import { fetchGames, deleteGame } from '../actions/games.action';
import List from '../components/list.component';

const mapStateToProps = (state) => {
    return {
        list: state.games,
        type: 'Games',
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getList: (page = null) => dispatch(fetchGames(page)),
        postDelete: (url) => dispatch(deleteGame(url)),
    };
};

const Games = connect(mapStateToProps, mapDispatchToProps)(List);

export default Games;