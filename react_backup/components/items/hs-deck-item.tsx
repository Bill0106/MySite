import * as React from 'react';
import { Link } from 'react-router';

import { HearthstonePlayerClasses } from '../../../config/hearthstone-player-classes';
import { ListItemProps } from '../../interface/list';

export class HsDeckItem extends React.Component<ListItemProps, {}> {
    handleDelete() {
        this.props.delete(this.props.data);
    }

    handleActive() {
        let url = 'hearthstone-decks/' + this.props.data._id;
        if (this.props.data.active) {
            url = url + '/inactive';
        } else {
            url = url + '/active';
        }

        this.props.func(url, this.props.data._id);
    }

    render() {
        return (
            <tr>
                <td>{this.props.data._id}</td>
                <td>{this.props.data.name}</td>
                <td>{HearthstonePlayerClasses.find(player => player.value == this.props.data.playerClass).name}</td>
                <td>{this.props.data.active ? 'Active' : 'Inactive'}</td>
                <td>
                    <Link to={'/admin/hearthstone-decks/' + this.props.data._id} className="btn btn-primary">Edit</Link>
                    <button className="btn btn-danger" type="button" onClick={this.handleDelete.bind(this)}>Delete</button>
                    <button className="btn btn-success" type="button" onClick={this.handleActive.bind(this)}>{this.props.data.active ? 'Inactive' : 'Active'}</button>
                </td>
            </tr>
        )
    }
}