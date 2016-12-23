import { connect } from 'react-redux';
import { uploadImage, initImage } from '../actions/image.action';
import ImageUpload from '../components/image-upload.component';

const mapStateToProps = (state, ownProps) => {
    return {
        image: state.image,
        imageUrl: ownProps.image,
        change: ownProps.change
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        upload: (file) => dispatch(uploadImage(file)),
        init: () => dispatch(initImage())
    }
}

const Image = connect(mapStateToProps, mapDispatchToProps)(ImageUpload);

export default Image;