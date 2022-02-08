
import {
  FETCH_SUBSCRIPTIONS_REQUEST, FETCH_SUBSCRIPTIONS_SUCCESS, FETCH_SUBSCRIPTIONS_FAILURE,
  FETCH_SUBSCRIPTION_REQUEST, FETCH_SUBSCRIPTION_SUCCESS, FETCH_SUBSCRIPTION_FAILURE,
  DELETE_SUBSCRIPTION_REQUEST, DELETE_SUBSCRIPTION_SUCCESS, DELETE_SUBSCRIPTION_FAILURE,
  CREATE_FAQ_REQUEST, CREATE_FAQ_SUCCESS, CREATE_FAQ_FAILURE, 
  UPDATE_FAQ_REQUEST, UPDATE_FAQ_SUCCESS, UPDATE_FAQ_FAILURE, 
  DELETE_FAQS_REQUEST, DELETE_FAQS_SUCCESS, DELETE_FAQS_FAILURE,
  FETCH_FAQ_REQUEST, FETCH_FAQ_SUCCESS, FETCH_FAQ_FAILURE, 
  FETCH_FAQS_REQUEST, FETCH_FAQS_SUCCESS, FETCH_FAQS_FAILURE,
  CREATE_FAQCAT_REQUEST, CREATE_FAQCAT_SUCCESS, CREATE_FAQCAT_FAILURE, 
  UPDATE_FAQCAT_REQUEST, UPDATE_FAQCAT_SUCCESS, UPDATE_FAQCAT_FAILURE, 
  DELETE_FAQCATS_REQUEST, DELETE_FAQCATS_SUCCESS, DELETE_FAQCATS_FAILURE, 
  FETCH_FAQCAT_REQUEST, FETCH_FAQCAT_SUCCESS, FETCH_FAQCAT_FAILURE, 
  FETCH_FAQCATS_REQUEST, FETCH_FAQCATS_SUCCESS, FETCH_FAQCATS_FAILURE
} from '../types';
import {
  initFetchSubscriptions, initFetchSubscription, initDeleteSubscriptions,
  initCreateFAQ, initUpdateFAQ, initDeleteFAQs, initFetchFAQ, initFetchFAQs,
  initCreateFAQCat, initUpdateFAQCat, initDeleteFAQCats, initFetchFAQCat, initFetchFAQCats
} from '../states';

const subscriptionsFetchReducer = (state = initFetchSubscriptions, action) => {
  switch (action.type) {
    case FETCH_SUBSCRIPTIONS_REQUEST: 
      return { ...state, loading: true }
    case FETCH_SUBSCRIPTIONS_SUCCESS:
      return {
        loading: false,
        fetchSubscriptions: action.payload,
        error: null
      }
    case FETCH_SUBSCRIPTIONS_FAILURE:
      return {
        loading: false,
        fetchSubscriptions: [],
        error: action.payload
      }
    default:
      return state
  }
}

const subscriptionFetchReducer = (state = initFetchSubscription, action) => {
  switch (action.type) {
    case FETCH_SUBSCRIPTION_REQUEST: 
      return {
        ...state, loading: true
      }
    case FETCH_SUBSCRIPTION_SUCCESS:
      return {
        loading: false,
        fetchSubscription: action.payload,
        error: null
      }
    case FETCH_SUBSCRIPTION_FAILURE:
      return {
        loading: false,
        fetchSubscription: {},
        error: action.payload
      }
    default:
      return state
  }
}

const subscriptionsDeleteReducer = (state = initDeleteSubscriptions, action) => {
  switch (action.type) {
    case DELETE_SUBSCRIPTION_REQUEST: 
      return {
        ...state, loading: true
      }
    case DELETE_SUBSCRIPTION_SUCCESS:
      return {
        loading: false,
        deleteSubscriptions: action.payload,
        error: null
      }
    case DELETE_SUBSCRIPTION_FAILURE:
      return {
        loading: false,
        deleteSubscriptions: {},
        error: action.payload
      }
    default:
      return state
  }
}

const createFAQReducer = (state = initCreateFAQ, action) => {
  switch (action.type) {
    case CREATE_FAQ_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_FAQ_SUCCESS:
      return {
        loading: false,
        createFAQ: action.payload,
        error: null
      }
    case CREATE_FAQ_FAILURE:
      return {
        loading: false,
        createFAQ: {},
        error: action.payload
      }
    default:
      return state
  }
}

