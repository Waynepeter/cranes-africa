
import {
  FETCH_ORGANIZATION_REQUEST, FETCH_ORGANIZATION_SUCCESS, FETCH_ORGANIZATION_FAILURE,
  SEND_CONTACT_MESSAGE_REQUEST, SEND_CONTACT_MESSAGE_SUCCESS, SEND_CONTACT_MESSAGE_FAILURE,
  SEND_SUBSCRIPTION_REQUEST, SEND_SUBSCRIPTION_SUCCESS, SEND_SUBSCRIPTION_FAILURE,
  FETCH_FAQCATS_REQUEST, FETCH_FAQCATS_SUCCESS, FETCH_FAQCATS_FAILURE,
  FETCH_TEAM_REQUEST, FETCH_TEAM_SUCCESS, FETCH_TEAM_FAILURE
} from '../type';
import {
  initOrganization, initSendContactMessage, initSendSubscription, initFetchFAQCats, initFetchTeam
} from '../state';

const organizationReducer = (state = initOrganization, action) => {
  switch (action.type) {
    case FETCH_ORGANIZATION_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_ORGANIZATION_SUCCESS:
      return {
        loading: false,
        organization: action.payload,
        error: null
      }
    case FETCH_ORGANIZATION_FAILURE:
      return {
        loading: false,
        organization: {},
        error: action.payload
      }
    default:
      return state
  }
}

const sendContactMessageReducer = (state = initSendContactMessage, action) => {
  switch (action.type) {
    case SEND_CONTACT_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SEND_CONTACT_MESSAGE_SUCCESS:
      return {
        loading: false,
        sendContactMessage: action.payload,
        error: null
      }
    case SEND_CONTACT_MESSAGE_FAILURE:
      return {
        loading: false,
        sendContactMessage: {},
        error: action.payload
      }
    default:
      return state
  }
}

const sendSubscriptionReducer = (state = initSendSubscription, action) => {
  switch (action.type) {
    case SEND_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SEND_SUBSCRIPTION_SUCCESS:
      return {
        loading: false,
        sendSubscription: action.payload,
        error: null
      }
    case SEND_SUBSCRIPTION_FAILURE:
      return {
        loading: false,
        sendSubscription: {},
        error: action.payload
      }
    default:
      return state
  }
}

const fetchFAQCatsReducer = (state = initFetchFAQCats, action) => {
  switch (action.type) {
    case FETCH_FAQCATS_REQUEST:
      return { ...state, loading: true }
    case FETCH_FAQCATS_SUCCESS:
      return {
        loading: false,
        fetchFAQCats: action.payload,
        error: null
      }
    case FETCH_FAQCATS_FAILURE:
      return {
        loading: false,
        fetchFAQCats: [],
        error: action.payload
      }
    default:
      return state
  }
}

const fetchTeamReducer = (state = initFetchTeam, action) => {
  switch (action.type) {
    case FETCH_TEAM_REQUEST:
      return {
        ...state, loading: true
      }
    case FETCH_TEAM_SUCCESS:
      return {
        loading: false,
        fetchTeam: action.payload,
        error: null
      }
    case FETCH_TEAM_FAILURE:
      return {
        loading: false,
        fetchTeam: [],
        error: action.payload
      }
    default:
      return state
  }
}

export {
  organizationReducer, sendContactMessageReducer, sendSubscriptionReducer, fetchFAQCatsReducer,
  fetchTeamReducer
}

