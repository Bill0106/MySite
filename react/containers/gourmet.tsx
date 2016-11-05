import * as React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

import { GourmetFields } from '../../config/gourmet-fields';
import { GourmetProps, GourmetState } from '../interface/gourmet';
import { Form } from '../components/form';
import { time2Date } from "../helpers";

export class Gourmet extends React.Component<GourmetProps, GourmetState> {
    constructor() {
        super();

        this.state = {
            id: '',
            image: '',
            food: '',
            restaurant: '',
            date: '',
            url: '',
        }
    }

    componentDidMount() {
        if (this.props.params['url'] != 'add') {
            axios.get('/api/gourmets/' + this.props.params['id'])
                .then(response => {
                    this.setState({
                        id: response.data._id,
                        image: response.data.image,
                        food: response.data.food,
                        restaurant: response.data.restaurant,
                        date: time2Date(response.data.date),
                        url: response.data.url,
                    })
                });
        }
    }

    submitContent(e) {
        e.preventDefault();
        let url = '/api/gourmets/';
        if (this.props.params['id'] != 'add') {
            url = url + this.props.params['id'];
        }

        axios.post(url, this.state)
            .then(response => {
                if (response.data.success) {
                    browserHistory.push('/admin/gourmets');
                }
            })
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
                            <h1>{this.props.params['id'] == 'add' ? 'Add New Gourmet' : this.state.food + ' - Edit'}</h1>
                        </section>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <form onSubmit={this.submitContent.bind(this)}>
                            <table className="table table-bordered">
                                <tbody>
                                {
                                    GourmetFields.map((field, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>
                                                    <label>{field.field.toUpperCase()}</label>
                                                </td>
                                                <td>
                                                    <Form field={field} func={this.handleChange.bind(this)} value={this.state[field.field]} />
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
        );
    }
}