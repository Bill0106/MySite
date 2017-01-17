import { connect } from 'react-redux';
import { fetchMatches, deleteMatch } from '../actions/hearthstone-matches.action';
import List from '../components/list.component';

const mapStateToProps = (state) => {
    return {
        list: state.hearthstoneSeasons,
        type: 'Hearthstone-Seasons',
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getList: (page = null) => dispatch(fetchMatches(page)),
        postDelete: (id: string) => dispatch(deleteMatch(id)),
    };
};

const HearthstoneMatches = connect(mapStateToProps, mapDispatchToProps)(List);

export default HearthstoneMatches;