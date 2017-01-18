import * as moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router';
import { ItemProps } from '../interface/item.interface';
import { HearthstoneMatchResult } from '../../config/hearthstone-match-result';
import { HearthstonePlayerClasses } from '../../config/hearthstone-player-classes';

interface HearthstoneMatchesItemProps extends ItemProps {
    deck: any;
}

class HearthstoneMatchesItem extends React.Component<HearthstoneMatchesItemProps, void> {
    render() {
        const { data, deck } = this.props;
        return (
            <tr>
                <td>{data._id}</td>
                <td>{moment(data.time, 'x').format('YYYY-MM-DD HH:mm:ss')}</td>
                <td>{deck ? deck.name : data.deck_id}</td>
                <td>{HearthstonePlayerClasses.find(r => r.value === data.opponent).name}</td>
                <td>{HearthstoneMatchResult.find(r => r.value === data.result).name}</td>
                <td>
                    <button className="btn btn-danger" type="button" onClick={this.props.delete}>&times;</button>
                </td>
            </tr>
        );
    }
}

export default HearthstoneMatchesItem;