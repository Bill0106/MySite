import * as React from 'react';
import { Link } from 'react-router';

import { ListItemProps } from '../../interface/list';
import { time2Date } from '../../helpers';

export class GourmetItem extends React.Component<ListItemProps, {}> {
    handleDelete() {
        this.props.delete(this.props.data);
    }

    render() {
        return (
            <tr>
                <td>{this.props.data._id}</td>
                <td>{this.props.data.food}</td>
                <td>{this.props.data.restaurant}</td>
                <td>{time2Date(this.props.data.date)}</td>
                <td>{this.props.data.url}</td>
                <td>
                    <Link to={'/admin/gourmets/' + this.props.data._id } className="btn btn-primary">Edit</Link>
                    <button type="button" className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</button>
                </td>
            </tr>
        )
    }
}