import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { DashboardProps } from '../interface/dashboard';
import { fetchCounts } from '../actions/countsActions';
import { DashboardItem } from '../components/items/dashboard-item';

import { setPageTitle } from '../helpers';

const mapStateToProps = state => {
    return {
        counts: state.counts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCounts: () => dispatch(fetchCounts())
    }
}

class Dashboard extends React.Component<DashboardProps, void> {
    componentWillMount() {
        this.props.getCounts();
    }

    render() {
        const { counts } = this.props;

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
                    <div className="col-sm-6 col-sm-offset-3">
                        <div className="list-group">
                        {
                            counts.items.map((item, key) => {
                                return <DashboardItem key={key} title={item.title} count={item.count} />;
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);