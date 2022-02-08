
import {
  CREATE_SERVICE_REQUEST, CREATE_SERVICE_SUCCESS, CREATE_SERVICE_FAILURE, 
  UPDATE_SERVICE_REQUEST, UPDATE_SERVICE_SUCCESS, UPDATE_SERVICE_FAILURE, 
  DELETE_SERVICES_REQUEST, DELETE_SERVICES_SUCCESS, DELETE_SERVICES_FAILURE, 
  FETCH_SERVICE_REQUEST, FETCH_SERVICE_SUCCESS, FETCH_SERVICE_FAILURE, 
  FETCH_SERVICES_REQUEST, FETCH_SERVICES_SUCCESS, FETCH_SERVICES_FAILURE
} from '../types';
import {
  initCreateService, initUpdateService, initDeleteServices, initFetchService, initFetchServices
} from '../states';

const createServiceReducer = (state = initCreateService, action) => {
  switch (action.type) {
    case CREATE_SERVICE_REQUEST:
      return {
        ...state, loading: true
      }
    case CREATE_SERVICE_SUCCESS:
      return {
        loading: false,
        createService: action.payload,
        error: null
      }
    case CREATE_SERVICE_FAILURE:
      return {
        loading: false,
        createService: {},
        error: action.payload
      }
    default:
      return state
  }
}
const updateServiceReducer = (state = initUpdateService, action) => {
  switch (action.type) {
    case UPDATE_SERVICE_REQUEST:
      return {
        ...state, loading: true
      }
    case UPDATE_SERVICE_SUCCESS:
      return {
        loading: false,
        updateService: action.payload,
        error: null
      }
    case UPDATE_SERVICE_FAILURE:
      return {
        loading: false,
        updateService: {},
        error: action.payload
      }
    default:
      return state
  }
}
const deleteServicesReducer = (state = initDeleteServices, action) => {
  switch (action.type) {
    case DELETE_SERVICES_REQUEST:
      return {
        ...state, loading: true
      }
    case DELETE_SERVICES_SUCCESS:
      return {
        loading: false,
        deleteServices: action.payload,
        error: null
      }
    case DELETE_SERVICES_FAILURE:
      return {
        loading: false,
        deleteServices: [],
        error: action.payload
      }
    default:
      return state
  }
}
const fetchServiceReducer = (state = initFetchService, action) => {
  switch (action.type) {
    case FETCH_SERVICE_REQUEST:
      return {
        ...state, loading: true
      }
    case FETCH_SERVICE_SUCCESS:
      return {
        loading: false,
        fetchService: action.payload,
        error: null
      }
    case FETCH_SERVICE_FAILURE:
      return {
        loading: false,
        fetchService: {},
        error: action.payload
      }
    default:
      return state
  }
}
const fetchServicesReducer = (state = initFetchServices, action) => {
  switch (action.type) {
    case FETCH_SERVICES_REQUEST:
      return {
        ...state, loading: true
      }
    case FETCH_SERVICES_SUCCESS:
      return {
        loading: false,
        fetchServices: action.payload,
        error: null
      }
    case FETCH_SERVICES_FAILURE:
      return {
        loading: false,
        fetchServices: [],
        error: action.payload
      }
    default:
      return state
  }
}

export {
  createServiceReducer, updateServiceReducer, deleteServicesReducer, fetchServiceReducer, fetchServicesReducer,
}