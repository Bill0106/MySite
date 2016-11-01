import * as React from 'react';

import { TrophyFields } from '../config/trophy-fields';

import { TrophyItemProps } from '../interface/trophy';

import { Form } from './form';

export class TrophyItem extends React.Component<TrophyItemProps, {}> {
    handleChange(field, value) {
        this.props.func(this.props.index, field, value);
    }

    render() {
        return (
            <tr>
                {
                    TrophyFields.map((field, key) => {
                        return (
                            <td key={key}>
                                <Form field={field} func={this.handleChange.bind(this)} value={this.props.trophy[field.field]} />
                            </td>
                        )
                    })
                }
            </tr>
        )
    }
}