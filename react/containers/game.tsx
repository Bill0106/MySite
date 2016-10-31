import * as React from 'react';
import axios from 'axios';

import { authKeys } from '../config/auth-keys';
import { GameFields } from '../config/game-fields';

import { GameProps, GameState } from '../interface/games';

import { Form } from '../components/form';

import { time2Date } from '../helpers';

export class Game extends React.Component<GameProps, GameState> {
    constructor() {
        super();

        this.state = {
            image: '',
            title: '',
            name: '',
            developer: '',
            publisher: '',
            release_at: '',
            buy_at: '',
            rate: 1,
            url: '',
            platform: 0,
            genre: 0,
            description: ''
        }
    }

    componentDidMount() {
        let url = '/api/games/' + this.props.params['url'];
        axios.get(url, {
            headers: { 'auth': authKeys.get }
        })
            .then(response => {
                this.setState({
                    image: response.data.image,
                    title: response.data.title,
                    name: response.data.name,
                    developer: response.data.developer,
                    publisher: response.data.publisher,
                    release_at: time2Date(response.data.release_at),
                    buy_at: time2Date(response.data.buy_at),
                    rate: response.data.rate,
                    url: response.data.url,
                    platform: response.data.platform,
                    genre: response.data.genre,
                    description: response.data.description
                })
            });
    }

    submitContent(e) {
        e.preventDefault();
        console.log(this.state);
    }

    handleChange(name, value) {
        let change = this.state;
        change[name] = value;
        this.setState(change);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <section className="page-header">
                            <h1>{this.props.params['url'] == 'add' ? 'Add New Game' : this.state.name + ' - Edit'}</h1>
                        </section>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <form onSubmit={this.submitContent.bind(this)}>
                            <table className="table table-bordered">
                                <tbody>
                                {
                                    GameFields.map((field, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{field.field.toUpperCase()}</td>
                                                <td>
                                                    <Form field={field}
                                                          func={this.handleChange.bind(this)}
                                                          value={this.state[field.field]}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                            <div className="form-group">
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}