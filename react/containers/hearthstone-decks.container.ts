import { connect } from 'react-redux';
import { fetchDecks, deleteDeck, activeDeck, inactiveDeck } from '../actions/hearthstone-decks.action';
import List from '../components/list.component';

const mapStateToProps = (state) => {
    return {
        list: state.hearthstoneDecks,
        type: 'Hearthsonte-Decks',
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getList: (page = null) => dispatch(fetchDecks(page)),
        postDelete: (id: string) => dispatch(deleteDeck(id)),
        activeDeck: (id: string) => dispatch(activeDeck(id)),
        inactiveDeck: (id: string) => dispatch(inactiveDeck(id)),
    };
};

const HearthstoneDecks = connect(mapStateToProps, mapDispatchToProps)(List);

export default HearthstoneDecks;