import * as React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

import { GameFields } from '../../config/game-fields';
import { GameProps, GameState } from '../interface/game';
import { Form } from '../components/form';
import { time2Date } from '../helpers';

export class Game extends React.Component<GameProps, GameState> {
    constructor() {
        super();
        this.state = {
            id: '',
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
        if (this.props.params['url'] != 'add') {
            axios.get('/games/' + this.props.params['url'])
                .then(response => {
                    this.setState({
                        id: response.data._id,
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
    }

    handleChange(name, value) {
        let change = this.state;
        change[name] = value;
        this.setState(change);
    }

    handleSubmit() {
        let url = '/games/';
        if (this.props.params['url'] != 'add') {
            url = url + this.props.params['url'];
        }

        axios.post(url, this.state)
            .then(response => {
                if (response.data.success) {
                    browserHistory.push('/admin/games');
                }
            })
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
                        <Form data={this.state} change={this.handleChange.bind(this)}
                              submit={this.handleSubmit.bind(this)} fields={GameFields} />
                    </div>
                </div>
            </div>
        )
    }
}