import * as React from 'react';
import { Link } from 'react-router';

import { ListMainProps } from '../interface/list';
import { Pagination } from './pagination';
import { GameItem } from './items/game-item';
import { GourmetItem } from './items/gourmet-item';
import { HsSeasonItem } from './items/hs-season-item';
import { HsDeckItem } from './items/hs-deck-item';
import { HsMatchItem } from './items/hs-match-item';

export class List extends React.Component<ListMainProps, {}> {
    handleItem(data, key) {
        let ele = null;
        switch (this.props.title.toLowerCase()) {
            case 'games':
                ele = <GameItem data={data} key={key} />;
                break;
            case 'gourmets':
                ele = <GourmetItem data={data} key={key} />;
                break;
            case 'hearthstone-seasons':
                ele = <HsSeasonItem data={data} key={key} />;
                break;
            case 'hearthstone-decks':
                ele = <HsDeckItem data={data} key={key} />;
                break;
            case 'hearthstone-matches':
                ele = <HsMatchItem data={data} key={key} />
                break;
            default:
                break;
        }

        return ele;
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <section className="page-header">
                        <h1>
                            {this.props.title} <small>{this.props.total}</small>
                            <Link to={'/admin/' + this.props.title.toLowerCase() + '/add'}
                                  className="btn btn-primary pull-right">Add</Link>
                        </h1>
                    </section>
                </div>
                <div className="col-sm-12">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>ID</th>
                            {
                                this.props.fields.map((field, key) => {
                                    return <th key={key}>{field.toUpperCase()}</th>;
                                })
                            }
                            <th>OPERATION</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.data.map((value, key) => {
                                return this.handleItem(value, key);
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-12">
                    <Pagination link={'/' + this.props.title.toLowerCase()} total={this.props.total}
                                per={this.props.per}
                                current={this.props.current} />
                </div>
            </div>
        )
    }
}