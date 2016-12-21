import * as React from 'react';

import Field from './field.component';

interface FormProps extends React.Props<any> {
    fields: any;
    data: any;
    change: any;
    submit?: any;
}

class Form extends React.Component<FormProps, void> {
    render() {
        const { fields, data, change } = this.props;
        return (
            <form>
                <table className="table table-bordered">
                    <tbody>
                    {
                        fields.map((field, key) => {
                            return <Field field={field} key={key} data={data ? data[field.name] : ''} change={(f, v) => change(f, v)} />
                        })
                    }
                    </tbody>
                </table>
            </form>
        );  
    }
}

export default Form;