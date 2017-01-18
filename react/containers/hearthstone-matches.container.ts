import { connect } from 'react-redux';
import { fetchMatches, deleteMatch } from '../actions/hearthstone-matches.action';
import { fetchDecks } from '../actions/hearthstone-decks.action';
import List from '../components/list.component';

const mapStateToProps = (state) => {
    return {
        list: state.hearthstoneMatches,
        decks: state.hearthstoneDecks,
        type: 'Hearthstone-Matches',
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getList: (page = null) => dispatch(fetchMatches(page)),
        getDecks: (ids: string[]) => dispatch(fetchDecks({ ids })),
        postDelete: (id: string) => dispatch(deleteMatch(id)),
    };
};

const HearthstoneMatches = connect(mapStateToProps, mapDispatchToProps)(List);

export default HearthstoneMatches;