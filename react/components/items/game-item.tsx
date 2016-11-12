import * as React from 'react';
import { Link } from 'react-router';

import { GamePlatforms } from '../../../config/game-platforms';
import { GameGenres } from '../../../config/game-genres';
import { ListItemProps } from '../../interface/list';

export class GameItem extends React.Component<ListItemProps, {}> {
    render() {
        return (
            <tr>
                <td>{this.props.data._id}</td>
                <td>{this.props.data.title}</td>
                <td>{this.props.data.name}</td>
                <td>{GamePlatforms.find(platform => platform.value == this.props.data.platform).name}</td>
                <td>{GameGenres.find(genre => genre.value == this.props.data.genre).name}</td>
                <td>
                    <Link to={'/admin/games/' + this.props.data.url} className="btn btn-primary">Edit</Link>
                    <Link to={'/admin/games/' + this.props.data.url + '/trophy'} className="btn btn-default">Tophy</Link>
                </td>
            </tr>
        )
    }
}