import { connect } from 'react-redux';
import { fetchCards } from '../actions/hearthstone-cards.action';
import HearthstoneCardsList from '../components/hearthstone-cards-list.component';

const mapStateToProps = (state, ownProps) => {
    return {
        deck: state.item,
        cards: state.hearthstoneCards,
        change: ownProps.change,
        sort: ownProps.sort,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCards: (params) => dispatch(fetchCards(params)),
    }
};

const HearthstoneCards = connect(mapStateToProps, mapDispatchToProps)(HearthstoneCardsList);

export default HearthstoneCards;