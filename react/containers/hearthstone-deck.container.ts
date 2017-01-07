import { connect } from 'react-redux';
import { createDeck, updateDeck, fetchDeck } from '../actions/hearthstone-decks.action';
import { initItemCreate, changeItem, setItem } from '../actions/item.action';
import HearthstoneDeckPage from '../components/hearthstone-deck-page.component';

const mapStateToProps = (state) => {
    return {
        list: state.hearthstoneDecks,
        deck: state.item,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDeck: (id) => dispatch(fetchDeck(id)),
        setDeck: (deck) => dispatch(setItem(deck)),
        changeDeck: (field, value) => dispatch(changeItem({ field, value })),
        createDeck: (deck) => dispatch(createDeck(deck)),
        updateDeck: (deck, id) => dispatch(updateDeck(deck, id)),
        initCreateDeck: () => dispatch(initItemCreate()),
    }
}

const HearthstoneDeck = connect(mapStateToProps, mapDispatchToProps)(HearthstoneDeckPage);

export default HearthstoneDeck;