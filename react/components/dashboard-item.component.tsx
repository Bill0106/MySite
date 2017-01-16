import * as React from 'react';
import { Link } from 'react-router';

interface DashboardItemProps extends React.Props<any> {
    title: string;
    count: number;
}

class DashboardItem extends React.Component<DashboardItemProps, void> {
    render() {
        const { title, count } = this.props;

        return (
            <Link className="list-group-item list-group-item-info" to={'/admin/' + title.toLocaleLowerCase()}>
                <h4 className="list-group-item-heading">
                    {title.replace('-', ' ')}
                    <span className="badge pull-right">{count}</span>
                </h4>
            </Link>
        );
    }
}

export default DashboardItem;