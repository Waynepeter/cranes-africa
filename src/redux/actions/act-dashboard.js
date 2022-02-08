
import axios from 'axios';
import {
  FETCH_NODE_REQUEST, FETCH_NODE_SUCCESS, FETCH_NODE_FAILURE,
  FETCH_NETWORK_REQUEST, FETCH_NETWORK_SUCCESS, FETCH_NETWORK_FAILURE,
  FETCH_STATS_REQUEST, FETCH_STATS_SUCCESS, FETCH_STATS_FAILURE
} from '../types';
import { serverBaseURL } from '../util';

const fetchNodeRequest = () => {
  return {
    type: FETCH_NODE_REQUEST,
  }
}

const fetchNodeSuccess = node => {
  return {
    type: FETCH_NODE_SUCCESS,
    payload: node
  }
}

const fetchNodeFailure = error => {
  return {
    type: FETCH_NODE_FAILURE,
    payload: error
  }
}

const fetchNode = () => {
  return dispatch => {
    dispatch(fetchNodeRequest());
    axios
      .get(`${serverBaseURL()}/root/information/view-node`, { withCredentials: true })
      .then(rs => {
        if (rs.data.data)  dispatch(fetchNodeSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchNodeFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(fetchNodeFailure(error));
      });
  }
}

const fetchNetworkRequest = () => {
  return {
    type: FETCH_NETWORK_REQUEST,
  }
}

const fetchNetworkSuccess = network => {
  return {
    type: FETCH_NETWORK_SUCCESS,
    payload: network
  }
}

const fetchNetworkFailure = error => {
  return {
    type: FETCH_NETWORK_FAILURE,
    payload: error
  }
}

const fetchNetwork = () => {
  return dispatch => {
    dispatch(fetchNetworkRequest());
    axios
      .get(`${serverBaseURL()}/root/information/view-network`, { withCredentials: true })
      .then(rs => {
        if (rs.data.data)  dispatch(fetchNetworkSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchNetworkFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(fetchNetworkFailure(error));
      });
  }
}

const fetchStatsRequest = () => {
  return {
    type: FETCH_STATS_REQUEST,
  }
}

const fetchStatsSuccess = stats => {
  return {
    type: FETCH_STATS_SUCCESS,
    payload: stats
  }
}

const fetchStatsFailure = error => {
  return {
    type: FETCH_STATS_FAILURE,
    payload: error
  }
}

const fetchStats = () => {
  return dispatch => {
    dispatch(fetchStatsRequest());
    axios
      .get(`${serverBaseURL()}/root/information/view-dashboard`, { withCredentials: true })
      .then(rs => {
        if (rs.data.data)  dispatch(fetchStatsSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchStatsFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(fetchStatsFailure(error));
      });
  }
}

export { fetchNode, fetchNetwork, fetchStats };