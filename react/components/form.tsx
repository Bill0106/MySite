import * as React from 'react';
import axios from 'axios';

import { authKeys } from '../config/auth-keys';

import { FormProps, FormState } from '../interface/form';

import { getImageData } from '../helpers';

export class Form extends React.Component<FormProps, FormState> {
    constructor(props) {
        super();

        if (props.field['type'] == 'image') {
            this.state = {
                image: '',
                image_obj: ''
            }
        }
    }

    handleUpload(e) {
        let data = new FormData();
        data.append('file', e.target.files[0]);

        axios.post('/api/images', data, {
            headers: { 'auth': authKeys.post }
        })
            .then(response => {
                this.setState({
                    image: response.data.url,
                    image_obj: JSON.stringify(response.data)
                })
            })
    }

    render() {
        let ele = null;
        switch (this.props.field['type']) {
            case 'image':
                let image = this.props.value ? getImageData(this.props.value) : this.props.field['placeholder'];
                ele = (
                    <div className="admin-image-upload">
                        <div className="image-uploader">
                            <img src={this.state.image ? this.state.image : image} />
                            <input type="file" onChange={this.handleUpload.bind(this)} />
                        </div>
                        <input type="text" className="form-control" value={this.state.image_obj} onChange={this.props.func}/>
                    </div>
                );
                break;
            case 'text':
                ele = <textarea value={this.props.value} className="form-control" rows={20} onChange={this.props.func}/>;
                break;
            case 'date':
                ele = <input className="form-control" type="date" value={this.props.value} onChange={this.props.func}/>;
                break;
            case 'select':
                ele = (
                    <select className="form-control" value={this.props.value} onChange={this.props.func}>
                        {
                            this.props.field['enum'].map(option => {
                                return <option value={option.value} key={option.value}>{option.name}</option>;
                            })
                        }
                    </select>
                );
                break;
            default:
                ele = <input type="text" className="form-control" onChange={this.props.func} value={this.props.value}/>;
                break;
        }


        return <div>{ele}</div>;
    }
}