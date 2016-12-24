import * as React from 'react';

import Field from './field.component';

interface FormProps extends React.Props<any> {
    fields: any;
    data: any;
    change: any;
    submit: any;
}

class Form extends React.Component<FormProps, void> {
    handleSubmit(e) {
        const { submit } = this.props;
        e.preventDefault();

        submit();
    }

    render() {
        const { fields, data, change } = this.props;
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <table className="table table-bordered">
                    <tbody>
                    {
                        fields.map((field, key) => {
                            return <Field field={field} key={key} data={data ? data[field.name] : ''} change={(f, v) => change(f, v)} />
                        })
                    }
                    </tbody>
                </table>
                <div className="form-group">
                    <button className="btn btn-success" type="submit">Submit</button>
                </div>
            </form>
        );  
    }
}

export default Form;