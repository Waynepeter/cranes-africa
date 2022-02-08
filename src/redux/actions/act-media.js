
import axios from 'axios';
import { serverBaseURL } from '../util';
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

const fetchSubscriptionsRequest = () => {
  return {
    type: FETCH_SUBSCRIPTIONS_REQUEST,
  }
}

const fetchSubscriptionsSuccess = subscriptions => {
  return {
    type: FETCH_SUBSCRIPTIONS_SUCCESS,
    payload: subscriptions
  }
}

const fetchSubscriptionsFailure = error => {
  return {
    type: FETCH_SUBSCRIPTIONS_FAILURE,
    payload: error
  }
}

const fetchSubscriptions = () => {
  return dispatch => {
    dispatch(fetchSubscriptionsRequest());
    axios
      .get(`${serverBaseURL()}/media/subscription/view_all-subscription`, { withCredentials: true })
      .then(rs => {
        if (rs.data.data)  dispatch(fetchSubscriptionsSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchSubscriptionsFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(fetchSubscriptionsFailure(error));
      });
  }
}


const fetchSubscriptionRequest = () => {
  return {
    type: FETCH_SUBSCRIPTION_REQUEST,
  }
}

const fetchSubscriptionSuccess = subscription => {
  return {
    type: FETCH_SUBSCRIPTION_SUCCESS,
    payload: subscription
  }
}

const fetchSubscriptionFailure = error => {
  return {
    type: FETCH_SUBSCRIPTION_FAILURE,
    payload: error
  }
}

const fetchSubscription = parameter => {
  return dispatch => {
    dispatch(fetchSubscriptionRequest());
    axios
      .get(`${serverBaseURL()}/media/subscription/view_one-subscription?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchSubscriptionSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchSubscriptionFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(fetchSubscriptionFailure(error));
      });
  }
}


const deleteSubscriptionsRequest = () => {
  return {
    type: DELETE_SUBSCRIPTION_REQUEST,
  }
}

const deleteSubscriptionsSuccess = subscription => {
  return {
    type: DELETE_SUBSCRIPTION_SUCCESS,
    payload: subscription
  }
}

const deleteSubscriptionsFailure = error => {
  return {
    type: DELETE_SUBSCRIPTION_FAILURE,
    payload: error
  }
}

const deleteSubscriptions = subscriptions => {
  return dispatch => {
    dispatch(deleteSubscriptionsRequest());
    axios
      .post(`${serverBaseURL()}/media/subscription/delete-subscription`, subscriptions)
      .then(rs => {
        if (rs.data.data)  dispatch(deleteSubscriptionsSuccess(rs.data.data));
        if (rs.data.error) dispatch(deleteSubscriptionsFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(deleteSubscriptionsFailure(error));
      });
  }
}


const createFAQRequest = () => {
  return {
    type: CREATE_FAQ_REQUEST,
  }
}

const createFAQSuccess = faq => {
  return {
    type: CREATE_FAQ_SUCCESS,
    payload: faq
  }
}

const createFAQFailure = error => {
  return {
    type: CREATE_FAQ_FAILURE,
    payload: error
  }
}

const createFAQ = faq => {
  return dispatch => {
    dispatch(createFAQRequest());
    axios
      .post(`${serverBaseURL()}/media/faq/create-faq`, faq)
      .then(rs => {
        if (rs.data.data)  dispatch(createFAQSuccess(rs.data.data));
        if (rs.data.error) dispatch(createFAQFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(createFAQFailure(error));
      });
  }
}


const updateFAQRequest = () => {
  return {
    type: UPDATE_FAQ_REQUEST,
  }
}

const updateFAQSuccess = faq => {
  return {
    type: UPDATE_FAQ_SUCCESS,
    payload: faq
  }
}

const updateFAQFailure = error => {
  return {
    type: UPDATE_FAQ_FAILURE,
    payload: error
  }
}

const updateFAQ = faq => {
  return dispatch => {
    dispatch(updateFAQRequest());
    axios
      .post(`${serverBaseURL()}/media/faq/update-faq`, faq)
      .then(rs => {
        if (rs.data.data)  dispatch(updateFAQSuccess(rs.data.data));
        if (rs.data.error) dispatch(updateFAQFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(updateFAQFailure(error));
      });
  }
}


const deleteFAQsRequest = () => {
  return {
    type: DELETE_FAQS_REQUEST,
  }
}

const deleteFAQsSuccess = faqs => {
  return {
    type: DELETE_FAQS_SUCCESS,
    payload: faqs
  }
}

const deleteFAQsFailure = error => {
  return {
    type: DELETE_FAQS_FAILURE,
    payload: error
  }
}

const deleteFAQs = faqs => {
  return dispatch => {
    dispatch(deleteFAQsRequest());
    axios
      .post(`${serverBaseURL()}/media/faq/delete-faq`, faqs)
      .then(rs => {
        if (rs.data.data)  dispatch(deleteFAQsSuccess(rs.data.data));
        if (rs.data.error) dispatch(deleteFAQsFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(deleteFAQsFailure(error));
      });
  }
}


const fetchFAQRequest = () => {
  return {
    type: FETCH_FAQ_REQUEST,
  }
}

const fetchFAQSuccess = faq => {
  return {
    type: FETCH_FAQ_SUCCESS,
    payload: faq
  }
}

const fetchFAQFailure = error => {
  return {
    type: FETCH_FAQ_FAILURE,
    payload: error
  }
}

const fetchFAQ = parameter => {
  return dispatch => {
    dispatch(fetchFAQRequest());
    axios
      .get(`${serverBaseURL()}/media/faq/view_one-faq?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchFAQSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchFAQFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(fetchFAQFailure(error));
      });
  }
}


