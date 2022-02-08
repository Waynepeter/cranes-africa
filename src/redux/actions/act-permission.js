
import axios from 'axios';
import {
  FETCH_PERMISSIONS_REQUEST, FETCH_PERMISSIONS_SUCCESS, FETCH_PERMISSIONS_FAILURE,
  FETCH_PERMISSION_REQUEST, FETCH_PERMISSION_SUCCESS, FETCH_PERMISSION_FAILURE,
  CREATE_PERMISSIONS_REQUEST, CREATE_PERMISSIONS_SUCCESS, CREATE_PERMISSIONS_FAILURE,
  UPDATE_PERMISSION_REQUEST, UPDATE_PERMISSION_SUCCESS, UPDATE_PERMISSION_FAILURE,
  DELETE_PERMISSIONS_REQUEST, DELETE_PERMISSIONS_SUCCESS, DELETE_PERMISSIONS_FAILURE
} from '../types';
import { serverBaseURL } from '../util';

const fetchPermissionsRequest = () => {
  return {
    type: FETCH_PERMISSIONS_REQUEST,
  }
}

const fetchPermissionsSuccess = permissions => {
  return {
    type: FETCH_PERMISSIONS_SUCCESS,
    payload: permissions
  }
}

const fetchPermissionsFailure = error => {
  return {
    type: FETCH_PERMISSIONS_FAILURE,
    payload: error
  }
}

const fetchPermissions = () => {
  return (dispatch) => {
    dispatch(fetchPermissionsRequest());
    
    axios
      .get(`${serverBaseURL()}/authentication/permission/view_all-permission`, 
        { withCredentials: true }
      )
      .then(rs => {
        if (rs.data.data)  dispatch(fetchPermissionsSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchPermissionsFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(fetchPermissionsFailure(error));
      });
  }
}

const fetchPermissionRequest = () => {
  return {
    type: FETCH_PERMISSION_REQUEST,
  }
}

const fetchPermissionSuccess = permission => {
  return {
    type: FETCH_PERMISSION_SUCCESS,
    payload: permission
  }
}

const fetchPermissionFailure = error => {
  return {
    type: FETCH_PERMISSION_FAILURE,
    payload: error
  }
}

const fetchPermission = parameter => {
  return dispatch => {
    dispatch(fetchPermissionRequest());
    axios
      .get(`${serverBaseURL()}/authentication/permission/view_one-permission?parameter=${parameter}`, 
        { withCredentials: true }
      )
      .then(rs => {
        if (rs.data.data)  dispatch(fetchPermissionSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchPermissionFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(fetchPermissionFailure(error));
      });
  }
}

const createPermissionsRequest = () => {
  return {
    type: CREATE_PERMISSIONS_REQUEST,
  }
}

const createPermissionsSuccess = permissions => {
  return {
    type: CREATE_PERMISSIONS_SUCCESS,
    payload: permissions
  }
}

const createPermissionsFailure = error => {
  return {
    type: CREATE_PERMISSIONS_FAILURE,
    payload: error
  }
}

const createPermissions = permissions => {
  return dispatch => {
    dispatch(createPermissionsRequest());
    axios
      .post(`${serverBaseURL()}/authentication/permission/create-permission`, permissions)
      .then(rs => {
        if (rs.data.data)  dispatch(createPermissionsSuccess(rs.data.data));
        if (rs.data.error) dispatch(createPermissionsFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(createPermissionsFailure(error));
      });
  }
}

const updatePermissionRequest = () => {
  return {
    type: UPDATE_PERMISSION_REQUEST,
  }
}

const updatePermissionSuccess = permission => {
  return {
    type: UPDATE_PERMISSION_SUCCESS,
    payload: permission
  }
}

const updatePermissionFailure = error => {
  return {
    type: UPDATE_PERMISSION_FAILURE,
    payload: error
  }
}

const updatePermission = permission => {
  return dispatch => {
    dispatch(updatePermissionRequest());
    axios
      .post(`${serverBaseURL()}/authentication/permission/update-permission`, permission)
      .then(rs => {
        if (rs.data.data)  dispatch(updatePermissionSuccess(rs.data.data));
        if (rs.data.error) dispatch(updatePermissionFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(updatePermissionFailure(error));
      });
  }
}

const deletePermissionsRequest = () => {
  return {
    type: DELETE_PERMISSIONS_REQUEST,
  }
}

const deletePermissionsSuccess = permissions => {
  return {
    type: DELETE_PERMISSIONS_SUCCESS,
    payload: permissions
  }
}

const deletePermissionsFailure = error => {
  return {
    type: DELETE_PERMISSIONS_FAILURE,
    payload: error
  }
}

const deletePermissions = permissions => {
  return dispatch => {
    dispatch(deletePermissionsRequest());
    axios
      .post(`${serverBaseURL()}/authentication/permission/delete-permission`, permissions)
      .then(rs => {
        if (rs.data.data)  dispatch(deletePermissionsSuccess(rs.data.data));
        if (rs.data.error) dispatch(deletePermissionsFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(deletePermissionsFailure(error));
      });
  }
}

export {
  fetchPermissions, fetchPermission, createPermissions, updatePermission, deletePermissions
}