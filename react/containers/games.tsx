import * as React from 'react';
import axios from 'axios';

import { AuthKeys } from '../config/auth-keys';

import { GameItem } from '../components/game-item';
import { Pagination } from '../components/pagination';

import { GamesProps, GamesState } from '../interface/games';

const GAME_PAGE_PER = 30;
const API_URL = '/api/games';

export class Games extends React.Component<GamesProps, GamesState> {
    constructor() {
        super();

        this.state = {
            list: [],
            total: 0
        };
    }

    fetchApi(page?): void {
        let url = API_URL + '?limit=' + GAME_PAGE_PER + (page ? '&page=' + page : '');

        axios.get(url, {
            headers: { 'auth': AuthKeys.get }
        })
            .then(response => {
                this.setState({
                    list: response.data.list,
                    total: response.data.total,
                });
            })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.query['page'] !== this.props.location.query['page']) {
            this.fetchApi(nextProps.location.query['page']);
        }
    }

    componentDidMount() {
        this.fetchApi(this.props.location.query['page']);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <section className="page-header">
                            <h1>Games <small>{this.state.total}</small></h1>
                        </section>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Name</th>
                                    <th>Platform</th>
                                    <th>Genre</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.list.map((item, key) => {
                                        return <GameItem key={key} id={item._id} title={item.title} name={item.name}
                                                         platform={item.platform} genre={item.genre} url={item.url} />
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <Pagination link="/games" total={this.state.total} per={GAME_PAGE_PER}
                                    current={this.props.location.query['page']} />
                    </div>
                </div>
            </div>
        )
    }
}