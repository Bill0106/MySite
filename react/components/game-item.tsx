import * as React from 'react';
import { Link } from 'react-router';

import { gamePlatforms } from '../config/game-playforms';
import { gameGenres } from '../config/game-genres';

import { GameItemProps } from '../interface/games';

export class GameItem extends React.Component<GameItemProps, {}> {
    render() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.title}</td>
                <td>{this.props.name}</td>
                <td>{gamePlatforms.find(platform => platform.value == this.props.platform).name}</td>
                <td>{gameGenres.find(genre => genre.value == this.props.genre).name}</td>
                <td>
                    <div className="btn-group">
                        <Link to={'/admin/games/'+this.props.url} className="btn btn-default">Edit</Link>
                        <a href="#" className="btn btn-default">Trophy</a>
                    </div>
                </td>
            </tr>
        )
    }
}