import * as React from 'react';
import axios from 'axios';

import { AuthKeys } from '../config/auth-keys';

import { FormProps, FormState } from '../interface/form';

import { getImageData } from '../helpers';

export class Form extends React.Component<FormProps, FormState> {
    constructor(props) {
        super();

        if (props.field['type'] == 'image') {
            this.state = {
                image: '',
            }
        }
    }

    handleUpload(e) {
        let data = new FormData();
        data.append('file', e.target.files[0]);

        axios.post('/api/images', data, {
            headers: { 'auth': AuthKeys.post }
        })
            .then(response => {
                this.setState({
                    image: response.data.url,
                });

                this.props.func(this.props.field['field'], JSON.stringify(response.data));
            })
    }

    handleChange(e) {
        this.props.func(this.props.field['field'], e.target.value);
    }

    render() {
        let ele = null;
        switch (this.props.field['type']) {
            case 'image':
                let image = this.props.value ? getImageData(this.props.value) : this.props.field['placeholder'];
                ele = (
                    <div className="admin-image-upload">
                        <img src={this.state.image ? this.state.image : image} />
                        <input type="file" onChange={this.handleUpload.bind(this)} />
                    </div>
                );
                break;
            case 'text':
                ele = <textarea value={this.props.value} className="form-control" rows={20} onChange={this.handleChange.bind(this)}/>;
                break;
            case 'date':
                ele = <input className="form-control" type="date" value={this.props.value} onChange={this.handleChange.bind(this)}/>;
                break;
            case 'radio':
                ele = (
                    <div>
                        {
                            this.props.field['enum'].map(radio => {
                                return (
                                    <label className="radio-inline" key={radio}>
                                        <input type="radio"
                                               name={this.props.field['field']}
                                               value={radio} checked={this.props.value == radio}
                                               onChange={this.handleChange.bind(this)}
                                        />
                                        {radio}
                                    </label>
                                )
                            })
                        }
                    </div>
                );
                break;
            case 'select':
                ele = (
                    <select className="form-control" value={this.props.value} onChange={this.handleChange.bind(this)}>
                        {
                            this.props.field['enum'].map(option => {
                                return <option value={option.value} key={option.value}>{option.name}</option>;
                            })
                        }
                    </select>
                );
                break;
            default:
                ele = <input type="text" className="form-control" onChange={this.handleChange.bind(this)} value={this.props.value}/>;
                break;
        }


        return <div>{ele}</div>;
    }
}