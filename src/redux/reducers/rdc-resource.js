
import {
  FETCH_RESOURCES_REQUEST, FETCH_RESOURCES_SUCCESS, FETCH_RESOURCES_FAILURE,
  FETCH_RESOURCE_REQUEST, FETCH_RESOURCE_SUCCESS, FETCH_RESOURCE_FAILURE,
  RESOURCE_PERMISSION_ALLOC_REQUEST, RESOURCE_PERMISSION_ALLOC_SUCCESS, RESOURCE_PERMISSION_ALLOC_FAILURE,
  RESOURCE_PERMISSION_DEALLOC_REQUEST, RESOURCE_PERMISSION_DEALLOC_SUCCESS, RESOURCE_PERMISSION_DEALLOC_FAILURE
} from '../types';
import {
  initResource, initResources, initResourcePermissionAlloc, initResourcePermissionDeAlloc
} from '../states';

const resourceReducer = (state = initResource, action) => {
  switch (action.type) {
    case FETCH_RESOURCE_REQUEST:
      return {
        ...state, loading: true
      }
    case FETCH_RESOURCE_SUCCESS:
      return {
        loading: false,
        resource: action.payload,
        error: null
      }
    case FETCH_RESOURCE_FAILURE:
      return {
        loading: false,
        resource: {},
        error: action.payload
      }
    default:
      return state
  }
}

const resourcesReducer = (state = initResources, action) => {
  switch (action.type) {
    case FETCH_RESOURCES_REQUEST: 
      return {
        ...state, loading: true
      }
    case FETCH_RESOURCES_SUCCESS:
      return {
        loading: false,
        resources: action.payload,
        error: null
      }
    case FETCH_RESOURCES_FAILURE:
      return {
        loading: false,
        resources: [],
        error: action.payload
      }
    default:
      return state
  }
}

const resourcePermissionAllocReducer = (state = initResourcePermissionAlloc, action) => {
  switch (action.type) {
    case RESOURCE_PERMISSION_ALLOC_REQUEST: 
      return {
        ...state, loading: true
      }
    case RESOURCE_PERMISSION_ALLOC_SUCCESS:
      return {
        loading: false,
        resourcePermissionAlloc: action.payload,
        error: null
      }
    case RESOURCE_PERMISSION_ALLOC_FAILURE:
      return {
        loading: false,
        resourcePermissionAlloc: {},
        error: action.payload
      }
    default:
      return state
  }
}

const resourcePermissionDeAllocReducer = (state = initResourcePermissionDeAlloc, action) => {
  switch (action.type) {
    case RESOURCE_PERMISSION_DEALLOC_REQUEST: 
      return {
        ...state, loading: true
      }
    case RESOURCE_PERMISSION_DEALLOC_SUCCESS:
      return {
        loading: false,
        resourcePermissionDeAlloc: action.payload,
        error: null
      }
    case RESOURCE_PERMISSION_DEALLOC_FAILURE:
      return {
        loading: false,
        resourcePermissionDeAlloc: {},
        error: action.payload
      }
    default:
      return state
  }
}

export {
  resourceReducer, resourcesReducer, resourcePermissionAllocReducer, resourcePermissionDeAllocReducer
}