import * as React from 'react';
import { Link } from 'react-router';

import { GamePlatforms } from '../config/game-playforms';
import { GameGenres } from '../config/game-genres';

import { GameItemProps } from '../interface/games';

export class GameItem extends React.Component<GameItemProps, {}> {
    render() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>
                    <Link to={'/admin/games/'+this.props.url} className="btn btn-link">{this.props.title}</Link>
                </td>
                <td>{this.props.name}</td>
                <td>{GamePlatforms.find(platform => platform.value == this.props.platform).name}</td>
                <td>{GameGenres.find(genre => genre.value == this.props.genre).name}</td>
                <td>
                    <Link to={'/admin/games/'+this.props.url+'/trophy'} className="btn btn-default">Tophy</Link>
                </td>
            </tr>
        )
    }
}