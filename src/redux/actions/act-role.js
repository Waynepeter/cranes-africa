
import axios from 'axios';
import {
  FETCH_ROLES_REQUEST, FETCH_ROLES_SUCCESS, FETCH_ROLES_FAILURE,
  FETCH_ROLE_REQUEST, FETCH_ROLE_SUCCESS, FETCH_ROLE_FAILURE,
  CREATE_ROLES_REQUEST, CREATE_ROLES_SUCCESS, CREATE_ROLES_FAILURE,
  UPDATE_ROLE_REQUEST, UPDATE_ROLE_SUCCESS, UPDATE_ROLE_FAILURE,
  ROLE_PERMISSION_ALLOC_REQUEST, ROLE_PERMISSION_ALLOC_SUCCESS, ROLE_PERMISSION_ALLOC_FAILURE, 
  ROLE_PERMISSION_DEALLOC_REQUEST, ROLE_PERMISSION_DEALLOC_SUCCESS, ROLE_PERMISSION_DEALLOC_FAILURE,
  DELETE_ROLES_REQUEST, DELETE_ROLES_SUCCESS, DELETE_ROLES_FAILURE
} from '../types';
import { serverBaseURL } from '../util';

const fetchRolesRequest = () => {
  return {
    type: FETCH_ROLES_REQUEST,
  }
}

const fetchRolesSuccess = roles => {
  return {
    type: FETCH_ROLES_SUCCESS,
    payload: roles
  }
}

const fetchRolesFailure = error => {
  return {
    type: FETCH_ROLES_FAILURE,
    payload: error
  }
}

const fetchRoles = () => {
  return dispatch => {
    dispatch(fetchRolesRequest());
    axios
      .get(`${serverBaseURL()}/authentication/role/view_all-role`, { withCredentials: true })
      .then(rs => {
        if (rs.data.data)  dispatch(fetchRolesSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchRolesFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(fetchRolesFailure(error));
      });
  }
}

const fetchRoleRequest = () => {
  return {
    type: FETCH_ROLE_REQUEST,
  }
}

const fetchRoleSuccess = role => {
  return {
    type: FETCH_ROLE_SUCCESS,
    payload: role
  }
}

const fetchRoleFailure = error => {
  return {
    type: FETCH_ROLE_FAILURE,
    payload: error
  }
}

const fetchRole = parameter => {
  return dispatch => {
    dispatch(fetchRoleRequest());
    axios
      .get(`${serverBaseURL()}/authentication/role/view_one-role?parameter=${parameter}`, 
        { withCredentials: true }
      )
      .then(rs => {
        if (rs.data.data)  dispatch(fetchRoleSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchRoleFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(fetchRoleFailure(error));
      });
  }
}

const createRolesRequest = () => {
  return {
    type: CREATE_ROLES_REQUEST,
  }
}

const createRolesSuccess = roles => {
  return {
    type: CREATE_ROLES_SUCCESS,
    payload: roles
  }
}

const createRolesFailure = error => {
  return {
    type: CREATE_ROLES_FAILURE,
    payload: error
  }
}

const createRoles = roles => {
  return dispatch => {
    dispatch(createRolesRequest());
    axios
      .post(`${serverBaseURL()}/authentication/role/create-role`, roles)
      .then(rs => {
        if (rs.data.data)  dispatch(createRolesSuccess(rs.data.data));
        if (rs.data.error) dispatch(createRolesFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(createRolesFailure(error));
      });
  }
}

const updateRoleRequest = () => {
  return {
    type: UPDATE_ROLE_REQUEST,
  }
}

const updateRoleSuccess = role => {
  return {
    type: UPDATE_ROLE_SUCCESS,
    payload: role
  }
}

const updateRoleFailure = error => {
  return {
    type: UPDATE_ROLE_FAILURE,
    payload: error
  }
}

const updateRole = role => {
  return dispatch => {
    dispatch(updateRoleRequest());
    axios
      .post(`${serverBaseURL()}/authentication/role/update-role`, role)
      .then(rs => {
        if (rs.data.data)  dispatch(updateRoleSuccess(rs.data.data));
        if (rs.data.error) dispatch(updateRoleFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(updateRoleFailure(error));
      });
  }
}

const deleteRolesRequest = () => {
  return {
    type: DELETE_ROLES_REQUEST,
  }
}

const deleteRolesSuccess = roles => {
  return {
    type: DELETE_ROLES_SUCCESS,
    payload: roles
  }
}

const deleteRolesFailure = error => {
  return {
    type: DELETE_ROLES_FAILURE,
    payload: error
  }
}

const deleteRoles = roles => {
  return dispatch => {
    dispatch(deleteRolesRequest());
    axios
      .post(`${serverBaseURL()}/authentication/role/delete-role `, roles)
      .then(rs => {
        if (rs.data.data)  dispatch(deleteRolesSuccess(rs.data.data));
        if (rs.data.error) dispatch(deleteRolesFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(deleteRolesFailure(error));
      });
  }
}

const rolePermissionAllocRequest = () => {
  return {
    type: ROLE_PERMISSION_ALLOC_REQUEST,
  }
}

const rolePermissionAllocSuccess = rolePermissionAlloc => {
  return {
    type: ROLE_PERMISSION_ALLOC_SUCCESS,
    payload: rolePermissionAlloc
  }
}

const rolePermissionAllocFailure = error => {
  return {
    type: ROLE_PERMISSION_ALLOC_FAILURE,
    payload: error
  }
}

const rolePermissionAlloc = rolePermissions => {
  return dispatch => {
    dispatch(rolePermissionAllocRequest());
    axios
      .post(`${serverBaseURL()}/authentication/role/allocate-permission-to-role`, rolePermissions)
      .then(rs => {
        if (rs.data.data)  dispatch(rolePermissionAllocSuccess(rs.data.data));
        if (rs.data.error) dispatch(rolePermissionAllocFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(rolePermissionAllocFailure(error));
      });
  }
}

const rolePermissionDeAllocRequest = () => {
  return {
    type: ROLE_PERMISSION_DEALLOC_REQUEST,
  }
}

const rolePermissionDeAllocSuccess = rolePermissionDeAlloc => {
  return {
    type: ROLE_PERMISSION_DEALLOC_SUCCESS,
    payload: rolePermissionDeAlloc
  }
}

const rolePermissionDeAllocFailure = error => {
  return {
    type: ROLE_PERMISSION_DEALLOC_FAILURE,
    payload: error
  }
}

const rolePermissionDeAlloc = rolePermissions => {
  return dispatch => {
    dispatch(rolePermissionDeAllocRequest());
    axios
      .post(`${serverBaseURL()}/authentication/role/de_allocate-permission-from-role`, rolePermissions)
      .then(rs => {
        if (rs.data.data)  dispatch(rolePermissionDeAllocSuccess(rs.data.data));
        if (rs.data.error) dispatch(rolePermissionDeAllocFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(rolePermissionDeAllocFailure(error));
      });
  }
}

export {
  fetchRoles, fetchRole, createRoles, deleteRoles, rolePermissionAlloc, rolePermissionDeAlloc,
  updateRole
}