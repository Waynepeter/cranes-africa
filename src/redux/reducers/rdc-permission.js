
import {
  FETCH_PERMISSIONS_REQUEST, FETCH_PERMISSIONS_SUCCESS, FETCH_PERMISSIONS_FAILURE,
  FETCH_PERMISSION_REQUEST, FETCH_PERMISSION_SUCCESS, FETCH_PERMISSION_FAILURE,
  CREATE_PERMISSIONS_REQUEST, CREATE_PERMISSIONS_SUCCESS, CREATE_PERMISSIONS_FAILURE,
  UPDATE_PERMISSION_REQUEST, UPDATE_PERMISSION_SUCCESS, UPDATE_PERMISSION_FAILURE,
  DELETE_PERMISSIONS_REQUEST, DELETE_PERMISSIONS_SUCCESS, DELETE_PERMISSIONS_FAILURE
} from '../types';
import {
 initPermissions, initPermission, initPermissionCreate, initPermissionUpdate, 
 initPermissionsDelete
} from '../states';

const permissionsReducer = (state = initPermissions, action) => {
  switch (action.type) {
    case FETCH_PERMISSIONS_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case FETCH_PERMISSIONS_SUCCESS:
      return {
        loading: false,
        permissions: action.payload,
        error: null
      }
    case FETCH_PERMISSIONS_FAILURE:
      return {
        loading: false,
        permissions: [],
        error: action.payload
      }
    default:
      return state
  }
}

const permissionReducer = (state = initPermission, action) => {
  switch (action.type) {
    case FETCH_PERMISSION_REQUEST: 
      return {
        ...state,
        loading: true
      }

    case FETCH_PERMISSION_SUCCESS:
      return {
        loading: false,
        permission: action.payload,
        error: null
      }

    case FETCH_PERMISSION_FAILURE:
      return {
        loading: false,
        permission: {},
        error: action.payload
      }
    
    default:
      return state
  }
}

const permissionsCreateReducer = (state = initPermissionCreate, action) => {
  switch (action.type) {
    case CREATE_PERMISSIONS_REQUEST:
      return {
        ...state, loading: true
      }
    case CREATE_PERMISSIONS_SUCCESS:
      return {
        loading: false,
        createPermissions: action.payload,
        error: null
      }
    case CREATE_PERMISSIONS_FAILURE:
      return {
        loading: false,
        createPermissions: [],
        error: action.payload
      }
    default:
      return state
  }
}

const permissionUpdateReducer = (state = initPermissionUpdate, action) => {
  switch (action.type) {
    case UPDATE_PERMISSION_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_PERMISSION_SUCCESS:
      return {
        loading: false,
        updatePermission: action.payload,
        error: null
      }
    case UPDATE_PERMISSION_FAILURE:
      return {
        loading: false,
        updatePermission: {},
        error: action.payload
      }
    default:
      return state
  }
}

const permissionsDeleteReducer = (state = initPermissionsDelete, action) => {
  switch (action.type) {
    case DELETE_PERMISSIONS_REQUEST:
      return {
        ...state, loading: true
      }
    case DELETE_PERMISSIONS_SUCCESS:
      return {
        loading: false,
        deletePermissions: action.payload,
        error: null
      }
    case DELETE_PERMISSIONS_FAILURE:
      return {
        loading: false,
        deletePermissions: [],
        error: action.payload
      }
    default:
      return state
  }
}

export {
  permissionsReducer, permissionReducer, permissionsCreateReducer, permissionsDeleteReducer,
  permissionUpdateReducer
}
