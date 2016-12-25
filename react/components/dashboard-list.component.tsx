import * as React from 'react';

import DashboardItem from './dashboard-item.component';
import Alert from './alert.component';

interface DashboardListProps extends React.Props<any> {
    counts: any;
    getCounts: any;
}

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

        if (counts.items){
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
                    <div className="col-sm-12">
                        <Alert fetch={counts} />
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