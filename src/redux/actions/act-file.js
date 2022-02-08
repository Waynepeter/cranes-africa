
import axios from 'axios';

import { serverBaseURL } from '../util';
import {
  UPLOAD_FILE_REQUEST, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAILURE
} from '../types';

const uploadFileRequest = () => {
  return {
    type: UPLOAD_FILE_REQUEST,
  }
}

const uploadFileSuccess = fileData => {
  return {
    type: UPLOAD_FILE_SUCCESS,
    payload: fileData
  }
}

const uploadFileFailure = error => {
  return {
    type: UPLOAD_FILE_FAILURE,
    payload: error
  }
}

const uploadFile = formData => {
  return dispatch => {
    dispatch(uploadFileRequest());
    axios
      .post(`${serverBaseURL()}/files/management/upload-file`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(rs => {
        if (rs.data.data)  dispatch(uploadFileSuccess(rs.data.data));
        if (rs.data.error) dispatch(uploadFileFailure(rs.data.error));
      })
      .catch(error => dispatch(uploadFileFailure(error)));
  }
}

export { uploadFile };