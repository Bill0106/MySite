import * as React from 'react';
import * as moment from 'moment';
import PageHeader from './page-header.component';
import Alert from './alert.component';
import { HearthstonePlayerClasses } from '../../config/hearthstone-player-classes';
import { HearthstoneMatchResult } from '../../config/hearthstone-match-result';

interface HearthstoneMatchAddProps extends React.Props<any> {
    decks: any;
    matches: any;
    match: any;
    getDecks: any;
    initMatch: any;
    setMatch: any;
    changeMatch: any;
    createMatch: any;
}

class HearthstoneMatchAdd extends React.Component<HearthstoneMatchAddProps, void> {
    componentWillMount() {
        const { initMatch, setMatch } = this.props;
        const match = {
            deck: '',
            opponent: 0,
            result: 0,
        };

        initMatch();
        setMatch(match);
    }

    componentDidMount() {
        const { decks, getDecks } = this.props;

        if (!decks.fetchedPages.includes(1)) {
            getDecks();
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        const { changeMatch } = this.props;

        changeMatch(name, value);
    }

    handleSubmit(result) {
        const { match, changeMatch, createMatch } = this.props;

        changeMatch('result', result);
        createMatch(match.data);
    }

    handleTotal() {
        const { matches } = this.props;
        const today = moment().startOf('day').valueOf();

        return matches.items.filter(item => item.time > today);
    }

    render() {
        const { decks, match, matches } = this.props;
        const activeDecks = decks.items.filter(e => e.active);
        const today = this.handleTotal();
        const wins = today.filter(e => e.result === 1);
        const pet = (wins.length / today.length * 100).toFixed(2);

        return (
            <div className="container-fluid">
                <PageHeader title={'Add Match'} />
                <Alert isFetching={decks.isFetching} isPosting={matches.isPosting} posted={false} error={matches.error} />
                <form>
                    <div className="form-group">
                        <label htmlFor="deck">Deck:</label>
                        <select name="deck" value={match.data ? match.data.deck : ''} id="deck" className="form-control" onChange={this.handleChange.bind(this)}>
                        {
                            activeDecks.map((deck, key) => {
                                return <option value={deck._id} key={key}>{deck.name}</option>;
                            })
                        }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="opponent">Opponent:</label>
                        <select name="opponent" value={match.data ? match.data.opponent : 0} id="opponent" className="form-control"onChange={this.handleChange.bind(this)}>
                        {
                            HearthstonePlayerClasses.map(value => {
                                return <option key={value.value} value={value.value.toString()}>{value.name}</option>;
                            })
                        }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Result:</label>
                        <div className="btn-group btn-group-justified">
                        {
                            HearthstoneMatchResult.map(result => {
                                return (
                                    <div className="btn-group" key={result.value}>
                                        <button type="button" className="btn btn-default btn-lg"
                                        onClick={this.handleSubmit.bind(this, result.value)}>{result.name}</button>
                                    </div>
                                );
                            })
                        }
                        </div>
                    </div>
                </form>
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <h3>Total: {today.length} Win: {wins.length} PET: {pet}%</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default HearthstoneMatchAdd;