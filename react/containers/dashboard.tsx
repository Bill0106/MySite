import * as React from 'react';

import { DashboardItem } from '../components/dashboard-item';

let sections = [
    { title: 'Games', link: '/admin/games' },
    { title: 'Gourmets', link: '/admin/gourmets' },
    { title: 'Hearthstone Seasons', link: '/admin/hearthstone/seasons' },
    { title: 'Hearthstone Decks', link: '/admin/hearthstone/decks' },
    { title: 'Hearthstone Matches', link: '/admin/hearthstone/matches' },
];

export class Dashboard extends React.Component<{}, {}> {
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
                                sections.map((section, key) => {
                                    return <DashboardItem title={section.title} link={section.link} key={key} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}