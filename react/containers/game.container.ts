import { connect } from 'react-redux';
import { GameFields } from '../constants/game-fields.constants';
import { fetchGame, updateGame, createGame } from '../actions/games.action';
import { initItemCreate, changeItem, setItem } from '../actions/item.action';
import Item from '../components/item.component';

const mapStateToProps = (state) => {
    return {
        list: state.games,
        item: state.item,
        type: 'Game',
        fields: GameFields,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initItemCreate: () => dispatch(initItemCreate()),
        getItem: (params) => dispatch(fetchGame(params.url)),
        setItem: (item) => dispatch(setItem(item)),
        createItem: (item) => dispatch(createGame(item)),
        updateItem: (item, params) => dispatch(updateGame(item, params)),
        changeItem: (field, value) => dispatch(changeItem({field, value})),
    };
};

const Game = connect(mapStateToProps, mapDispatchToProps)(Item);

export default Game;