const fetchFAQsRequest = () => {
  return {
    type: FETCH_FAQS_REQUEST,
  }
}

const fetchFAQsSuccess = faqs => {
  return {
    type: FETCH_FAQS_SUCCESS,
    payload: faqs
  }
}

const fetchFAQsFailure = error => {
  return {
    type: FETCH_FAQS_FAILURE,
    payload: error
  }
}

const fetchFAQs = () => {
  return dispatch => {
    dispatch(fetchFAQsRequest());
    axios
      .get(`${serverBaseURL()}/media/faq/view_all-faq`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchFAQsSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchFAQsFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(fetchFAQsFailure(error));
      });
  }
}


const createFAQCatRequest = () => {
  return {
    type: CREATE_FAQCAT_REQUEST,
  }
}

const createFAQCatSuccess = faqcat => {
  return {
    type: CREATE_FAQCAT_SUCCESS,
    payload: faqcat
  }
}

const createFAQCatFailure = error => {
  return {
    type: CREATE_FAQCAT_FAILURE,
    payload: error
  }
}

const createFAQCat = faqcat => {
  return dispatch => {
    dispatch(createFAQCatRequest());
    axios
      .post(`${serverBaseURL()}/media/faq_category/create-faq_category`, faqcat)
      .then(rs => {
        if (rs.data.data)  dispatch(createFAQCatSuccess(rs.data.data));
        if (rs.data.error) dispatch(createFAQCatFailure(rs.data.error));
      })
      .catch(error => dispatch(createFAQCatFailure(error)));
  }
}


const updateFAQCatRequest = () => {
  return {
    type: UPDATE_FAQCAT_REQUEST,
  }
}

const updateFAQCatSuccess = faqcat => {
  return {
    type: UPDATE_FAQCAT_SUCCESS,
    payload: faqcat
  }
}

const updateFAQCatFailure = error => {
  return {
    type: UPDATE_FAQCAT_FAILURE,
    payload: error
  }
}

const updateFAQCat = faqcat => {
  return dispatch => {
    dispatch(updateFAQCatRequest());
    axios
      .post(`${serverBaseURL()}/media/faq_category/update-faq_category`, faqcat)
      .then(rs => {
        if (rs.data.data)  dispatch(updateFAQCatSuccess(rs.data.data));
        if (rs.data.error) dispatch(updateFAQCatFailure(rs.data.error));
      })
      .catch(error => dispatch(updateFAQCatFailure(error)));
  }
}


const deleteFAQCatsRequest = () => {
  return {
    type: DELETE_FAQCATS_REQUEST,
  }
}

const deleteFAQCatsSuccess = faqcats => {
  return {
    type: DELETE_FAQCATS_SUCCESS,
    payload: faqcats
  }
}

const deleteFAQCatsFailure = error => {
  return {
    type: DELETE_FAQCATS_FAILURE,
    payload: error
  }
}

const deleteFAQCats = faqcats => {
  return dispatch => {
    dispatch(deleteFAQCatsRequest());
    axios
      .post(`${serverBaseURL()}/media/faq_category/delete-faq_category`, faqcats)
      .then(rs => {
        if (rs.data.data)  dispatch(deleteFAQCatsSuccess(rs.data.data));
        if (rs.data.error) dispatch(deleteFAQCatsFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(deleteFAQCatsFailure(error));
      });
  }
}


const fetchFAQCatRequest = () => {
  return {
    type: FETCH_FAQCAT_REQUEST,
  }
}

const fetchFAQCatSuccess = faqcat => {
  return {
    type: FETCH_FAQCAT_SUCCESS,
    payload: faqcat
  }
}

const fetchFAQCatFailure = error => {
  return {
    type: FETCH_FAQCAT_FAILURE,
    payload: error
  }
}

const fetchFAQCat = parameter => {
  return dispatch => {
    dispatch(fetchFAQCatRequest());
    axios
      .get(`${serverBaseURL()}/media/faq_category/view_one-faq_category?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchFAQCatSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchFAQCatFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(fetchFAQCatFailure(error));
      });
  }
}


const fetchFAQCatsRequest = () => {
  return {
    type: FETCH_FAQCATS_REQUEST,
  }
}

const fetchFAQCatsSuccess = faqs => {
  return {
    type: FETCH_FAQCATS_SUCCESS,
    payload: faqs
  }
}

const fetchFAQCatsFailure = error => {
  return {
    type: FETCH_FAQCATS_FAILURE,
    payload: error
  }
}

const fetchFAQCats = () => {
  return dispatch => {
    dispatch(fetchFAQCatsRequest());
    axios
      .get(`${serverBaseURL()}/media/faq_category/view_all-faq_category`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchFAQCatsSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchFAQCatsFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(fetchFAQCatsFailure(error));
      });
  }
}

export {
  fetchSubscriptions, fetchSubscription, deleteSubscriptions,
  createFAQ, updateFAQ, deleteFAQs, fetchFAQ, fetchFAQs,
  createFAQCat, updateFAQCat, deleteFAQCats, fetchFAQCat, fetchFAQCats
}