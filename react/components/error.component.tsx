import * as React from 'react';

import { ErrorProps } from '../interface/error.interface';

class Error extends React.Component<ErrorProps, void> {
    render() {
        return (
            <div className="alert alert-danger" role="alert">
                <strong>{this.props.status} !</strong> {this.props.text}
            </div>
        );
    }
}

export default Error