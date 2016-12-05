import * as React from 'react';
import axios from 'axios';

import { AdminListPage } from '../../config/admin-list-page';

import { DashboardState } from '../interface/dashboard';
import { DashboardItem } from '../components/items/dashboard-item';

import { setPageTitle } from '../helpers';

let sections = [
    { title: 'Games', link: '/admin/games' },
    { title: 'Gourmets', link: '/admin/gourmets' },
    { title: 'Hearthstone Seasons', link: '/admin/hearthstone-seasons' },
    { title: 'Hearthstone Decks', link: '/admin/hearthstone-decks' },
    { title: 'Hearthstone Matches', link: '/admin/hearthstone-matches' },
];

export class Dashboard extends React.Component<{}, DashboardState> {
    constructor() {
        super();

        this.state = {
            counts: []
        };
    }

    componentDidMount() {
        setPageTitle('Admin Dashboard', true);
        axios.get('/counts')
            .then(response => {
                this.setState({
                    counts: response.data
                })
            })
    }

    render() {
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
                                AdminListPage.map((section, key) => {
                                    let count = 0;
                                    let table = this.state.counts.find(count => count.table == section.path.toLowerCase());
                                    if (table) {
                                        count = table.count;
                                    }

                                    return <DashboardItem title={section.path} link={'/admin/' + section.path.toLowerCase()} count={count} key={key} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}