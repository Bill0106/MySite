import * as React from 'react';

import { FormProps } from '../interface/form';
import { Field } from './field';

export class Form extends React.Component<FormProps, {}> {
    handleSubmit(e) {
        e.preventDefault();

        this.props.submit();
    }

    handleChange(field, value) {
        this.props.change(field, value);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <table className="table table-bordered admin-table-form">
                    <tbody>
                    {
                        this.props.fields.map((field, key) => {
                            return (
                                <tr key={key}>
                                    <td>
                                        <label>{field.field.toUpperCase()}</label>
                                    </td>
                                    <td>
                                        <Field field={field} func={this.handleChange.bind(this)}
                                               value={this.props.data[field.field]} />
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
        );
    }
}