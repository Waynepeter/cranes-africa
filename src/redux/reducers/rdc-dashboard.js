
import {
  FETCH_NODE_REQUEST, FETCH_NODE_SUCCESS, FETCH_NODE_FAILURE,
  FETCH_NETWORK_REQUEST, FETCH_NETWORK_SUCCESS, FETCH_NETWORK_FAILURE,
  FETCH_STATS_REQUEST, FETCH_STATS_SUCCESS, FETCH_STATS_FAILURE
} from '../types';
import { initNode, initNetwork, initStats } from '../states';

const nodeReducer = (state = initNode, action) => {
  switch (action.type) {
    case FETCH_NODE_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case FETCH_NODE_SUCCESS:
      return {
        loading: false,
        node: action.payload,
        error: null
      }
    case FETCH_NODE_FAILURE:
      return {
        loading: false,
        node: {},
        error: action.payload
      }
    default:
      return state
  }
}

const networkReducer = (state = initNetwork, action) => {
  switch (action.type) {
    case FETCH_NETWORK_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case FETCH_NETWORK_SUCCESS:
      return {
        loading: false,
        network: action.payload,
        error: null
      }
    case FETCH_NETWORK_FAILURE:
      return {
        loading: false,
        network: {},
        error: action.payload
      }
    default:
      return state
  }
}

const statsReducer = (state = initStats, action) => {
  switch (action.type) {
    case FETCH_STATS_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case FETCH_STATS_SUCCESS:
      return {
        loading: false,
        stats: action.payload,
        error: null
      }
    case FETCH_STATS_FAILURE:
      return {
        loading: false,
        stats: {},
        error: action.payload
      }
    default:
      return state
  }
}

export { nodeReducer, networkReducer, statsReducer };