const updateFAQReducer = (state = initUpdateFAQ, action) => {
  switch (action.type) {
    case UPDATE_FAQ_REQUEST: 
      return {
        ...state, loading: true
      }
    case UPDATE_FAQ_SUCCESS:
      return {
        loading: false,
        updateFAQ: action.payload,
        error: null
      }
    case UPDATE_FAQ_FAILURE:
      return {
        loading: false,
        updateFAQ: {},
        error: action.payload
      }
    default:
      return state
  }
}

const deleteFAQsReducer = (state = initDeleteFAQs, action) => {
  switch (action.type) {
    case DELETE_FAQS_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case DELETE_FAQS_SUCCESS:
      return {
        loading: false,
        deleteFAQs: action.payload,
        error: null
      }
    case DELETE_FAQS_FAILURE:
      return {
        loading: false,
        deleteFAQs: [],
        error: action.payload
      }
    default:
      return state
  }
}

const fetchFAQReducer = (state = initFetchFAQ, action) => {
  switch (action.type) {
    case FETCH_FAQ_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case FETCH_FAQ_SUCCESS:
      return {
        loading: false,
        fetchFAQ: action.payload,
        error: null
      }
    case FETCH_FAQ_FAILURE:
      return {
        loading: false,
        fetchFAQ: {},
        error: action.payload
      }
    default:
      return state
  }
}

const fetchFAQsReducer = (state = initFetchFAQs, action) => {
  switch (action.type) {
    case FETCH_FAQS_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case FETCH_FAQS_SUCCESS:
      return {
        loading: false,
        fetchFAQs: action.payload,
        error: null
      }
    case FETCH_FAQS_FAILURE:
      return {
        loading: false,
        fetchFAQs: [],
        error: action.payload
      }
    default:
      return state
  }
}

const createFAQCatReducer = (state = initCreateFAQCat, action) => {
  switch (action.type) {
    case CREATE_FAQCAT_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case CREATE_FAQCAT_SUCCESS:
      return {
        loading: false,
        createFAQCat: action.payload,
        error: null
      }
    case CREATE_FAQCAT_FAILURE:
      return {
        loading: false,
        createFAQCat: {},
        error: action.payload
      }
    default:
      return state
  }
}

const updateFAQCatReducer = (state = initUpdateFAQCat, action) => {
  switch (action.type) {
    case UPDATE_FAQCAT_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case UPDATE_FAQCAT_SUCCESS:
      return {
        loading: false,
        updateFAQCat: action.payload,
        error: null
      }
    case UPDATE_FAQCAT_FAILURE:
      return {
        loading: false,
        updateFAQCat: {},
        error: action.payload
      }
    default:
      return state
  }
}

const deleteFAQCatsReducer = (state = initDeleteFAQCats, action) => {
  switch (action.type) {
    case DELETE_FAQCATS_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case DELETE_FAQCATS_SUCCESS:
      return {
        loading: false,
        deleteFAQCats: action.payload,
        error: null
      }
    case DELETE_FAQCATS_FAILURE:
      return {
        loading: false,
        deleteFAQCats: [],
        error: action.payload
      }
    default:
      return state
  }
}

const fetchFAQCatReducer = (state = initFetchFAQCat, action) => {
  switch (action.type) {
    case FETCH_FAQCAT_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case FETCH_FAQCAT_SUCCESS:
      return {
        loading: false,
        fetchFAQCat: action.payload,
        error: null
      }
    case FETCH_FAQCAT_FAILURE:
      return {
        loading: false,
        fetchFAQCat: {},
        error: action.payload
      }
    default:
      return state
  }
}

const fetchFAQCatsReducer = (state = initFetchFAQCats, action) => {
  switch (action.type) {
    case FETCH_FAQCATS_REQUEST: 
      return {
        ...state, loading: true
      }
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

export {
  subscriptionsFetchReducer, subscriptionFetchReducer, subscriptionsDeleteReducer,
  createFAQReducer, updateFAQReducer, deleteFAQsReducer, fetchFAQReducer, fetchFAQsReducer,
  createFAQCatReducer, updateFAQCatReducer, deleteFAQCatsReducer, fetchFAQCatReducer, fetchFAQCatsReducer
}