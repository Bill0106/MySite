import { connect } from 'react-redux';
import { fetchDecks, deleteDeck } from '../actions/hearthstone-decks.action';
import List from '../components/list.component';

const mapStateToProps = (state) => {
    return {
        list: state.hearthstoneDecks,
        type: 'Hearthsonte-Decks'
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList: (page = null) => dispatch(fetchDecks(page)),
        postDelete: (id) => dispatch(deleteDeck(id))
    }
}

const HearthstoneDecks = connect(mapStateToProps, mapDispatchToProps)(List);

export default HearthstoneDecks;