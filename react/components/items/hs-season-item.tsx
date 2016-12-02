import * as React from 'react';
import { Link } from 'react-router';

import { ListItemProps } from '../../interface/list';

export class HsSeasonItem extends React.Component<ListItemProps, {}> {
    handleDelete() {
        this.props.delete(this.props.data);
    }

    render() {
        return (
            <tr>
                <td>{this.props.data._id}</td>
                <td>{this.props.data.title}</td>
                <td>{this.props.data.month}</td>
                <td>{this.props.data.rank}</td>
                <td>{this.props.data.url}</td>
                <td>
                    <Link to={'/admin/hearthstone-seasons/' + this.props.data.url} className="btn btn-primary">Edit</Link>
                    <button type="button" className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</button>
                </td>
            </tr>
        )
    }
}