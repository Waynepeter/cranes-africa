
import axios from 'axios';
import {
  FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
  FETCH_MY_PROFILE_REQUEST, FETCH_MY_PROFILE_SUCCESS, FETCH_MY_PROFILE_FAILURE,
  FETCH_OTHER_ROFILE_REQUEST, FETCH_OTHER_ROFILE_SUCCESS, FETCH_OTHER_ROFILE_FAILURE,
  CREATE_USERS_REQUEST, CREATE_USERS_SUCCESS, CREATE_USERS_FAILURE,
  UPDATE_LOGINS_REQUEST, UPDATE_LOGINS_SUCCESS, UPDATE_LOGINS_FAILURE,
  UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE,
  DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE,
  FETCH_LOGIN_REQUEST, FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FAILURE,
  ENROLL_STAFF_REQUEST, ENROLL_STAFF_SUCCESS, ENROLL_STAFF_FAILURE
} from '../types';
import { serverBaseURL } from '../util';

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  }
}

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}

const fetchUsers = filter => {
  return dispatch => {
    dispatch(fetchUsersRequest());
    axios
      .get(`${serverBaseURL()}/authentication/user/view_all-user?filter=${filter}`, {
        withCredentials: true
      })
      .then(rs => {
        if (rs.data.data)  dispatch(fetchUsersSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchUsersFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(fetchUsersFailure(error));
      });
  }
}

const fetchMyProfileRequest = () => {
  return {
    type: FETCH_MY_PROFILE_REQUEST,
  }
}

const fetchMyProfileSuccess = myProfile => {
  return {
    type: FETCH_MY_PROFILE_SUCCESS,
    payload: myProfile
  }
}

const fetchMyProfileFailure = error => {
  return {
    type: FETCH_MY_PROFILE_FAILURE,
    payload: error
  }
}

const fetchMyProfile = () => {
  return dispatch => {
    dispatch(fetchMyProfileRequest());
    axios
      .get(`${serverBaseURL()}/authentication/user/view-own_user_profile`, {
        withCredentials: true
      })
      .then(rs => {
        if (rs.data.data)  dispatch(fetchMyProfileSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchMyProfileFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(fetchMyProfileFailure(error));
      });
  }
}

const fetchOtherProfileRequest = () => {
  return {
    type: FETCH_OTHER_ROFILE_REQUEST,
  }
}

const fetchOtherProfileSuccess = otherProfile => {
  return {
    type: FETCH_OTHER_ROFILE_SUCCESS,
    payload: otherProfile
  }
}

const fetchOtherProfileFailure = error => {
  return {
    type: FETCH_OTHER_ROFILE_FAILURE,
    payload: error
  }
}

const fetchOtherProfile = parameter => {
  return dispatch => {
    dispatch(fetchOtherProfileRequest());
    axios
      .get(`${serverBaseURL()}/authentication/user/view-other_user_profile?parameter=${parameter}`, {
        withCredentials: true
      })
      .then(rs => {
        if (rs.data.data)  dispatch(fetchOtherProfileSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchOtherProfileFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(fetchOtherProfileFailure(error));
      });
  }
}

const createUsersRequest = () => {
  return {
    type: CREATE_USERS_REQUEST,
  }
}

const createUsersSuccess = users => {
  return {
    type: CREATE_USERS_SUCCESS,
    payload: users
  }
}

const createUsersFailure = error => {
  return {
    type: CREATE_USERS_FAILURE,
    payload: error
  }
}

const createUsers = users => {
  return dispatch => {
    dispatch(createUsersRequest());
    axios
      .post(`${serverBaseURL()}/authentication/user/register-account`, users)
      .then(rs => {
        if (rs.data.data)  dispatch(createUsersSuccess(rs.data.data));
        if (rs.data.error) dispatch(createUsersFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(createUsersFailure(error));
      });
  }
}

const updateLoginsRequest = () => {
  return {
    type: UPDATE_LOGINS_REQUEST,
  }
}

const updateLoginsSuccess = logins => {
  return {
    type: UPDATE_LOGINS_SUCCESS,
    payload: logins
  }
}

const updateLoginsFailure = error => {
  return {
    type: UPDATE_LOGINS_FAILURE,
    payload: error
  }
}

const updateLogins = logins => {
  return dispatch => {
    dispatch(updateLoginsRequest());
    axios
      .post(`${serverBaseURL()}/authentication/user/update-account`, logins)
      .then(rs => {
        if (rs.data.data)  dispatch(updateLoginsSuccess(rs.data.data));
        if (rs.data.error) dispatch(updateLoginsFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(updateLoginsFailure(error));
      });
  }
}

const updateProfileRequest = () => {
  return {
    type: UPDATE_PROFILE_REQUEST,
  }
}

const updateProfileSuccess = profile => {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload: profile
  }
}

const updateProfileFailure = error => {
  return {
    type: UPDATE_PROFILE_FAILURE,
    payload: error
  }
}

const updateProfile = profile => {
  return dispatch => {
    dispatch(updateProfileRequest());
    axios
      .post(`${serverBaseURL()}/authentication/user/update-account`, profile)
      .then(rs => {
        if (rs.data.data)  dispatch(updateProfileSuccess(rs.data.data));
        if (rs.data.error) dispatch(updateProfileFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(updateProfileFailure(error));
      });
  }
}

const deleteUserRequest = () => {
  return {
    type: DELETE_USER_REQUEST,
  }
}

const deleteUserSuccess = user => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: user
  }
}

const deleteUserFailure = error => {
  return {
    type: DELETE_USER_FAILURE,
    payload: error
  }
}

const deleteUser = user => {
  return dispatch => {
    dispatch(deleteUserRequest());
    axios
      .post(`${serverBaseURL()}/authentication/user/delete-account`, user)
      .then(rs => {
        if (rs.data.data)  dispatch(deleteUserSuccess(rs.data.data));
        if (rs.data.error) dispatch(deleteUserFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(deleteUserFailure(error));
      });
  }
}

const loginUserRequest = () => {
  return {
    type: FETCH_LOGIN_REQUEST,
  }
}

const loginUserSuccess = authenticatedUser => {
  return {
    type: FETCH_LOGIN_SUCCESS,
    payload: authenticatedUser
  }
}

const loginUserFailure = error => {
  return {
    type: FETCH_LOGIN_FAILURE,
    payload: error
  }
}

const loginUser = credentials => {
  return dispatch => {
    dispatch(loginUserRequest());
    axios
      .get(`${serverBaseURL()}/authentication/user/log_in-account?parameter=${credentials.parameter}&password=${credentials.password}`, 
        {
          withCredentials: true
        }
      )
      .then(rs => {
        if (rs.data.data)  dispatch(loginUserSuccess(rs.data.data));
        if (rs.data.error) dispatch(loginUserFailure(rs.data.error));
      })
      .catch(error => {
        dispatch(loginUserFailure(error));
      });
  }
}

const enrollStaffRequest = () => {
  return {
    type: ENROLL_STAFF_REQUEST,
  }
}

const enrollStaffSuccess = enrollmentData => {
  return {
    type: ENROLL_STAFF_SUCCESS,
    payload: enrollmentData
  }
}

const enrollStaffFailure = error => {
  return {
    type: ENROLL_STAFF_FAILURE,
    payload: error
  }
}

const enrollStaff = enrollmentData => {
  return dispatch => {
    dispatch(enrollStaffRequest());
    axios
      .post(`${serverBaseURL()}/organization/employment_profile/create-employment_profile`, enrollmentData)
      .then(rs => {
        if (rs.data.data)  dispatch(enrollStaffSuccess(rs.data.data));
        if (rs.data.error) dispatch(enrollStaffFailure(rs.data.error));
      })
      .catch(error => dispatch(enrollStaffFailure(error)));
  }
}

export {
  fetchUsers, fetchMyProfile, fetchOtherProfile, createUsers, updateLogins, updateProfile,
  loginUser, deleteUser, enrollStaff
};