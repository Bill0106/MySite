import axios from "axios"
import { connect } from "react-redux"
import { createAction } from "redux-actions"
import { actionTypes } from "../constants/action-types.constants"
import ImageUpload from "../components/image-upload.component"

const { image } = actionTypes

const mapStateToProps = (state, ownProps) => {
    return {
        image: state.image,
        imageUrl: ownProps.image,
        change: ownProps.change
    }
}

const mapDispatchToProps = (dispatch) => {
    const uploadImage = createAction(image.post, (file: any) => axios.post("/images", file))
    const initImage = createAction(image.init)
    return {
        upload: (file) => dispatch(uploadImage(file)),
        init: () => dispatch(initImage())
    }
}

const Image = connect(mapStateToProps, mapDispatchToProps)(ImageUpload)

export default Image