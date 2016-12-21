import * as React from 'react';

interface AlertProps extends React.Props<any> {
    fetch: any;
}

class Alert extends React.Component<AlertProps, void> {
    render() {
        const { fetch } = this.props;
        let alert = null;

        if (fetch.isFetching) {
            alert = <div className="alert alert-info" role="alert">Loading...</div>;
        } else if (fetch.error) {
            alert = (
                <div className="alert alert-danger" role="alert">
                    <strong>{fetch.error.status} !</strong> {fetch.error.data}
                </div>
            );
        }

        return (
            <div className="row">
                <div className="col-sm-12">{alert}</div>
            </div>
        );
    }
}

export default Alert;