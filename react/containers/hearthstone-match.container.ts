import { connect } from 'react-redux';
import { createMatch } from '../actions/hearthstone-matches.action';
import { fetchDecks } from '../actions/hearthstone-decks.action';
import { changeItem, initItemCreate, setItem } from '../actions/item.action';
import HearthstoneMatchAdd from '../components/hearthstone-match-add.component';

const mapStateToProps = (state) => {
    return {
        decks: state.hearthstoneDecks,
        matches: state.hearthstoneMatches,
        match: state.item,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDecks: () => dispatch(fetchDecks({ active: true })),
        initMatch: () => dispatch(initItemCreate()),
        setMatch: (match) => dispatch(setItem(match)),
        changeMatch: (field, value) => dispatch(changeItem({ field, value })),
        createMatch: (match) => dispatch(createMatch(match)),
    };
};

const HearthstoneMatch = connect(mapStateToProps, mapDispatchToProps)(HearthstoneMatchAdd);

export default HearthstoneMatch;