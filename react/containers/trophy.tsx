import * as React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

import { TrophyProps, TrophyState } from '../interface/trophy';
import { TrophyItem } from '../components/trophy-item';
import { Field } from '../components/field';
import { time2Date } from "../helpers";

export class Trophy extends React.Component<TrophyProps, TrophyState> {
    constructor() {
        super();
        this.state = {
            id: '',
            total: 0,
            earned: 0,
            trophies: [],
            game_id: '',
            url: '',
        };
    }

    fetchTrophyApi(id) {
        axios.get('/api/games/trophy/' + id)
            .then(response => {
                if (response.status === 200 && response.data) {
                    let data = {
                        id: response.data._id,
                        total: response.data.total,
                        earned: response.data.earned,
                        trophies: response.data.trophies,
                    };

                    data.trophies.map(trophy => {
                        if (trophy.date) {
                            trophy.date = time2Date(trophy.date);
                        }
                    });

                    Object.keys(data).map(value => {
                        this.handleChange(value, data[value]);
                    });
                }
            })
    }

    handleChange(name, value) {
        let change = this.state;
        change[name] = value;
        this.setState(change);
    }

    handleTrophies(index, field, value) {
        let change = this.state.trophies;
        change[index][field] = value;
        this.handleChange('trophies', change);
    }

    handleUpdate(e) {
        e.preventDefault();

        axios.post('/api/games/trophy/' + this.state.id, this.state)
            .then(response => {
                if (response.data.success) {
                    browserHistory.push('/admin/games');
                }
            });
    }

    componentDidMount() {
        axios.get('/api/games/' + this.props.params['url'])
            .then(response => {
                this.handleChange('game_id', response.data._id);
                if (response.data.trophies) {
                    this.fetchTrophyApi(response.data.trophies);
                }
            });
    }

    render() {
        if (this.state.total) {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <section className="page-header">
                                <h1>Game Trophy - Edit</h1>
                            </section>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <form onSubmit={this.handleUpdate.bind(this)}>
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>Date</th>
                                        <th>Rarity</th>
                                        <th>Tool</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.trophies.map((trophy, key) => {
                                            return <TrophyItem index={key} key={key} func={this.handleTrophies.bind(this)} trophy={trophy} />
                                        })
                                    }
                                    </tbody>
                                </table>
                                <div className="form-group">
                                    <button className="btn btn-success" type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else {
            let field = {
                field: 'url',
                type: 'input',
            };

            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <section className="page-header">
                                <h1>Game Trophy - Create</h1>
                            </section>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <form>
                                <div className="form-group">
                                    <label>PSN URL:</label>
                                    <Field field={field} func={this.handleChange.bind(this)} value={this.state['url']} />
                                </div>
                                <button className="btn btn-success" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    }
}