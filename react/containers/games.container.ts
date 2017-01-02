import axios from 'axios';
import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import helpers from '../helpers';
import List from '../components/list.component';

const mapStateToProps = (state) => {
    return {
        list: state.games,
        type: 'Games'
    }
}

const mapDispatchToProps = (dispatch) => {
    const { games } = helpers.actionTypes;
    const deleteGame = createAction(games.delete, (url) => axios.post('/games/' + url + '/delete'));
    const fetchGames = createAction(games.fetch_list, (page = null) => {
        let url = `/games?limit=30${page ? '&page=' + page : ''}`;
        return axios.get(url);
    });

    return {
        getList: (page = null) => dispatch(fetchGames(page)),
        postDelete: (url) => dispatch(deleteGame(url))
    }
}

const Games = connect(mapStateToProps, mapDispatchToProps)(List);

export default Games;