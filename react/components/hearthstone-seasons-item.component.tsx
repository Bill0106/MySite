import * as React from 'react';
import { Link } from 'react-router';

import { ItemProps } from '../interface/item.interface';

class HearthstoneSeasonsItem extends React.Component<ItemProps, void> {
    render() {
        const { data } = this.props;
        return (
            <tr>
                <td>{data._id}</td>
                <td>
                    <Link to={'/admin/hearthstone-seasons/' + data.url}>{data.title}</Link>
                </td>
                <td>{data.month}</td>
                <td>{data.rank}</td>
                <td>{data.url}</td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={this.props.delete}>&times;</button>
                </td>
            </tr>
        );
    }
}

export default HearthstoneSeasonsItem;