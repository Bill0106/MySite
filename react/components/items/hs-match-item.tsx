import * as React from 'react';

import { HsPlayerClasses } from '../../../config/hs-player-classes';
import { HsMatchResult } from '../../../config/hs-match-result';
import { ListItemProps } from '../../interface/list';
import { time2Date } from '../../helpers';

export class HsMatchItem extends React.Component<ListItemProps, {}> {
    render() {
        return (
            <tr>
                <td>{this.props.data._id}</td>
                <td>{time2Date(this.props.data.time, true)}</td>
                <td>{this.props.data.deck_id}</td>
                <td>{HsPlayerClasses.find(player => player.value == this.props.data.opponent).name}</td>
                <td>{HsMatchResult.find(result => result.value == this.props.data.result).name}</td>
                <td>
                    <button className="btn btn-danger" type="button">Delete</button>
                </td>
            </tr>
        );
    }
}