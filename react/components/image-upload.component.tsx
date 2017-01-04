import * as React from 'react';

interface ImageUploadProps extends React.Props<any> {
    image: any;
    imageUrl: string;
    upload: any;
    change: any;
    init: any;
}

class ImageUpload extends React.Component<ImageUploadProps, void> {
    componentWillMount() {
        const { init } = this.props;
        init();
    }

    componentWillUpdate(nextProps, nextState) {
        const { change } = this.props;
        const { image } = nextProps;

        if (!this.props.image.fetched && image.fetched) {
            change('image', JSON.stringify(image.image));
        }
    }

    handleUpload(e) {
        const { upload } = this.props;
        let data = new FormData();
        data.append('file', e.target.files[0]);
        upload(data);
    }

    handleStatus(image) {
        const { isPosting, error } = image;
        if (isPosting) {
            return <div className="alert alert-info">Posting...</div>;
        } else if (error) {
            return <div className="alert alert-danger">{error.data}</div>;
        }
    }

    render() {
        const { image, imageUrl, change } = this.props;

        return (
            <div className="clearfix">
                <div className="admin-image-upload">
                    <img src={imageUrl} alt="" />
                    <input type="file" onChange={this.handleUpload.bind(this)} />
                </div>
                {this.handleStatus(image)}
            </div>
        );
    }
}

export default ImageUpload;