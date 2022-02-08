
import {
  FETCH_ROLES_REQUEST, FETCH_ROLES_SUCCESS, FETCH_ROLES_FAILURE,
  FETCH_ROLE_REQUEST, FETCH_ROLE_SUCCESS, FETCH_ROLE_FAILURE,
  CREATE_ROLES_REQUEST, CREATE_ROLES_SUCCESS, CREATE_ROLES_FAILURE,
  UPDATE_ROLE_REQUEST, UPDATE_ROLE_SUCCESS, UPDATE_ROLE_FAILURE,
  ROLE_PERMISSION_ALLOC_REQUEST, ROLE_PERMISSION_ALLOC_SUCCESS, ROLE_PERMISSION_ALLOC_FAILURE, 
  ROLE_PERMISSION_DEALLOC_REQUEST, ROLE_PERMISSION_DEALLOC_SUCCESS, ROLE_PERMISSION_DEALLOC_FAILURE,
  DELETE_ROLES_REQUEST, DELETE_ROLES_SUCCESS, DELETE_ROLES_FAILURE
} from '../types';
import {
  initRoles, initRole, initCreateRoles, initUpdateRole, initDeleteRoles, initRolePermissionAlloc,
  initRolePermissionDeAlloc
} from '../states';

const rolesReducer = (state = initRoles, action) => {
  switch (action.type) {
    case FETCH_ROLES_REQUEST: 
      return {
        ...state, loading: true
      }
    case FETCH_ROLES_SUCCESS:
      return {
        loading: false,
        roles: action.payload,
        error: null
      }
    case FETCH_ROLES_FAILURE:
      return {
        loading: false,
        roles: [],
        error: action.payload
      }
    default:
      return state
  }
}

const roleReducer = (state = initRole, action) => {
  switch (action.type) {
    case FETCH_ROLE_REQUEST: 
      return {
        ...state, loading: true
      }
    case FETCH_ROLE_SUCCESS:
      return {
        loading: false,
        role: action.payload,
        error: null
      }
    case FETCH_ROLE_FAILURE:
      return {
        loading: false,
        role: {},
        error: action.payload
      }
    default:
      return state
  }
}

const createRolesReducer = (state = initCreateRoles, action) => {
  switch (action.type) {
    case CREATE_ROLES_REQUEST: 
      return {
        ...state, loading: true
      }
    case CREATE_ROLES_SUCCESS:
      return {
        loading: false,
        createRoles: action.payload,
        error: null
      }
    case CREATE_ROLES_FAILURE:
      return {
        loading: false,
        createRoles: [],
        error: action.payload
      }
    default:
      return state
  }
}

const updateRoleReducer = (state = initUpdateRole, action) => {
  switch (action.type) {
    case UPDATE_ROLE_REQUEST: 
      return {
        ...state, loading: true
      }
    case UPDATE_ROLE_SUCCESS:
      return {
        loading: false,
        updateRole: action.payload,
        error: null
      }
    case UPDATE_ROLE_FAILURE:
      return {
        loading: false,
        updateRole: {},
        error: action.payload
      }
    default:
      return state
  }
}

const deleteRolesReducer = (state = initDeleteRoles, action) => {
  switch (action.type) {
    case DELETE_ROLES_REQUEST: 
      return {
        ...state, loading: true
      }
    case DELETE_ROLES_SUCCESS:
      return {
        loading: false,
        deleteRoles: action.payload,
        error: null
      }
    case DELETE_ROLES_FAILURE:
      return {
        loading: false,
        deleteRoles: {},
        error: action.payload
      }
    default:
      return state
  }
}

const rolePermissionAllocReducer = (state = initRolePermissionAlloc, action) => {
  switch (action.type) {
    case ROLE_PERMISSION_ALLOC_REQUEST: 
      return {
        ...state, loading: true
      }
    case ROLE_PERMISSION_ALLOC_SUCCESS:
      return {
        loading: false,
        rolePermissionAlloc: action.payload,
        error: null
      }
    case ROLE_PERMISSION_ALLOC_FAILURE:
      return {
        loading: false,
        rolePermissionAlloc: {},
        error: action.payload
      }
    default:
      return state
  }
}

const rolePermissionDeAllocReducer = (state = initRolePermissionDeAlloc, action) => {
  switch (action.type) {
    case ROLE_PERMISSION_DEALLOC_REQUEST: 
      return {
        ...state, loading: true
      }
    case ROLE_PERMISSION_DEALLOC_SUCCESS:
      return {
        loading: false,
        rolePermissionDeAlloc: action.payload,
        error: null
      }
    case ROLE_PERMISSION_DEALLOC_FAILURE:
      return {
        loading: false,
        rolePermissionDeAlloc: {},
        error: action.payload
      }
    default:
      return state
  }
}

export {
  rolesReducer, roleReducer, createRolesReducer, updateRoleReducer, deleteRolesReducer, 
  rolePermissionAllocReducer, rolePermissionDeAllocReducer
}

