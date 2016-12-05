import * as React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

import { HearthstoneSeasonFields } from '../../config/fields/hearthstone-season';
import { SeasonProps, SeasonState } from '../interface/hearthstone';
import { Form } from '../components/form';
import { time2Date, setPageTitle } from "../helpers";

export class HearthstoneSeason extends React.Component<SeasonProps, SeasonState> {
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
        let url = '/hearthstone-seasons/';
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
            axios.get('/hearthstone-seasons/' + this.props.params['url'])
                .then(response => {
                    setPageTitle(response.data.title);
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
        } else {
            setPageTitle('Add New Hearthstone Season');
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
                              submit={this.handleSubmit.bind(this)} fields={HearthstoneSeasonFields} />
                    </div>
                </div>
            </div>
        )
    }
}