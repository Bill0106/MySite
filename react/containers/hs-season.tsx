import * as React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

import { HsSeasonFields } from '../../config/hs-season-fields';
import { SeasonProps, SeasonState } from '../interface/hearthstone';
import { Form } from '../components/form';
import { time2Date } from "../helpers";

export class HsSeason extends React.Component<SeasonProps, SeasonState> {
    constructor() {
        super();
        this.state = {
            id: '',
            image: '',
            title: '',
            month: '',
            rank: 0,
            url: '',
            description: ''
        }
    }

    handleChange(name, value) {
        let change = this.state;
        change[name] = value;
        this.setState(change);
    }

    handleSubmit() {
        let url = '/hearth-stone/seasons/';
        if (this.props.params['url'] != 'add') {
            url = url + this.props.params['url'];
        }

        axios.post(url, this.state)
            .then(response => {
                if (response.data.success) {
                    browserHistory.push('/admin/hearthstone-seasons');
                }
            })
    }

    componentDidMount() {
        if (this.props.params['url'] != 'add') {
            axios.get('/hearth-stone/seasons/' + this.props.params['url'])
                .then(response => {
                    this.setState({
                        id: response.data._id,
                        image: response.data.image,
                        title: response.data.title,
                        month: time2Date(response.data.month),
                        rank: response.data.rank,
                        url: response.data.url,
                        description: response.data.description
                    })
                });
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <section className="page-header">
                            <h1>{this.props.params['url'] == 'add' ? 'Add New Hearthstone-Season' : this.state.title + ' - Edit'}</h1>
                        </section>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <Form data={this.state} change={this.handleChange.bind(this)}
                              submit={this.handleSubmit.bind(this)} fields={HsSeasonFields} />
                    </div>
                </div>
            </div>
        )
    }
}