import * as React from 'react';

import { ListProps, ListState, ListPerPage ,fetchApi } from '../interface/list';
import { List } from '../components/list';

export class Gourmets extends React.Component<ListProps, ListState> {
    constructor() {
        super();

        this.state = {
            list: [],
            total: 0
        };
    }

    handleFetch(page): void {
        fetchApi('gourmets', page, data => {
            this.setState({
                list: data.list,
                total: data.total,
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
        let fields = ['food', 'restaurant', 'date', 'url'];

        return (
            <div className="container-fluid">
                <List title="Gourmets" total={this.state.total} fields={fields} data={this.state.list}
                          per={ListPerPage} current={this.props.location.query['page']} />
            </div>
        )
    }
}