import * as React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

import { HsPlayerClasses } from '../../config/hs-player-classes';
import { HsCardRarity } from '../../config/hs-card-rarity';
import { DeckProps, DeckState } from '../interface/hearthstone';

export class HsDeck extends React.Component<DeckProps, DeckState> {
    constructor(props) {
        super(props);

        this.state = {
            deck: {
                name: '',
                playerClass: 0,
                cards: [],
                active: false
            },
            cards: [],
            classCards: [],
            neutralCards: [],
        }
    }

    handleChange(e): void {
        let change = this.state;
        change.deck[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleChangeClass(e): void {
        if (this.props.params['id'] == 'add') {
            let change = this.state;
            change.deck['playerClass'] = e.target.value;
            this.setState(change);

            this.handleCardsFetch(this.state.deck.playerClass);
        }
    }

    handleCardsFetch(playerClass, cost?): void {
        let apiUrl = '/hearth-stone/cards?standard=true&playerClass=' + playerClass;
        if (cost) {
            apiUrl = apiUrl + '&cost=' + cost;
        }

        axios.get(apiUrl)
            .then(response => {
                let change = this.state;
                if (playerClass == -1) {
                    change['neutralCards'] = response.data;
                } else {
                    change['classCards'] = response.data;
                }

                this.setState(change);
            })
    }

    handleCards(add, obj) {
        let state = this.state;
        let displayCard = state.cards.find(value => value.id == obj._id);
        let displayCardIndex = state.cards.indexOf(displayCard);
        let deckCard = state.deck.cards.find(value => value._id == obj._id);
        let deckCardIndex = state.deck.cards.indexOf(deckCard);
        let legend = HsCardRarity.find(rarity => rarity.name == 'Legendary').value; 

        if (add) {
            if (this.state.deck.cards.length == 30) {
                return false;
            }

            if (obj.rarity == legend && deckCard) {
                return false;
            }

            if (obj.rarity != legend && displayCard && displayCard.count == 2) {
                return false;
            }

            if (displayCard && displayCard.count == 1) {
                displayCard.count = 2;
                state.cards[displayCardIndex] = displayCard;
            } else {
                displayCard = {
                    id: obj._id,
                    count: 1
                }
                state.cards.push(displayCard);
            }
            state.deck.cards.push(obj);
        } else {
            if (displayCard.count == 2) {
                displayCard.count = 1;
                state.cards[displayCardIndex] = displayCard;
            } else {
                state.cards.splice(displayCardIndex, 1);
            }
            state.deck.cards.splice(deckCardIndex, 1);
        }

        this.setState(state);
    }

    handleSubmit(e): void {
        e.preventDefault();

        let apiUrl = '/hearth-stone/decks';
        if (this.props.params['id'] != 'add') {
            apiUrl = apiUrl + '/' + this.props.params['id'];
        }

        axios.post(apiUrl, this.state.deck)
            .then(response => {
                if (response.data.success) {
                    browserHistory.push('/admin/hearthstone-decks');
                }
            })
    }

    componentDidMount() {
        if (this.props.params['id'] != 'add') {
            axios.get('/hearth-stone/decks/' + this.props.params['id'])
                .then(response => {
                    let change = this.state;
                    change['deck'] = response.data;
                    response.data.cards.map(card => {
                        let obj = change.cards.find(value => value.id == card._id);
                        if (!obj) {
                            obj = {
                                id: card._id,
                                count: 1
                            }
                            change.cards.push(obj);
                        } else {
                            let index = change.cards.indexOf(obj);
                            obj['count'] = 2;
                            change.cards[index] = obj;
                        }
                    })

                    this.setState(change);
                    this.handleCardsFetch(response.data.playerClass);
                })
        } else {
            this.handleCardsFetch(this.state.deck.playerClass);
        }

        this.handleCardsFetch(-1, 1);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" name="name" id="name" className="form-control"
                                    value={this.state.deck.name} onChange={this.handleChange.bind(this)} />
                            </div>
                            <div className="form-group">
                                <div>
                                    <label htmlFor="playerClass">Player Class:</label>
                                </div>
                                {
                                    HsPlayerClasses.map(player => {
                                        return (
                                            <label className="radio-inline" key={player.value}>
                                                <input type="radio" checked={this.state.deck.playerClass == player.value}
                                                    onChange={this.handleChangeClass.bind(this)}
                                                    value={player.value.toString()} name="playerClass" /> {player.name}
                                            </label>
                                        )
                                    })
                                }
                            </div>
                            <div className="form-group">
                                <div>
                                    <label htmlFor="active">Active:</label>
                                </div>
                                <label className="checkbox-inline">
                                    <input type="checkbox" name="active" value="1" checked={this.state.deck.active == 1}
                                        onChange={this.handleChange.bind(this)} /> Active
                                </label>
                                <label className="checkbox-inline">
                                    <input type="checkbox" name="active" value="0" checked={this.state.deck.active == 0}
                                        onChange={this.handleChange.bind(this)} /> Inactive
                                </label>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Deck Cards <small>{this.state.deck.cards.length}</small></h3>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    {
                                        this.state.cards.map((value, key) => {
                                            let card = this.state.deck.cards.find(v => v._id == value.id);
                                            return (
                                                <div className="col-sm-2" key={key}>
                                                    <button className="btn btn-link btn-block" type="button"
                                                        onClick={this.handleCards.bind(this, 0, card)}>
                                                        <span className="pull-left">{card.name}</span>
                                                        <span className="pull-right">{value.count}</span>
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
                <div className="row">
                    <div className="col-sm-12">
                        <ul className="nav nav-tabs" role="tablist">
                            <li role="presentation" className="active">
                                <a href="#neutralCards" aria-controls="neutralCards" role="tab" data-toggle="tab">Neutral</a>
                            </li>
                            <li role="presentation">
                                <a href="#classCards" aria-controls="classCards" role="tab" data-toggle="tab">
                                    {HsPlayerClasses.find(player => player.value == this.state.deck.playerClass).name}
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="neutralCards">
                                <div className="row">
                                    {
                                        this.state.neutralCards.map((card, key) => {
                                            return (
                                                <div className="col-sm-2" key={key}>
                                                    <button className="btn btn-link" type="button" onClick={this.handleCards.bind(this, 1, card)}>
                                                        {card.cost + ' - ' + card.name}
                                                    </button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="tab-pane" id="classCards">
                                <div className="row">
                                    {
                                        this.state.classCards.map((card, key) => {
                                            return (
                                                <div className="col-sm-2" key={key}>
                                                    <button className="btn btn-link" type="button" onClick={this.handleCards.bind(this, 1, card)}>
                                                        {card.cost + ' - ' + card.name}
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
            </div>
        );
    }
}