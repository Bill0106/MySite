import * as React from "react";

interface HearthstoneCardsBoxProps extends React.Props<any> {
    cards: any;
    deck: any;
    change: any;
    getCards: any;
}

class HearthstoneCardsBox extends React.Component<HearthstoneCardsBoxProps, void> {
    componentWillMount() {
        window.localStorage.removeItem("selected_cards");
    }

    componentWillUpdate(nextProps, nextState) {
        const { cards, deck, getCards } = nextProps;
        const { data } = deck;
        const selected = window.localStorage.getItem("selected_cards");

        if (!this.props.deck.data && data) {
            const array = data.cards.map(e => e.card);

            if (array) {
                let ids = [];
                for (let element of array) {
                    if (cards.items.findIndex(e => e._id === element) < 0) {
                        ids.push(element);
                    }
                }

                getCards({ ids });
            }
        }

        if (data && !selected) {
            const diff = data.cards.filter(c => cards.items.findIndex(e => e._id === c.card) < 0);

            if (!diff.length) {
                let selectedCards = [];

                for (let card of data.cards) {
                    const cardItem = cards.items.find(c => c._id === card.card);

                    if (cardItem) {
                        const str = JSON.stringify(cardItem);
                        selectedCards.push(str);
                        if (card.count === 2) {
                            selectedCards.push(str);
                        }
                    }
                }

                if (selectedCards.length) {
                    window.localStorage.setItem("selected_cards", selectedCards.join(";"));
                }
            }
        }
    }

    handleCardsTotal(): number {
        const { deck } = this.props;
        let total = 0;

        if (deck.data) {
            const totalArray = deck.data.cards.map(e => e.count);
            total = totalArray.reduce((a, b) => a + b);
        }

        return total;
    }

    handleRemoveCard(id: string) {
        const { change } = this.props;
        const storage = window.localStorage.getItem("selected_cards");
        const array = storage ? storage.split(";") : [];
        let selectedCards = array.map(e => JSON.parse(e));
        const index = selectedCards.findIndex(e => e._id === id);

        if (index < 0) return false;
        selectedCards.splice(index, 1);
        change(selectedCards);
    }

    render() {
        const { deck, cards } = this.props;
        const deckCards = deck.data ? deck.data.cards : [];

        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Deck Cards <small>{this.handleCardsTotal()}</small></h3>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                            {
                                deckCards.map((card, key) => {
                                    return (
                                        <div className="col-sm-2" key={key}>
                                            <button className="btn btn-link btn-block" type="button" onClick={this.handleRemoveCard.bind(this, card.card)}>
                                                <span className="pull-left">{cards.items.find(c => c._id === card.card) ? cards.items.find(c => c._id === card.card).name : ""}</span>
                                                <span className="pull-right">{card.count}</span>
                                            </button>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HearthstoneCardsBox;