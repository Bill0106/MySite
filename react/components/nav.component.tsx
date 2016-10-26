import * as React from 'react';
import { Link, IndexLink } from 'react-router';

export class Nav extends React.Component<{}, {}> {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#adminNav" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <IndexLink to="/admin" className="navbar-brand">Admin</IndexLink>
                    </div>
                    <div className="collapse navbar-collapse" id="adminNav">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/admin/games" activeClassName="active">Games</Link></li>
                            <li><Link to="/admin/gourmets" activeClassName="active">Gourmets</Link></li>
                            <li><Link to="/admin/hearthstone" activeClassName="active">Hearthstone</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}