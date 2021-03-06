import * as React from 'react';
import { Link } from 'react-router';

import { HearthstonePlayerClasses } from '../../../config/hearthstone-player-classes';
import { HearthstoneMatchResult } from '../../../config/hearthstone-match-result';
import { ListItemProps } from '../../interface/list';
import { time2Date } from '../../helpers';

export class HsMatchItem extends React.Component<ListItemProps, {}> {
    handleDelete() {
        this.props.delete(this.props.data);
    }

    render() {
        return (
            <tr>
                <td>{this.props.data._id}</td>
                <td>{time2Date(this.props.data.time, true)}</td>
                <td>
                    <Link to={'/admin/hearthstone-decks/'+this.props.data.deck_id}>{this.props.data.deck ? this.props.data.deck.name : ''}</Link>
                </td>
                <td>{HearthstonePlayerClasses.find(player => player.value == this.props.data.opponent).name}</td>
                <td>{HearthstoneMatchResult.find(result => result.value == this.props.data.result).name}</td>
                <td>
                    <button className="btn btn-danger" type="button" onClick={this.handleDelete.bind(this)}>Delete</button>
                </td>
            </tr>
        );
    }
}