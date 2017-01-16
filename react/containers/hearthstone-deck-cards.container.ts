import { connect } from 'react-redux';
import { fetchCards } from '../actions/hearthstone-cards.action';
import HearthstoneCardsBox from '../components/hearthstone-cards-box.component';

const mapStateToProps = (state, ownProps) => {
    return {
        cards: state.hearthstoneCards,
        deck: state.item,
        change: ownProps.change,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCards: (params) => dispatch(fetchCards(params)),
    };
};

const HearthstoneDeckCards = connect(mapStateToProps, mapDispatchToProps)(HearthstoneCardsBox);

export default HearthstoneDeckCards;