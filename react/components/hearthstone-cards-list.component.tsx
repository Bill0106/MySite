import * as React from "react";
import { HearthstoneCardRarity } from "../../config/hearthstone-card-rarity";
import { HearthstonePlayerClasses } from "../../config/hearthstone-player-classes";

interface HearthstoneCardsListProps extends React.Props<any> {
    deck: any;
    cards: any;
    getCards: any;
    change: any;
    sort: any;
}

class HearthstoneCardsList extends React.Component<HearthstoneCardsListProps, void> {
    componentDidMount() {
        const { cards, getCards } = this.props;

        if (cards.fetchedCosts.indexOf(1) < 0) {
            getCards({ playerClass: -1, cost: 1 });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const { cards } = this.props;
        const { deck, getCards } = nextProps;
        const { fetchedPlayerClasses } = cards;
        const thisDeck = this.props.deck;

        if (!thisDeck.data && deck.data && !fetchedPlayerClasses.includes(deck.data.playerClass)) {
            getCards({ playerClass: deck.data.playerClass });
        }

        if (thisDeck.data && thisDeck.data.playerClass !== deck.data.playerClass && !fetchedPlayerClasses.includes(deck.data.playerClass)) {
            getCards({ playerClass: deck.data.playerClass });
        }
    }

    handleSelectCard(id: string) {
        const { cards, deck, change } = this.props;
        const card = cards.items.find(c => c._id === id);
        const legend = HearthstoneCardRarity.find(rarity => rarity.name === "Legendary").value;
        const storage = window.localStorage.getItem("selected_cards");
        const array = storage ? storage.split(";") : [];
        let selectedCards = array.map(e => JSON.parse(e));

        if (!card) return false;
        if (selectedCards.length === 30) return false;
        if (card.rarity === legend && selectedCards.indexOf(card) >= 0) return false;
        if (card.rarity !== legend && selectedCards.filter(c => c._id === card._id).length === 2) return false;

        selectedCards.push(card);
        change(selectedCards);
    }

    handleCards(neutral: boolean = false, cost?: number) {
        const { cards, deck, sort } = this.props;
        let list = [];

        if (neutral && cards.fetchedCosts.includes(cost)) {
            if (cost === 1) {
                list = sort(cards.items.filter(e => e.playerClass === -1 && e.cost <= 1));
            }
        }

        if (!neutral && deck.data && cards.fetchedPlayerClasses.includes(deck.data.playerClass)) {
            list = sort(cards.items.filter(e => e.playerClass === deck.data.playerClass));
        }

        return list;
    }

    render() {
        const { cards, deck } = this.props;
        const neutralCards = this.handleCards(true, 1);
        const classCards = this.handleCards();

        return (
            <div className="row">
                <div className="col-sm-12">
                    <ul className="nav nav-tabs" role="tablist">
                        <li role="presentation" className="active">
                            <a href="#neutralCards" aria-controls="neutralCards" role="tab" data-toggle="tab">Neutral</a>
                        </li>
                        <li role="presentation">
                            <a href="#classCards" aria-controls="classCards" role="tab" data-toggle="tab">
                                {deck.data ? HearthstonePlayerClasses.find(player => player.value === deck.data.playerClass).name : "Druid"}
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="neutralCards">
                            <ul className="row list-unstyled">
                            {
                                neutralCards.map((card, key) => {
                                    return (
                                        <li className="col-sm-2" key={key}>
                                            <button className="btn btn-link" type="button" onClick={this.handleSelectCard.bind(this, card._id)}>
                                                {card.cost + " - " + card.name}
                                            </button>
                                        </li>
                                    )
                                })
                            }
                            </ul>
                        </div>
                        <div className="tab-pane" id="classCards">
                            <ul className="row list-unstyled">
                            {
                                classCards.map((card, key) => {
                                    return (
                                        <li className="col-sm-2" key={key}>
                                            <button className="btn btn-link" type="button" onClick={this.handleSelectCard.bind(this, card._id)}>
                                                {card.cost + " - " + card.name}
                                            </button>
                                        </li>
                                    )
                                })
                            }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HearthstoneCardsList;