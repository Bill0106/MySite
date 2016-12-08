import * as React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

import { HearthstonePlayerClasses } from '../../config/hearthstone-player-classes';
import { HearthstoneCardRarity } from '../../config/hearthstone-card-rarity';
import { DeckProps, DeckState } from '../interface/hearthstone';

import { setPageTitle } from '../helpers';

export class HearthstoneDeck extends React.Component<DeckProps, DeckState> {
    constructor(props) {
        super(props);

        this.state = {
            deck: {
                name: '',
                playerClass: 0,
                cards: [],
                active: false
            },
            cards: {
                list: [],
                total: 0
            },
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
        let apiUrl = '/hearthstone-cards?standard=true&playerClass=' + playerClass;
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

    handleCardIds(cards): void {
        let ids = [];
        let total = 0;
        cards.map(obj => {
            ids.push(obj.card);
            total += obj.count;
        });

        axios.get('hearthstone-cards?ids=' + ids.join(','))
            .then(response => {
                let change = this.state;
                change.cards.list = response.data;
                change.cards.total = total;
                this.setState(change);
            })
    }

    handleCards(add, obj) {
        let state = this.state;
        let cardsList = state.cards;
        let cardsListObj = cardsList.list.find(value => value._id == obj._id);
        let cardsIndex = state.deck.cards;
        let cardsIndexObj = cardsIndex.find(value => value.card == obj._id);
        let legend = HearthstoneCardRarity.find(rarity => rarity.name == 'Legendary').value;

        if (add) {
            if (cardsList.total == 30) {
                return false;
            }

            if (obj.rarity == legend && cardsIndexObj) {
                return false;
            }

            if (obj.rarity != legend && cardsIndexObj && cardsIndexObj.count == 2) {
                return false;
            }

            if (cardsIndexObj) {
                cardsIndexObj.count = 2;
            } else {
                cardsIndexObj = {
                    card: obj._id,
                    count: 1
                }
                cardsIndex.push(cardsIndexObj);
                cardsList.list.push(obj);

                cardsList.list.sort((a, b) => {
                    if (a.cost > b.cost) {
                        return 1;
                    }

                    if (a.cost < b.cost) {
                        return -1;
                    }

                    return 0;
                });
            }

            cardsList.total++;
        } else {
            if (cardsIndexObj.count == 2) {
                cardsIndexObj.count = 1;
            } else {
                let cardsIndexObjIndex = cardsIndex.indexOf(cardsIndexObj);
                let cardsListObjIndex = cardsList.list.indexOf(cardsListObj);
                cardsIndex.splice(cardsIndexObjIndex, 1);
                cardsList.list.splice(cardsListObjIndex, 1);
            }

            cardsList.total--;
        }

        this.setState(state);
    }

    handleSubmit(e): void {
        e.preventDefault();

        let apiUrl = '/hearthstone-decks';
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
            axios.get('/hearthstone-decks/' + this.props.params['id'])
                .then(response => {
                    setPageTitle(response.data.name);
                    let change = this.state;
                    change['deck'] = response.data;

                    this.handleCardsFetch(change.deck.playerClass);

                    if (change.deck.cards.length) {
                        this.handleCardIds(change.deck.cards);
                    }

                    this.setState(change);
                })
        } else {
            setPageTitle('Add New Hearthstone Deck');
            this.handleCardsFetch(this.state.deck.playerClass);
        }

        this.handleCardsFetch(-1, 1);
    }

    render() {
        const style = {
            padding: '10px 0'
        }
        let indent = [];
        for (let i = 1; i < 8; i++) {
            indent.push(<button key={i} className="btn btn-default" type="button" onClick={this.handleCardsFetch.bind(this, -1, i)}>{i}</button>);
        }

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
                                    HearthstonePlayerClasses.map(player => {
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
                                <h3 className="panel-title">Deck Cards <small>{this.state.cards.total}</small></h3>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    {
                                        this.state.cards.list.map((card, key) => {
                                            return (
                                                <div className="col-sm-2" key={key}>
                                                    <button className="btn btn-link btn-block" type="button"
                                                        onClick={this.handleCards.bind(this, 0, card)}>
                                                        <span className="pull-left">{card.name}</span>
                                                        <span className="pull-right">{this.state.deck.cards.find(obj => obj.card == card._id).count}</span>
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
                                    {HearthstonePlayerClasses.find(player => player.value == this.state.deck.playerClass).name}
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="neutralCards">
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <div className="btn-group" style={style}>
                                            {indent}
                                        </div>
                                    </div>
                                </div>
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