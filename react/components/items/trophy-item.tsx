import * as React from 'react';

import { GameTrophyFields } from '../../../config/fields/game-trophy';
import { TrophyItemProps } from '../../interface/trophy';
import { Field } from '../field';

export class TrophyItem extends React.Component<TrophyItemProps, {}> {
    handleChange(field, value) {
        this.props.func(this.props.index, field, value);
    }

    render() {
        return (
            <tr>
                {
                    GameTrophyFields.map((field, key) => {
                        return (
                            <td key={key}>
                                <Field field={field} func={this.handleChange.bind(this)} value={this.props.trophy[field.field]} />
                            </td>
                        )
                    })
                }
            </tr>
        )
    }
}