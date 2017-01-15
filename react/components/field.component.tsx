import * as React from "react";
import { time2Date } from "../helpers";
import Image from "../containers/image.container";

interface FieldProps extends React.Props<any> {
    field: any;
    data: any;
    change: any;
}

class Field extends React.Component<FieldProps, void> {
    handleChange(e) {
        const { change, field } = this.props;
        change(field.name, e.target.value);
    }

    handleField(field, data) {
        switch (field.type) {
            case "image":
                return <Image image={data ? JSON.parse(data).url : field.placeholder} change={(f, v) => this.props.change(f, v)} />;
            case "text":
                return <textarea value={data} className="form-control" rows={20} onChange={this.handleChange.bind(this)} />;
            case "select":
                return (
                    <select className="form-control" value={data} onChange={this.handleChange.bind(this)}>
                        {
                            field.enum.map(option => {
                                return <option value={option.value} key={option.value}>{option.value + " - " + option.name}</option>;
                            })
                        }
                    </select>
                );
            case "date":
                return <input className="form-control" type="date" value={time2Date(data)} onChange={this.handleChange.bind(this)} />;
            case "radio":
                return (
                    <div>
                        {
                            field.enum.map(radio => {
                                return (
                                    <label className="radio-inline" key={radio}>
                                        <input type="radio" value={radio} checked={data === radio} onChange={this.handleChange.bind(this)} />
                                        {radio}
                                    </label>
                                );
                            })
                        }
                    </div>
                );
            case "checkbox":
                return (
                    <div>
                    {
                        field.enum.map(check => {
                            return (
                                <label className="checkbox-inline" key={check.value}>
                                    <input type="checkbox" value={check.value} checked={data === check.value} onChange={this.handleChange.bind(this)} />
                                    {check.name}
                                </label>
                            );
                        })
                    }
                    </div>
                );
            default:
                return <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder={"ENTER " + field.name.toUpperCase()} value={data || ""} />;
        }
    }

    render() {
        const { field, data } = this.props;
        return (
            <tr>
                <td><label>{field.name.toUpperCase()}</label></td>
                <td>{this.handleField(field, data)}</td>
            </tr>
        );
    }
}

export default Field