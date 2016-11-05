import * as React from 'react';

import { ListProps, ListState, ListPerPage ,fetchApi } from '../interface/list';
import { ListMain } from '../components/list-main';
import { GourmetField } from '../../config/gourmet-fields';

export class Gourmets extends React.Component<ListProps, ListState> {
    constructor() {
        super();

        this.state = {
            list: [],
            total: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.query['page'] !== this.props.location.query['page']) {
            fetchApi('/api/gourmets', nextProps.location.query['page'], data => {
                this.setState({
                    list: data.list,
                    total: data.total,
                })
            });
        }
    }

    componentDidMount() {
        fetchApi('/api/gourmets', this.props.location.query['page'], data => {
            this.setState({
                list: data.list,
                total: data.total,
            })
        });
    }

    render() {
        let fields = [];
        GourmetField.map(field => {
            if (field.field != 'image') {
                fields.push(field.field);
            }
        });

        return (
            <div className="container-fluid">
                <ListMain title="Gourmets" total={this.state.total} fields={fields} data={this.state.list}
                          per={ListPerPage} current={this.props.location.query['page']} />
            </div>
        )
    }
}