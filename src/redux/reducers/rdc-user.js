
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
import {
  initUsers, initMyProfile, initOtherProfile, initCreateUsers, initLoginProfile, initUpdateProfile, 
  initUpdateLogins, initDeleteUser, initEnrollStaff
} from '../states';

const usersReducer = (state = initUsers, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: null
      }
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload
      }
    default:
      return state
  }
}

const myProfileReducer = (state = initMyProfile, action) => {
  switch (action.type) {
    case FETCH_MY_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_MY_PROFILE_SUCCESS:
      return {
        loading: false,
        myProfile: action.payload,
        error: null
      }
    case FETCH_MY_PROFILE_FAILURE:
      return {
        loading: false,
        myProfile: {},
        error: action.payload
      }
    default:
      return state
  }
}

const otherProfileReducer = (state = initOtherProfile, action) => {
  switch (action.type) {
    case FETCH_OTHER_ROFILE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_OTHER_ROFILE_SUCCESS:
      return {
        loading: false,
        otherProfile: action.payload,
        error: null
      }
    case FETCH_OTHER_ROFILE_FAILURE:
      return {
        loading: false,
        otherProfile: {},
        error: action.payload
      }
    default:
      return state
  }
}

const createUsersReducer = (state = initCreateUsers, action) => {
  switch (action.type) {
    case CREATE_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_USERS_SUCCESS:
      return {
        loading: false,
        createUsers: action.payload,
        error: null
      }
    case CREATE_USERS_FAILURE:
      return {
        loading: false,
        createUsers: {},
        error: action.payload
      }
    default:
      return state
  }
}

const updateLoginsReducer = (state = initUpdateLogins, action) => {
  switch (action.type) {
    case UPDATE_LOGINS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_LOGINS_SUCCESS:
      return {
        loading: false,
        updateLogins: action.payload,
        error: null
      }
    case UPDATE_LOGINS_FAILURE:
      return {
        loading: false,
        updateLogins: {},
        error: action.payload
      }
    default:
      return state
  }
}

const updateProfileReducer = (state = initUpdateProfile, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        updateProfile: action.payload,
        error: null
      }
    case UPDATE_PROFILE_FAILURE:
      return {
        loading: false,
        updateProfile: {},
        error: action.payload
      }
    default:
      return state
  }
}

const deleteUserReducer = (state = initDeleteUser, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_USER_SUCCESS:
      return {
        loading: false,
        deleteUser: action.payload,
        error: null
      }
    case DELETE_USER_FAILURE:
      return {
        loading: false,
        deleteUser: {},
        error: action.payload
      }
    default:
      return state
  }
}

const loginReducer = (state = initLoginProfile, action) => {
  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_LOGIN_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null
      }
    case FETCH_LOGIN_FAILURE:
      return {
        loading: false,
        data: {},
        error: action.payload
      }
    default:
      return state
  }
}

const enrollStaffReducer = (state = initEnrollStaff, action) => {
  switch (action.type) {
    case ENROLL_STAFF_REQUEST:
      return {
        ...state, loading: true
      }
    case ENROLL_STAFF_SUCCESS:
      return {
        loading: false,
        enrollStaff: action.payload,
        error: null
      }
    case ENROLL_STAFF_FAILURE:
      return {
        loading: false,
        enrollStaff: {},
        error: action.payload
      }
    default:
      return state
  }
}

export {
  usersReducer, myProfileReducer, otherProfileReducer, createUsersReducer, updateLoginsReducer,
  updateProfileReducer, loginReducer, deleteUserReducer, enrollStaffReducer
}