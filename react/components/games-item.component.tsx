import * as React from 'react';
import { Link } from 'react-router';

import { ListItemProps } from '../interface/list.interface';
import { GamePlatforms } from '../../config/game-platforms';
import { GameGenres } from '../../config/game-genres';

class GamesItem extends React.Component<ListItemProps, void> {
    render() {
        const { data } = this.props;
        return (
            <tr>
                <td>{data._id}</td>
                <td>
                    <Link to={'/admin/games/' + data.url}>{data.title}</Link>
                </td>
                <td>{data.name}</td>
                <td>{GamePlatforms.find(platfrom => platfrom.value == data.platform).name}</td>
                <td>{GameGenres.find(genre => genre.value == data.genre).name}</td>
                <td>
                    <Link to={'/admin/games/' + data.url + '/trophy'} className="btn btn-primary">Tophy</Link>
                    <button className="btn btn-danger" type="button" onClick={this.props.delete}>&times;</button>
                </td>
            </tr>
        );
    }
}

export default GamesItem;