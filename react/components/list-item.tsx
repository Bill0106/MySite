import * as React from 'react';

import { ListItemProps } from '../interface/list';
import { time2Date } from '../helpers';

export class ListItem extends React.Component<ListItemProps, {}> {
    render() {
        return (
            <tr>
                {
                    this.props.fields.map((value, key) => {
                        let field = value.field == 'id' ? '_id' : value.field;
                        let ele = <div>{this.props.data[field]}</div>;
                        if (value.type == 'date') {
                            ele = <div>{time2Date(this.props.data[field])}</div>
                        } else if (key === 1) {
                            ele = <a href="#">{this.props.data[field]}</a>
                        }

                        return <td key={key}>{ele}</td>
                    })
                }
            </tr>
        )
    }
}