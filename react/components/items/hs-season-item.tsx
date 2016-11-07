import * as React from 'react';
import { Link } from 'react-router';

import { ListItemProps } from '../../interface/list';

export class HsSeasonItem extends React.Component<ListItemProps, {}> {
    render() {
        return (
            <tr>
                <td>{this.props.data._id}</td>
                <td>
                    <Link to={'/admin/hearthstone-seasons/' + this.props.data.url}
                        className="btn btn-link">{this.props.data.title}</Link>
                </td>
                <td>{this.props.data.month}</td>
                <td>{this.props.data.rank}</td>
                <td>{this.props.data.url}</td>
                <td>
                    <a href="#" className="btn btn-danger">Delete</a>
                </td>
            </tr>
        )
    }
}