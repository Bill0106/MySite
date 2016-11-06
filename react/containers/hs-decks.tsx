import * as React from 'react';
import axios from 'axios';

import { ListProps, ListState, ListPerPage ,fetchApi } from '../interface/list';
import { List } from '../components/list';

export class HsDecks extends React.Component<ListProps, ListState> {
    constructor() {
        super();

        this.state = {
            list: [],
            total: 0
        }
    }

    handleFetch(page): void {
        fetchApi('hearth-stone/decks', page, data => {
            this.handleCount(data);
        })
    }

    handleCount(list): void {
        axios.get('/api/counts')
            .then(response => {
                this.setState({
                    list: list,
                    total: response.data.find(value => value.table == 'Hearthstone Decks').count
                })
            });
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
        let fields = ['name', 'class', 'active'];
        return (
            <div className="container-fluid">
                <List title="Hearthstone-Decks" total={this.state.total} fields={fields} data={this.state.list}
                      per={ListPerPage} current={this.props.location.query['page']} />
            </div>
        );
    }
}