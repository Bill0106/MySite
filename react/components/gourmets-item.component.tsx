import * as React from 'react';
import { Link } from 'react-router';
import { time2Date } from '../helpers';
import { ItemProps } from '../interface/item.interface';

class GourmetsItem extends React.Component<ItemProps, void> {
    render() {
        const { data } = this.props;
        return (
            <tr>
                <td>{data._id}</td>
                <td>
                    <Link to={'/admin/gourmets/' + data._id}>{data.food}</Link>
                </td>
                <td>{data.restaurant}</td>
                <td>{time2Date(data.date)}</td>
                <td>
                    <a href={data.url} target="_blank">{data.url}</a>
                </td>
                <td>
                    <button className="btn btn-danger" type="button" onClick={this.props.delete}>&times;</button>
                </td>
            </tr>
        );
    }
}

export default GourmetsItem;