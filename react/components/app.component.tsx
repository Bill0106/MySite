import * as React from "react";
import { Link, IndexLink } from "react-router";

class App extends React.Component<void, void> {
    render() {
        return (
            <div>
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
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Hearthstone <span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/admin/hearthstone-seasons">Seasons</Link></li>
                                        <li><Link to="/admin/hearthstone-decks">Decks</Link></li>
                                        <li><Link to="/admin/hearthstone-matches">Matches</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/admin/blogs" activeClassName="active">Blogs</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {this.props.children}
            </div>
        )
    }
}

export default App;