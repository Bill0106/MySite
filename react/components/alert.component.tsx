import * as React from "react";

interface AlertProps extends React.Props<any> {
    isFetching: boolean;
    isPosting: boolean;
    posted: boolean;
    error: any;
}

class Alert extends React.Component<AlertProps, void> {
    render() {
        const { isFetching, isPosting, posted, error } = this.props;
        let alert = null;

        if (isFetching) {
            alert = <div className="alert alert-info" role="alert">Loading...</div>;
        } else if (isPosting) {
            alert = <div className="alert alert-info" role="alert">Posting...</div>;
        } else if (posted) {
            alert = <div className="alert alert-success" role="alert">Success!</div>;
        } else if (error) {
            alert = (
                <div className="alert alert-danger" role="alert">
                    <strong>{error.status} !</strong> {error.data}
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