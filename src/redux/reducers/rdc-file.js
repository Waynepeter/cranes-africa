import {
  UPLOAD_FILE_REQUEST, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAILURE
} from '../types';
import {
  initUploadFile
} from '../states';

const uploadFileReducer = (state = initUploadFile, action) => {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case UPLOAD_FILE_SUCCESS:
      return {
        loading: false,
        uploadFile: action.payload,
        error: null
      }
    case UPLOAD_FILE_FAILURE:
      return {
        loading: false,
        uploadFile: {},
        error: action.payload
      }
    default:
      return state
  }
}

export {
  uploadFileReducer
}