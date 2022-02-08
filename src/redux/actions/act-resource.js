
import axios from 'axios';
import {
  FETCH_RESOURCE_REQUEST, FETCH_RESOURCE_SUCCESS, FETCH_RESOURCE_FAILURE,
  FETCH_RESOURCES_REQUEST, FETCH_RESOURCES_SUCCESS, FETCH_RESOURCES_FAILURE,
  RESOURCE_PERMISSION_ALLOC_REQUEST, RESOURCE_PERMISSION_ALLOC_SUCCESS, RESOURCE_PERMISSION_ALLOC_FAILURE,
  RESOURCE_PERMISSION_DEALLOC_REQUEST, RESOURCE_PERMISSION_DEALLOC_SUCCESS, RESOURCE_PERMISSION_DEALLOC_FAILURE
} from '../types';
import { serverBaseURL } from '../util';

const fetchResourceRequest = () => {
  return {
    type: FETCH_RESOURCE_REQUEST,
  }
}

const fetchResourceSuccess = resource => {
  return {
    type: FETCH_RESOURCE_SUCCESS,
    payload: resource
  }
}

const fetchResourceFailure = error => {
  return {
    type: FETCH_RESOURCE_FAILURE,
    payload: error
  }
}

const fetchResource = parameter => {
  return dispatch => {
    dispatch(fetchResourceRequest());
    axios
      .get(`${serverBaseURL()}/root/information/view_one-resource?parameter=${parameter}`, 
        { withCredentials: true }
      )
      .then(rs => {
        if (rs.data.data)  dispatch(fetchResourceSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchResourceFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(fetchResourceFailure(error));
      });
  }
}

const fetchResourcesRequest = () => {
  return {
    type: FETCH_RESOURCES_REQUEST,
  }
}

const fetchResourcesSuccess = resources => {
  return {
    type: FETCH_RESOURCES_SUCCESS,
    payload: resources
  }
}

const fetchResourcesFailure = error => {
  return {
    type: FETCH_RESOURCES_FAILURE,
    payload: error
  }
}

const fetchResources = () => {
  return dispatch => {
    dispatch(fetchResourcesRequest());
    axios
      .get(`${serverBaseURL()}/root/information/view_all-resource`, { withCredentials: true })
      .then(rs => {
        if (rs.data.data)  dispatch(fetchResourcesSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchResourcesFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(fetchResourcesFailure(error));
      });
  }
}

const resourcePermissionAllocRequest = () => {
  return {
    type: RESOURCE_PERMISSION_ALLOC_REQUEST,
  }
}

const resourcePermissionAllocSuccess = resourcePermissionAlloc => {
  return {
    type: RESOURCE_PERMISSION_ALLOC_SUCCESS,
    payload: resourcePermissionAlloc
  }
}

const resourcePermissionAllocFailure = error => {
  return {
    type: RESOURCE_PERMISSION_ALLOC_FAILURE,
    payload: error
  }
}

const resourcePermissionAlloc = resourcePermissions => {
  return dispatch => {
    dispatch(resourcePermissionAllocRequest());
    axios
      .post(`${serverBaseURL()}/root/resource/allocate-permission-to-resource`, resourcePermissions)
      .then(rs => {
        if (rs.data.data)  dispatch(resourcePermissionAllocSuccess(rs.data.data));
        if (rs.data.error) dispatch(resourcePermissionAllocFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(resourcePermissionAllocFailure(error));
      });
  }
}

const resourcePermissionDeAllocRequest = () => {
  return {
    type: RESOURCE_PERMISSION_DEALLOC_REQUEST,
  }
}

const resourcePermissionDeAllocSuccess = resourcePermissionDeAlloc => {
  return {
    type: RESOURCE_PERMISSION_DEALLOC_SUCCESS,
    payload: resourcePermissionDeAlloc
  }
}

const resourcePermissionDeAllocFailure = error => {
  return {
    type: RESOURCE_PERMISSION_DEALLOC_FAILURE,
    payload: error
  }
}

const resourcePermissionDeAlloc = resourcePermissions => {
  return dispatch => {
    dispatch(resourcePermissionDeAllocRequest());
    axios
      .post(`${serverBaseURL()}/root/resource/de_allocate-permission-from-resource`, resourcePermissions)
      .then(rs => {
        if (rs.data.data)  dispatch(resourcePermissionDeAllocSuccess(rs.data.data));
        if (rs.data.error) dispatch(resourcePermissionDeAllocFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(resourcePermissionDeAllocFailure(error));
      });
  }
}

export {
  fetchResources, fetchResource, resourcePermissionAlloc, resourcePermissionDeAlloc
}