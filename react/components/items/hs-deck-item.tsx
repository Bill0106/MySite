import * as React from 'react';
import { Link } from 'react-router';

import { HsPlayerClasses } from '../../../config/hs-player-classes';
import { ListItemProps } from '../../interface/list';

export class HsDeckItem extends React.Component<ListItemProps, {}> {
    render() {
        return (
            <tr>
                <td>{this.props.data._id}</td>
                <td>
                    <Link to={'/admin/hearthstone-decks/' + this.props.data._id} className="btn btn-link">{this.props.data.name}</Link>
                </td>
                <td>{HsPlayerClasses.find(player => player.value == this.props.data.playerClass).name}</td>
                <td>{this.props.data.active ? 'Active' : 'Inactive'}</td>
                <td>
                    <div className="btn-group">
                        <button className="btn btn-danger" type="button">Delete</button>
                        <button className="btn btn-primary" type="button">{this.props.data.active ? 'Inactive' : 'Active'}</button>
                    </div>
                </td>
            </tr>
        )
    }
}