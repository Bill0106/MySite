import * as React from 'react';
import { Link } from 'react-router';

import { DashboardItemProps } from '../interface/dashboard';

export class DashboardItem extends React.Component<DashboardItemProps, {}> {
    render() {
        return (
            <Link key={this.props.key} className="list-group-item list-group-item-info" to={this.props.link}>
                <h4 className="list-group-item-heading">{this.props.title}</h4>
            </Link>
        );
    }
}