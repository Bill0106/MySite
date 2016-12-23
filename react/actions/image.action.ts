import axios from 'axios';

export function uploadImage(file) {
    return {
        type: 'UPLOAD_IMAGE',
        payload: axios.post('/images', file)
    }
}

export function initImage() {
    return {
        type: 'INIT_IMAGE'
    }
}