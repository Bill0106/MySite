import * as React from 'react';
import { Link } from 'react-router';

import { ListItemProps } from '../../interface/list';
import { time2Date } from '../../helpers';

export class GourmetItem extends React.Component<ListItemProps, {}> {
    render() {
        return (
            <tr>
                <td>{this.props.data._id}</td>
                <td>
                    <Link to={'/admin/gourmets/' + this.props.data._id } className="btn btn-link">{this.props.data.food}</Link>
                </td>
                <td>{this.props.data.restaurant}</td>
                <td>{time2Date(this.props.data.date)}</td>
                <td>{this.props.data.url}</td>
                <td>
                    <a href="#" className="btn btn-danger">Delete</a>
                </td>
            </tr>
        )
    }
}