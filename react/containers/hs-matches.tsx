import * as React from 'react';
import axios from 'axios';

import { ListProps, ListState ,fetchApi } from '../interface/list';
import { List } from '../components/list';

const MATCH_PER_PAGE = 100;

export class HsMatches extends React.Component<ListProps, ListState> {
    constructor() {
        super();

        this.state = {
            list: [],
            total: 0
        }
    }

    handleFetch(page): void {
        fetchApi('hearth-stone/matches', page, data => {
            this.handleDecks(data);
        }, MATCH_PER_PAGE)
    }

    handleDecks(data): void {
        let decks = [];
        data.list.map(match => {
            let id = match.deck_id;
            if (id && decks.indexOf(id) < 0) {
                decks.push(id);
            }
        });

        axios.get('/api/hearth-stone/decks?ids=' + decks.join(','))
            .then(response => {
                data.list.map(match => {
                    if (match.deck_id) {
                        let deck = response.data.find(value => value._id == match.deck_id);
                        if (deck) {
                            match['deck'] = deck;
                        }
                    }
                });

                this.setState({
                    list: data.list,
                    total: data.total
                })
            })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.query['page'] !== this.props.location.query['page']) {
            this.handleFetch(nextProps.location.query['page']);
        }
    }

    componentDidMount() {
        this.handleFetch(this.props.location.query['page']);
    }

    render() {
        let fields = ['time', 'deck', 'opponent', 'result'];
        return (
            <div className="container-fluid">
                <List title="Hearthstone-Matches" total={this.state.total} fields={fields} data={this.state.list}
                      per={MATCH_PER_PAGE} current={this.props.location.query['page']} />
            </div>
        );
    }
}