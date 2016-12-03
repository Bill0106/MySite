import * as React from 'react';
import axios from 'axios';

import { AdminListPage } from '../../config/admin-list-page';
import { ListProps, ListState } from '../interface/list';
import { ListTable } from '../components/list';

import { setPageTitle } from '../helpers';

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
        let state = this.state;
        let apiUrl = this.state.page.api + '?limit=' + this.state.page.per + (page ? '&page=' + page : '');

        axios.get(apiUrl)
            .then(response => {
                state['list'] = response.data.list
                state['total'] = response.data.total;
                this.setState(state);

                if (this.state.page.path == 'hearthstone-matches') {
                    this.handleDecks(state);
                }
            })
    }

    handleDecks(state): void {
        let decks = [];
        state.list.map(match => {
            let id = match.deck_id;
            if (id && decks.indexOf(id) < 0) {
                decks.push(id);
            }
        });

        axios.get('/hearthstone-decks?ids=' + decks.join(','))
            .then(response => {
                state.list.map(match => {
                    if (match.deck_id) {
                        let deck = response.data.list.find(value => value._id == match.deck_id);
                        if (deck) {
                            match['deck'] = deck;
                        }
                    }
                });

                this.setState(state);
            })
    }

    handleDelete(obj): void {
        let url = this.state.page.api + '/' + obj._id + '/delete';
        if (this.state.page.path == 'games' || this.state.page.path == 'hearthstone-seasons') {
            url = this.state.page.api + '/' + obj.url + '/delete';
        }

        axios.post(url)
            .then(response => {
                if (response.data.success) {
                    let state = this.state;
                    let target = state.list.find(item => item._id == obj._id);
                    let index = state.list.indexOf(target);

                    state['list'].splice(index, 1);
                    state['total']--;
                    this.setState(state);
                }
            })
    }

    handleActive(id): void {
        let state = this.state;
        let deck = state.list.find(value => value._id == id);
        let url = 'hearthstone-decks/' + id;
        if (deck.active) {
            url = url + '/inactive';
        } else {
            url = url + '/active';
        }

        axios.post(url)
            .then(response => {
                if (response.data.success) {
                    if (deck.active) {
                        deck.active = false;
                    } else {
                        deck.active = true;
                    }

                    this.setState(state);
                }
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
        setPageTitle(this.state.page['table']);
        this.handleFetch(this.props.location.query['page']);
    }

    render() {
        return (
            <div className="container-fluid">
                <ListTable title={this.state.page.table} total={this.state.total} fields={this.state.page.fields} data={this.state.list}
                    per={this.state.page.per} current={this.props.location.query['page']}
                    delete={this.handleDelete.bind(this)} active={this.handleActive.bind(this)} />
            </div>
        )
    }
}