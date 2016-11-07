import * as React from 'react';
import axios from 'axios';

import { AdminListPage } from '../../config/admin-list-page';
import { ListProps, ListState } from '../interface/list';
import { ListTable } from '../components/list';

export class List extends React.Component<ListProps, ListState> {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            total: 0,
            page: AdminListPage.find(page => page.path == props.route.path)
        }
    }

    handleFetch(page): void {
        let apiUrl = this.state.page.api + '?limit=' + this.state.page.per + (page ? '&page=' + page : '');

        axios.get(apiUrl)
            .then(response => {
                let list = response.data.list;
                if (!list) {
                    list = response.data;
                }

                this.handleTotal(list);
            })
    }

    handleTotal(list): void {
        let state = this.state;
        state['list'] = list;

        axios.get('/counts')
            .then(response => {
                state['total'] = response.data.find(value => value.table == this.state.page.table).count;

                if (this.state.page.path == 'hearthstone-matches') {
                    this.handleDecks(state);
                } else {
                    this.setState(state);
                }
            });
    }

    handleDecks(state): void {
        let decks = [];
        state.list.map(match => {
            let id = match.deck_id;
            if (id && decks.indexOf(id) < 0) {
                decks.push(id);
            }
        });

        axios.get('/hearth-stone/decks?ids=' + decks.join(','))
            .then(response => {
                state.list.map(match => {
                    if (match.deck_id) {
                        let deck = response.data.find(value => value._id == match.deck_id);
                        if (deck) {
                            match['deck'] = deck;
                        }
                    }
                });

                this.setState(state);
            })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.route.path != this.state.page.path) {
            this.state = {
                list: [],
                total: 0,
                page: AdminListPage.find(page => page.path == nextProps.route.path)
            }

            this.handleFetch(nextProps.location.query['page']);
        }

        if (nextProps.location.query['page'] != this.props.location.query['page']) {
            this.handleFetch(nextProps.location.query['page']);
        }
    }


    componentDidMount() {
        this.handleFetch(this.props.location.query['page']);
    }

    render() {
        return (
            <div className="container-fluid">
                <ListTable title={this.state.page.table} total={this.state.total} fields={this.state.page.fields} data={this.state.list}
                    per={this.state.page.per} current={this.props.location.query['page']} />
            </div>
        )
    }
}