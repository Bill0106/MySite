import * as React from 'react';

import { DashboardListProps } from '../interface/dashboard.interface';
import DashboardItem from './dashboard-item.component';
import Error from './error.component';

class DashboardList extends React.Component<DashboardListProps, void> {
    componentWillMount() {
        document.title = 'Dashboard - ' + document.title;
    }

    componentDidMount() {
        const { getCounts } = this.props;
        getCounts();
    }

    render() {
        const { counts } = this.props;
        let content = null;

        if (counts.error) {
            content = <Error status={counts.error.status} text={counts.error.data} />
        } else {
            let items = [];
            counts.items.map((item, key) => {
                items.push(<DashboardItem key={key} title={item.title} count={item.count} />)
            })
            content = <div className="list-group">{items}</div>;
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <section className="page-header text-center">
                            <h1>Welcome back, My Master !</h1>
                        </section>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">{content}</div>
                </div>
            </div>
        );
    }
}

export default DashboardList;