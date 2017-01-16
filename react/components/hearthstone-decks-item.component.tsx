import * as React from 'react';
import { Link } from 'react-router';

import { HearthstonePlayerClasses } from '../../config/hearthstone-player-classes';
import { ItemProps } from '../interface/item.interface';

interface HearthstoneDecksItemProps extends ItemProps {
    active: any;
    inactive: any;
}

class HearthstoneDecksItem extends React.Component<HearthstoneDecksItemProps, void> {
    render() {
        const { data, active, inactive } = this.props;
        return (
            <tr>
                <td>{data._id}</td>
                <td>
                    <Link to={'/admin/hearthstone-decks/' + data._id}>{data.name}</Link>
                </td>
                <td>{HearthstonePlayerClasses.find(player => player.value === data.playerClass).name}</td>
                <td>{data.active ? 'Active' : 'Inactive'}</td>
                <td>
                    <button className="btn btn-warning" type="button" onClick={data.active ? inactive : active }>{data.active ? 'Inactive' : 'Active' }</button>
                    <button className="btn btn-danger" type="button" onClick={this.props.delete}>&times;</button>
                </td>
            </tr>
        );
    }
}

export default HearthstoneDecksItem;