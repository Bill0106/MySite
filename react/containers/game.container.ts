import { connect } from 'react-redux';
import { GameFields } from '../../config/fields/game';
import { fetchGame, updateGame, createGame } from '../actions/games.action';
import { initItemCreate, changeItem, setItem } from '../actions/item.action';
import Item from '../components/item.component';

const mapStateToProps = (state) => {
    return {
        list: state.games,
        item: state.item,
        type: 'Game',
        fields: GameFields,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initItemCreate: () => dispatch(initItemCreate()),
        getItem: (param) => dispatch(fetchGame(param)),
        setItem: (item) => dispatch(setItem(item)),
        createItem: (item) => dispatch(createGame(item)),
        updateItem: (item) => dispatch(updateGame(item)),
        changeItem: (field, value) => dispatch(changeItem({field, value})),
    }
}

const Game = connect(mapStateToProps, mapDispatchToProps)(Item);

export default Game;