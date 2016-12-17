import * as React from 'react';
import { Link } from 'react-router';

import { DashboardItemProps } from '../interface/dashboard.interface';

class DashboardItem extends React.Component<DashboardItemProps, void> {
    render() {
        return (
            <Link className="list-group-item list-group-item-info" to={'/admin/' + this.props.title.toLocaleLowerCase()}>
                <h4 className="list-group-item-heading">
                    {this.props.title.replace('-', ' ')}
                    <span className="badge pull-right">{this.props.count}</span>
                </h4>
            </Link>
        );
    }
}

export default DashboardItem;