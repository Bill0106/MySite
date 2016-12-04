import * as React from 'react';
import axios from 'axios';

import { HsPlayerClasses } from '../../config/hs-player-classes';
import { HsMatchResult } from '../../config/hs-match-result';
import { MatchState } from '../interface/hearthstone';

import { setPageTitle } from '../helpers';

export class HsMatch extends React.Component<{}, MatchState> {
    constructor(props) {
        super(props);

        this.state = {
            decks: [],
            deck: '',
            opponent: 0,
            matches: [],
            wins: 0
        }
    }

    handleSelect(e): void {
        let change = this.state;
        change[e.target.id] = e.target.value;
        this.setState(change);
    }

    handleSubmit(result): void {
        let data = {
            deck: this.state.deck,
            opponent: this.state.opponent,
            result: result
        }

        axios.post('/hearth-stone/matches', data)
            .then(response => {
                if (response.data.success) {
                    let change = this.state;
                    change['matches'].push(data);

                    if (result == 1) {
                        change['wins']++;
                    }

                    this.setState(change);
                }
            });
    }

    componentDidMount() {
        setPageTitle('Add New Hearthstone Match');
        axios.get('hearthstone-decks?active=1')
            .then(response => {
                this.setState({
                    decks: response.data,
                    deck: response.data[0]._id,
                    opponent: 0,
                    matches: [],
                    wins: 0
                })
            });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label htmlFor="deck">Deck:</label>
                            <select className="form-control" name="deck" id="deck" value={this.state.deck}
                                onChange={this.handleSelect.bind(this)}>
                                {
                                    this.state.decks.map((deck, key) => {
                                        return <option key={key} value={deck._id}>{deck.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="opponent">Opponent:</label>
                            <select className="form-control" name="opponent" id="opponent" value={this.state.opponent.toString()}
                                onChange={this.handleSelect.bind(this)}>
                                {
                                    HsPlayerClasses.map(opponent => {
                                        return <option value={opponent.value.toString()} key={opponent.value}>{opponent.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Result:</label>
                            <div className="btn-group btn-group-justified">
                                {
                                    HsMatchResult.map(result => {
                                        return (
                                            <div className="btn-group" key={result.value}>
                                                <button type="button" className="btn btn-default btn-lg"
                                                    onClick={this.handleSubmit.bind(this, result.value)}>{result.name}</button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <ul className="list-inline">
                            <li>Total: {this.state.matches.length}</li>
                            <li>Win: {this.state.wins}</li>
                            <li>PCT: {(this.state.wins / this.state.matches.length * 100).toFixed(2)}%</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <table className="table table-bordered">
                            <tbody>
                                {
                                    this.state.matches.map((match, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{this.state.decks.find(deck => deck._id == match.deck).name}</td>
                                                <td>{HsPlayerClasses.find(player => player.value == match.opponent).name}</td>
                                                <td>{HsMatchResult.find(result => result.value == match.result).name}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}