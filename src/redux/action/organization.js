
import axios from 'axios';
import {
  FETCH_ORGANIZATION_REQUEST, FETCH_ORGANIZATION_SUCCESS, FETCH_ORGANIZATION_FAILURE,
  SEND_CONTACT_MESSAGE_REQUEST, SEND_CONTACT_MESSAGE_SUCCESS, SEND_CONTACT_MESSAGE_FAILURE,
  SEND_SUBSCRIPTION_REQUEST, SEND_SUBSCRIPTION_SUCCESS, SEND_SUBSCRIPTION_FAILURE,
  FETCH_FAQCATS_REQUEST, FETCH_FAQCATS_SUCCESS, FETCH_FAQCATS_FAILURE,
  FETCH_TEAM_REQUEST, FETCH_TEAM_SUCCESS, FETCH_TEAM_FAILURE
} from '../type';
import CFG from '../../config.json';

const fetchOrganizationRequest = () => {
  return {
    type: FETCH_ORGANIZATION_REQUEST,
  }
}

const fetchOrganizationSuccess = organization => {
  return {
    type: FETCH_ORGANIZATION_SUCCESS,
    payload: organization
  }
}

const fetchOrganizationFailure = error => {
  return {
    type: FETCH_ORGANIZATION_FAILURE,
    payload: error
  }
}

const fetchOrganization = parameter => {
  return dispatch => {
    dispatch(fetchOrganizationRequest());
    axios
      .get(`${window.baseURL}/organization/module/view_one-module?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchOrganizationSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchOrganizationFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchOrganizationFailure(error)));
  }
}


const sendContactMessageRequest = () => {
  return {
    type: SEND_CONTACT_MESSAGE_REQUEST,
  }
}

const sendContactMessageSuccess = contactMsg => {
  return {
    type: SEND_CONTACT_MESSAGE_SUCCESS,
    payload: contactMsg
  }
}

const sendContactMessageFailure = error => {
  return {
    type: SEND_CONTACT_MESSAGE_FAILURE,
    payload: error
  }
}

const sendContactMessage = formData => {
  return dispatch => {
    dispatch(sendContactMessageRequest());
    axios
      .post(`${window.baseURL}/media/message/send-message`, formData)
      .then(rs => {
        if (rs.data.data)  dispatch(sendContactMessageSuccess(rs.data.data));
        if (rs.data.error) dispatch(sendContactMessageFailure(rs.data.error));
      })
      .catch(error => dispatch(sendContactMessageFailure(error)));
  }
}


const sendSubscriptionRequest = () => {
  return {
    type: SEND_SUBSCRIPTION_REQUEST,
  }
}

const sendSubscriptionSuccess = subscription => {
  return {
    type: SEND_SUBSCRIPTION_SUCCESS,
    payload: subscription
  }
}

const sendSubscriptionFailure = error => {
  return {
    type: SEND_SUBSCRIPTION_FAILURE,
    payload: error
  }
}

const sendSubscription = subscriptionData => {
  return dispatch => {
    dispatch(sendSubscriptionRequest());
    axios
      .post(`${window.baseURL}/media/subscription/request-subscription`, subscriptionData)
      .then(rs => {
        if (rs.data.data)  dispatch(sendSubscriptionSuccess(rs.data.data));
        if (rs.data.error) dispatch(sendSubscriptionFailure(rs.data.error));
      })
      .catch(error => dispatch(sendSubscriptionFailure(error)));
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
      .get(`${window.baseURL}/media/faq_category/view_all-faq_category?parameter=${CFG.serialCode}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchFAQCatsSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchFAQCatsFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchFAQCatsFailure(error)));
  }
}


const fetchTeamRequest = () => {
  return {
    type: FETCH_TEAM_REQUEST,
  }
}

const fetchTeamSuccess = team => {
  return {
    type: FETCH_TEAM_SUCCESS,
    payload: team
  }
}

const fetchTeamFailure = error => {
  return {
    type: FETCH_TEAM_FAILURE,
    payload: error
  }
}

const fetchTeam = () => {
  return dispatch => {
    dispatch(fetchTeamRequest());
    axios
      .get(`${window.baseURL}/organization/employment_profile/view_all-employment_profile?parameter=${CFG.serialCode}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchTeamSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchTeamFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchTeamFailure(error)));
  }
}

export {
  fetchOrganization, sendContactMessage, sendSubscription, fetchFAQCats, fetchTeam
}