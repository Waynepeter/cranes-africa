
import axios from 'axios';
import { serverBaseURL } from '../util';
import {
  CREATE_SERVICE_REQUEST, CREATE_SERVICE_SUCCESS, CREATE_SERVICE_FAILURE, 
  UPDATE_SERVICE_REQUEST, UPDATE_SERVICE_SUCCESS, UPDATE_SERVICE_FAILURE, 
  DELETE_SERVICES_REQUEST, DELETE_SERVICES_SUCCESS, DELETE_SERVICES_FAILURE, 
  FETCH_SERVICE_REQUEST, FETCH_SERVICE_SUCCESS, FETCH_SERVICE_FAILURE, 
  FETCH_SERVICES_REQUEST, FETCH_SERVICES_SUCCESS, FETCH_SERVICES_FAILURE
} from '../types';

const createServiceRequest = () => {
  return {
    type: CREATE_SERVICE_REQUEST,
  }
}
const createServiceSuccess = data => {
  return {
    type: CREATE_SERVICE_SUCCESS,
    payload: data
  }
}
const createServiceFailure = error => {
  return {
    type: CREATE_SERVICE_FAILURE,
    payload: error
  }
}
const createService = data => {
  return dispatch => {
    dispatch(createServiceRequest());
    axios
      .post(`${serverBaseURL()}/products/service/create-service`, data)
      .then(rs => {
        if (rs.data.data)  dispatch(createServiceSuccess(rs.data.data));
        if (rs.data.error) dispatch(createServiceFailure(rs.data.error));
      })
      .catch(error => dispatch(createServiceFailure(error)));
  }
}

const updateServiceRequest = () => {
  return {
    type: UPDATE_SERVICE_REQUEST,
  }
}
const updateServiceSuccess = data => {
  return {
    type: UPDATE_SERVICE_SUCCESS,
    payload: data
  }
}
const updateServiceFailure = error => {
  return {
    type: UPDATE_SERVICE_FAILURE,
    payload: error
  }
}
const updateService = data => {
  return dispatch => {
    dispatch(updateServiceRequest());
    axios
      .post(`${serverBaseURL()}/products/service/update-service`, data)
      .then(rs => {
        if (rs.data.data)  dispatch(updateServiceSuccess(rs.data.data));
        if (rs.data.error) dispatch(updateServiceFailure(rs.data.error));
      })
      .catch(error => dispatch(updateServiceFailure(error)));
  }
}

const deleteServicesRequest = () => {
  return {
    type: DELETE_SERVICES_REQUEST,
  }
}
const deleteServicesSuccess = data => {
  return {
    type: DELETE_SERVICES_SUCCESS,
    payload: data
  }
}
const deleteServicesFailure = error => {
  return {
    type: DELETE_SERVICES_FAILURE,
    payload: error
  }
}
const deleteServices = data => {
  return dispatch => {
    dispatch(deleteServicesRequest());
    axios
      .post(`${serverBaseURL()}/products/service/delete-service`, data)
      .then(rs => {
        if (rs.data.data)  dispatch(deleteServicesSuccess(rs.data.data));
        if (rs.data.error) dispatch(deleteServicesFailure(rs.data.error));
      })
      .catch(error => dispatch(deleteServicesFailure(error)));
  }
}

const fetchServiceRequest = () => {
  return {
    type: FETCH_SERVICE_REQUEST,
  }
}
const fetchServiceSuccess = data => {
  return {
    type: FETCH_SERVICE_SUCCESS,
    payload: data
  }
}
const fetchServiceFailure = error => {
  return {
    type: FETCH_SERVICE_FAILURE,
    payload: error
  }
}
const fetchService = parameter => {
  return dispatch => {
    dispatch(fetchServiceRequest());
    axios
      .get(`${serverBaseURL()}/products/service/fetch_one-service?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchServiceSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchServiceFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchServiceFailure(error)));
  }
}

const fetchServicesRequest = () => {
  return {
    type: FETCH_SERVICES_REQUEST,
  }
}
const fetchServicesSuccess = data => {
  return {
    type: FETCH_SERVICES_SUCCESS,
    payload: data
  }
}
const fetchServicesFailure = error => {
  return {
    type: FETCH_SERVICES_FAILURE,
    payload: error
  }
}
const fetchServices = () => {
  return dispatch => {
    dispatch(fetchServicesRequest());
    axios
      .get(`${serverBaseURL()}/products/service/fetch_all-service`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchServicesSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchServicesFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchServicesFailure(error)));
  }
}

export {
  createService, updateService, deleteServices, fetchService, fetchServices
}