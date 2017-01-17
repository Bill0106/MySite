import { connect } from 'react-redux';
import { fetchCards, changeActiveCost } from '../actions/hearthstone-cards.action';
import HearthstoneCardsList from '../components/hearthstone-cards-list.component';

const mapStateToProps = (state, ownProps) => {
    return {
        deck: state.item,
        cards: state.hearthstoneCards,
        change: ownProps.change,
        sort: ownProps.sort,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCards: (params) => dispatch(fetchCards(params)),
        activeCost: (cost: number) => dispatch(changeActiveCost(cost)),
    };
};

const HearthstoneCards = connect(mapStateToProps, mapDispatchToProps)(HearthstoneCardsList);

export default HearthstoneCards;