
import axios from 'axios';
import { serverBaseURL } from '../util';
import {
  CREATE_MODULE_REQUEST, CREATE_MODULE_SUCCESS, CREATE_MODULE_FAILURE,
  FETCH_MODULES_REQUEST, FETCH_MODULES_SUCCESS, FETCH_MODULES_FAILURE,
  DELETE_MODULES_REQUEST, DELETE_MODULES_SUCCESS, DELETE_MODULES_FAILURE,
  FETCH_MODULE_REQUEST, FETCH_MODULE_SUCCESS, FETCH_MODULE_FAILURE,
  UPDATE_MODULE_REQUEST, UPDATE_MODULE_SUCCESS, UPDATE_MODULE_FAILURE,
  CREATE_DESIGNATION_REQUEST, CREATE_DESIGNATION_SUCCESS, CREATE_DESIGNATION_FAILURE, 
  UPDATE_DESIGNATION_REQUEST, UPDATE_DESIGNATION_SUCCESS, UPDATE_DESIGNATION_FAILURE, 
  DELETE_DESIGNATIONS_REQUEST, DELETE_DESIGNATIONS_SUCCESS, DELETE_DESIGNATIONS_FAILURE, 
  FETCH_DESIGNATION_REQUEST, FETCH_DESIGNATION_SUCCESS, FETCH_DESIGNATION_FAILURE, 
  FETCH_DESIGNATIONS_REQUEST, FETCH_DESIGNATIONS_SUCCESS, FETCH_DESIGNATIONS_FAILURE,
  CREATE_VALUE_REQUEST, CREATE_VALUE_SUCCESS, CREATE_VALUE_FAILURE, 
  UPDATE_VALUE_REQUEST, UPDATE_VALUE_SUCCESS, UPDATE_VALUE_FAILURE, 
  DELETE_VALUES_REQUEST, DELETE_VALUES_SUCCESS, DELETE_VALUES_FAILURE, 
  FETCH_VALUE_REQUEST, FETCH_VALUE_SUCCESS, FETCH_VALUE_FAILURE, 
  FETCH_VALUES_REQUEST, FETCH_VALUES_SUCCESS, FETCH_VALUES_FAILURE, 
  CREATE_TESTIMONIAL_REQUEST, CREATE_TESTIMONIAL_SUCCESS, CREATE_TESTIMONIAL_FAILURE, 
  UPDATE_TESTIMONIAL_REQUEST, UPDATE_TESTIMONIAL_SUCCESS, UPDATE_TESTIMONIAL_FAILURE, 
  DELETE_TESTIMONIALS_REQUEST, DELETE_TESTIMONIALS_SUCCESS, DELETE_TESTIMONIALS_FAILURE, 
  FETCH_TESTIMONIAL_REQUEST, FETCH_TESTIMONIAL_SUCCESS, FETCH_TESTIMONIAL_FAILURE, 
  FETCH_TESTIMONIALS_REQUEST, FETCH_TESTIMONIALS_SUCCESS, FETCH_TESTIMONIALS_FAILURE, 
  CREATE_PARTNER_REQUEST, CREATE_PARTNER_SUCCESS, CREATE_PARTNER_FAILURE, 
  UPDATE_PARTNER_REQUEST, UPDATE_PARTNER_SUCCESS, UPDATE_PARTNER_FAILURE, 
  DELETE_PARTNERS_REQUEST, DELETE_PARTNERS_SUCCESS, DELETE_PARTNERS_FAILURE, 
  FETCH_PARTNER_REQUEST, FETCH_PARTNER_SUCCESS, FETCH_PARTNER_FAILURE, 
  FETCH_PARTNERS_REQUEST, FETCH_PARTNERS_SUCCESS, FETCH_PARTNERS_FAILURE,
  CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE, 
  UPDATE_PROJECT_REQUEST, UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_FAILURE, 
  DELETE_PROJECTS_REQUEST, DELETE_PROJECTS_SUCCESS, DELETE_PROJECTS_FAILURE, 
  FETCH_PROJECT_REQUEST, FETCH_PROJECT_SUCCESS, FETCH_PROJECT_FAILURE, 
  FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILURE, 
  CREATE_FUNFACT_REQUEST, CREATE_FUNFACT_SUCCESS, CREATE_FUNFACT_FAILURE, 
  UPDATE_FUNFACT_REQUEST, UPDATE_FUNFACT_SUCCESS, UPDATE_FUNFACT_FAILURE, 
  DELETE_FUNFACTS_REQUEST, DELETE_FUNFACTS_SUCCESS, DELETE_FUNFACTS_FAILURE, 
  FETCH_FUNFACT_REQUEST, FETCH_FUNFACT_SUCCESS, FETCH_FUNFACT_FAILURE, 
  FETCH_FUNFACTS_REQUEST, FETCH_FUNFACTS_SUCCESS, FETCH_FUNFACTS_FAILURE
} from '../types';

const createModuleRequest = () => {
  return {
    type: CREATE_MODULE_REQUEST,
  }
}
const createModuleSuccess = moduleData => {
  return {
    type: CREATE_MODULE_SUCCESS,
    payload: moduleData
  }
}
const createModuleFailure = error => {
  return {
    type: CREATE_MODULE_FAILURE,
    payload: error
  }
}
const createModule = moduleData => {
  return dispatch => {
    dispatch(createModuleRequest());
    axios
      .post(`${serverBaseURL()}/organization/module/create-module`, moduleData)
      .then(rs => {
        if (rs.data.data)  dispatch(createModuleSuccess(rs.data.data));
        if (rs.data.error) dispatch(createModuleFailure(rs.data.error));
      })
      .catch(error => dispatch(createModuleFailure(error)));
  }
}

const fetchModulesRequest = () => {
  return {
    type: FETCH_MODULES_REQUEST,
  }
}
const fetchModulesSuccess = modules => {
  return {
    type: FETCH_MODULES_SUCCESS,
    payload: modules
  }
}
const fetchModulesFailure = error => {
  return {
    type: FETCH_MODULES_FAILURE,
    payload: error
  }
}
const fetchModules = () => {
  return dispatch => {
    dispatch(fetchModulesRequest());
    axios
      .get(`${serverBaseURL()}/organization/module/view_all-module`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchModulesSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchModulesFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchModulesFailure(error)));
  }
}

const deleteModulesRequest = () => {
  return {
    type: DELETE_MODULES_REQUEST,
  }
}
const deleteModulesSuccess = modules => {
  return {
    type: DELETE_MODULES_SUCCESS,
    payload: modules
  }
}
const deleteModulesFailure = error => {
  return {
    type: DELETE_MODULES_FAILURE,
    payload: error
  }
}
const deleteModules = modules => {
  return dispatch => {
    dispatch(deleteModulesRequest());
    axios
      .post(`${serverBaseURL()}/organization/module/delete-module`, modules)
      .then(rs => {
        if (rs.data.data)  dispatch(deleteModulesSuccess(rs.data.data));
        if (rs.data.error) dispatch(deleteModulesFailure(rs.data.error));
      })
      .catch(error => dispatch(deleteModulesFailure(error)));
  }
}

const fetchModuleRequest = () => {
  return {
    type: FETCH_MODULE_REQUEST,
  }
}
const fetchModuleSuccess = mdl => {
  return {
    type: FETCH_MODULE_SUCCESS,
    payload: mdl
  }
}
const fetchModuleFailure = error => {
  return {
    type: FETCH_MODULE_FAILURE,
    payload: error
  }
}
const fetchModule = parameter => {
  return dispatch => {
    dispatch(fetchModuleRequest());
    axios
      .get(`${serverBaseURL()}/organization/module/view_one-module?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchModuleSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchModuleFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchModuleFailure(error)));
  }
}

const updateModuleRequest = () => {
  return {
    type: UPDATE_MODULE_REQUEST,
  }
}
const updateModuleSuccess = mdl => {
  return {
    type: UPDATE_MODULE_SUCCESS,
    payload: mdl
  }
}
const updateModuleFailure = error => {
  return {
    type: UPDATE_MODULE_FAILURE,
    payload: error
  }
}
const updateModule = moduleData => {
  return dispatch => {
    dispatch(updateModuleRequest());
    axios
      .post(`${serverBaseURL()}/organization/module/update-module`, moduleData)
      .then(rs => {
        if (rs.data.data)  dispatch(updateModuleSuccess(rs.data.data));
        if (rs.data.error) dispatch(updateModuleFailure(rs.data.error));
      })
      .catch(error => dispatch(updateModuleFailure(error)));
  }
}


const createDesignationRequest = () => {
  return {
    type: CREATE_DESIGNATION_REQUEST,
  }
}
const createDesignationSuccess = designationData => {
  return {
    type: CREATE_DESIGNATION_SUCCESS,
    payload: designationData
  }
}
const createDesignationFailure = error => {
  return {
    type: CREATE_DESIGNATION_FAILURE,
    payload: error
  }
}
const createDesignation = designationData => {
  return dispatch => {
    dispatch(createDesignationRequest());
    axios
      .post(`${serverBaseURL()}/organization/designation/create-designation`, designationData)
      .then(rs => {
        if (rs.data.data)  dispatch(createDesignationSuccess(rs.data.data));
        if (rs.data.error) dispatch(createDesignationFailure(rs.data.error));
      })
      .catch(error => dispatch(createDesignationFailure(error)));
  }
}

const updateDesignationRequest = () => {
  return {
    type: UPDATE_DESIGNATION_REQUEST,
  }
}
const updateDesignationSuccess = designationData => {
  return {
    type: UPDATE_DESIGNATION_SUCCESS,
    payload: designationData
  }
}
const updateDesignationFailure = error => {
  return {
    type: UPDATE_DESIGNATION_FAILURE,
    payload: error
  }
}
const updateDesignation = designationData => {
  return dispatch => {
    dispatch(updateDesignationRequest());
    axios
      .post(`${serverBaseURL()}/organization/designation/update-designation`, designationData)
      .then(rs => {
        if (rs.data.data)  dispatch(updateDesignationSuccess(rs.data.data));
        if (rs.data.error) dispatch(updateDesignationFailure(rs.data.error));
      })
      .catch(error => dispatch(updateDesignationFailure(error)));
  }
}

const deleteDesignationsRequest = () => {
  return {
    type: DELETE_DESIGNATIONS_REQUEST,
  }
}
const deleteDesignationsSuccess = designationData => {
  return {
    type: DELETE_DESIGNATIONS_SUCCESS,
    payload: designationData
  }
}
const deleteDesignationsFailure = error => {
  return {
    type: DELETE_DESIGNATIONS_FAILURE,
    payload: error
  }
}
const deleteDesignations = designationData => {
  return dispatch => {
    dispatch(deleteDesignationsRequest());
    axios
      .post(`${serverBaseURL()}/organization/designation/delete-designation`, designationData)
      .then(rs => {
        if (rs.data.data)  dispatch(deleteDesignationsSuccess(rs.data.data));
        if (rs.data.error) dispatch(deleteDesignationsFailure(rs.data.error));
      })
      .catch(error => dispatch(deleteDesignationsFailure(error)));
  }
}

const fetchDesignationRequest = () => {
  return {
    type: FETCH_DESIGNATION_REQUEST,
  }
}
const fetchDesignationSuccess = designation => {
  return {
    type: FETCH_DESIGNATION_SUCCESS,
    payload: designation
  }
}
const fetchDesignationFailure = error => {
  return {
    type: FETCH_DESIGNATION_FAILURE,
    payload: error
  }
}
const fetchDesignation = parameter => {
  return dispatch => {
    dispatch(fetchDesignationRequest());
    axios
      .get(`${serverBaseURL()}/organization/designation/view_one-designation?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchDesignationSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchDesignationFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchDesignationFailure(error)));
  }
}

const fetchDesignationsRequest = () => {
  return {
    type: FETCH_DESIGNATIONS_REQUEST,
  }
}
const fetchDesignationsSuccess = designations => {
  return {
    type: FETCH_DESIGNATIONS_SUCCESS,
    payload: designations
  }
}
const fetchDesignationsFailure = error => {
  return {
    type: FETCH_DESIGNATIONS_FAILURE,
    payload: error
  }
}
const fetchDesignations = () => {
  return dispatch => {
    dispatch(fetchDesignationsRequest());
    axios
      .get(`${serverBaseURL()}/organization/designation/view_all-designation`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchDesignationsSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchDesignationsFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchDesignationsFailure(error)));
  }
}

const createValueRequest = () => {
  return {
    type: CREATE_VALUE_REQUEST,
  }
}
const createValueSuccess = valueData => {
  return {
    type: CREATE_VALUE_SUCCESS,
    payload: valueData
  }
}
const createValueFailure = error => {
  return {
    type: CREATE_VALUE_FAILURE,
    payload: error
  }
}
const createValue = valueData => {
  return dispatch => {
    dispatch(createValueRequest());
    axios
      .post(`${serverBaseURL()}/organization/value/create-value`, valueData)
      .then(rs => {
        if (rs.data.data)  dispatch(createValueSuccess(rs.data.data));
        if (rs.data.error) dispatch(createValueFailure(rs.data.error));
      })
      .catch(error => dispatch(createValueFailure(error)));
  }
}

const updateValueRequest = () => {
  return {
    type: UPDATE_VALUE_REQUEST,
  }
}
const updateValueSuccess = valueData => {
  return {
    type: UPDATE_VALUE_SUCCESS,
    payload: valueData
  }
}
const updateValueFailure = error => {
  return {
    type: UPDATE_VALUE_FAILURE,
    payload: error
  }
}
const updateValue = valueData => {
  return dispatch => {
    dispatch(updateValueRequest());
    axios
      .post(`${serverBaseURL()}/organization/value/update-value`, valueData)
      .then(rs => {
        if (rs.data.data)  dispatch(updateValueSuccess(rs.data.data));
        if (rs.data.error) dispatch(updateValueFailure(rs.data.error));
      })
      .catch(error => dispatch(updateValueFailure(error)));
  }
}

const deleteValuesRequest = () => {
  return {
    type: DELETE_VALUES_REQUEST,
  }
}
const deleteValuesSuccess = valueData => {
  return {
    type: DELETE_VALUES_SUCCESS,
    payload: valueData
  }
}
const deleteValuesFailure = error => {
  return {
    type: DELETE_VALUES_FAILURE,
    payload: error
  }
}
const deleteValues = valueData => {
  return dispatch => {
    dispatch(deleteValuesRequest());
    axios
      .post(`${serverBaseURL()}/organization/value/delete-value`, valueData)
      .then(rs => {
        if (rs.data.data)  dispatch(deleteValuesSuccess(rs.data.data));
        if (rs.data.error) dispatch(deleteValuesFailure(rs.data.error));
      })
      .catch(error => dispatch(deleteValuesFailure(error)));
  }
}

const fetchValueRequest = () => {
  return {
    type: FETCH_VALUE_REQUEST,
  }
}
const fetchValueSuccess = value => {
  return {
    type: FETCH_VALUE_SUCCESS,
    payload: value
  }
}
const fetchValueFailure = error => {
  return {
    type: FETCH_VALUE_FAILURE,
    payload: error
  }
}
const fetchValue = parameter => {
  return dispatch => {
    dispatch(fetchValueRequest());
    axios
      .get(`${serverBaseURL()}/organization/value/view_one-value?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchValueSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchValueFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchValueFailure(error)));
  }
}

const fetchValuesRequest = () => {
  return {
    type: FETCH_VALUES_REQUEST,
  }
}
const fetchValuesSuccess = values => {
  return {
    type: FETCH_VALUES_SUCCESS,
    payload: values
  }
}
const fetchValuesFailure = error => {
  return {
    type: FETCH_VALUES_FAILURE,
    payload: error
  }
}
const fetchValues = () => {
  return dispatch => {
    dispatch(fetchValuesRequest());
    axios
      .get(`${serverBaseURL()}/organization/value/view_all-value`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchValuesSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchValuesFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchValuesFailure(error)));
  }
}

const createTestimonialRequest = () => {
  return {
    type: CREATE_TESTIMONIAL_REQUEST,
  }
}
const createTestimonialSuccess = testimonialData => {
  return {
    type: CREATE_TESTIMONIAL_SUCCESS,
    payload: testimonialData
  }
}
const createTestimonialFailure = error => {
  return {
    type: CREATE_TESTIMONIAL_FAILURE,
    payload: error
  }
}
const createTestimonial = testimonialData => {
  return dispatch => {
    dispatch(createTestimonialRequest());
    axios
      .post(`${serverBaseURL()}/organization/testimonial/create-testimonial`, testimonialData)
      .then(rs => {
        if (rs.data.data)  dispatch(createTestimonialSuccess(rs.data.data));
        if (rs.data.error) dispatch(createTestimonialFailure(rs.data.error));
      })
      .catch(error => dispatch(createTestimonialFailure(error)));
  }
}

const updateTestimonialRequest = () => {
  return {
    type: UPDATE_TESTIMONIAL_REQUEST,
  }
}
const updateTestimonialSuccess = testimonialData => {
  return {
    type: UPDATE_TESTIMONIAL_SUCCESS,
    payload: testimonialData
  }
}
const updateTestimonialFailure = error => {
  return {
    type: UPDATE_TESTIMONIAL_FAILURE,
    payload: error
  }
}
const updateTestimonial = testimonialData => {
  return dispatch => {
    dispatch(updateTestimonialRequest());
    axios
      .post(`${serverBaseURL()}/organization/testimonial/update-testimonial`, testimonialData)
      .then(rs => {
        if (rs.data.data)  dispatch(updateTestimonialSuccess(rs.data.data));
        if (rs.data.error) dispatch(updateTestimonialFailure(rs.data.error));
      })
      .catch(error => dispatch(updateTestimonialFailure(error)));
  }
}

const deleteTestimonialsRequest = () => {
  return {
    type: DELETE_TESTIMONIALS_REQUEST,
  }
}
const deleteTestimonialsSuccess = testimonialData => {
  return {
    type: DELETE_TESTIMONIALS_SUCCESS,
    payload: testimonialData
  }
}
const deleteTestimonialsFailure = error => {
  return {
    type: DELETE_TESTIMONIALS_FAILURE,
    payload: error
  }
}
const deleteTestimonials = testimonialData => {
  return dispatch => {
    dispatch(deleteTestimonialsRequest());
    axios
      .post(`${serverBaseURL()}/organization/testimonial/delete-testimonial`, testimonialData)
      .then(rs => {
        if (rs.data.data)  dispatch(deleteTestimonialsSuccess(rs.data.data));
        if (rs.data.error) dispatch(deleteTestimonialsFailure(rs.data.error));
      })
      .catch(error => dispatch(deleteTestimonialsFailure(error)));
  }
}

const fetchTestimonialRequest = () => {
  return {
    type: FETCH_TESTIMONIAL_REQUEST,
  }
}
const fetchTestimonialSuccess = testimonial => {
  return {
    type: FETCH_TESTIMONIAL_SUCCESS,
    payload: testimonial
  }
}
const fetchTestimonialFailure = error => {
  return {
    type: FETCH_TESTIMONIAL_FAILURE,
    payload: error
  }
}
const fetchTestimonial = parameter => {
  return dispatch => {
    dispatch(fetchTestimonialRequest());
    axios
      .get(`${serverBaseURL()}/organization/testimonial/view_one-testimonial?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchTestimonialSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchTestimonialFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchTestimonialFailure(error)));
  }
}

const fetchTestimonialsRequest = () => {
  return {
    type: FETCH_TESTIMONIALS_REQUEST,
  }
}
const fetchTestimonialsSuccess = testimonials => {
  return {
    type: FETCH_TESTIMONIALS_SUCCESS,
    payload: testimonials
  }
}
const fetchTestimonialsFailure = error => {
  return {
    type: FETCH_TESTIMONIALS_FAILURE,
    payload: error
  }
}
const fetchTestimonials = () => {
  return dispatch => {
    dispatch(fetchTestimonialsRequest());
    axios
      .get(`${serverBaseURL()}/organization/testimonial/view_all-testimonial`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchTestimonialsSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchTestimonialsFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchTestimonialsFailure(error)));
  }
}

const createPartnerRequest = () => {
  return {
    type: CREATE_PARTNER_REQUEST,
  }
}
const createPartnerSuccess = partnerData => {
  return {
    type: CREATE_PARTNER_SUCCESS,
    payload: partnerData
  }
}
const createPartnerFailure = error => {
  return {
    type: CREATE_PARTNER_FAILURE,
    payload: error
  }
}
const createPartner = partnerData => {
  return dispatch => {
    dispatch(createPartnerRequest());
    axios
      .post(`${serverBaseURL()}/organization/partner/create-partner`, partnerData)
      .then(rs => {
        if (rs.data.data)  dispatch(createPartnerSuccess(rs.data.data));
        if (rs.data.error) dispatch(createPartnerFailure(rs.data.error));
      })
      .catch(error => dispatch(createPartnerFailure(error)));
  }
}

const updatePartnerRequest = () => {
  return {
    type: UPDATE_PARTNER_REQUEST,
  }
}
const updatePartnerSuccess = partnerData => {
  return {
    type: UPDATE_PARTNER_SUCCESS,
    payload: partnerData
  }
}
const updatePartnerFailure = error => {
  return {
    type: UPDATE_PARTNER_FAILURE,
    payload: error
  }
}
const updatePartner = partnerData => {
  return dispatch => {
    dispatch(updatePartnerRequest());
    axios
      .post(`${serverBaseURL()}/organization/partner/update-partner`, partnerData)
      .then(rs => {
        if (rs.data.data)  dispatch(updatePartnerSuccess(rs.data.data));
        if (rs.data.error) dispatch(updatePartnerFailure(rs.data.error));
      })
      .catch(error => dispatch(updatePartnerFailure(error)));
  }
}

const deletePartnersRequest = () => {
  return {
    type: DELETE_PARTNERS_REQUEST,
  }
}
const deletePartnersSuccess = partnerData => {
  return {
    type: DELETE_PARTNERS_SUCCESS,
    payload: partnerData
  }
}
const deletePartnersFailure = error => {
  return {
    type: DELETE_PARTNERS_FAILURE,
    payload: error
  }
}
const deletePartners = partnerData => {
  return dispatch => {
    dispatch(deletePartnersRequest());
    axios
      .post(`${serverBaseURL()}/organization/partner/delete-partner`, partnerData)
      .then(rs => {
        if (rs.data.data)  dispatch(deletePartnersSuccess(rs.data.data));
        if (rs.data.error) dispatch(deletePartnersFailure(rs.data.error));
      })
      .catch(error => dispatch(deletePartnersFailure(error)));
  }
}

const fetchPartnerRequest = () => {
  return {
    type: FETCH_PARTNER_REQUEST,
  }
}
const fetchPartnerSuccess = partner => {
  return {
    type: FETCH_PARTNER_SUCCESS,
    payload: partner
  }
}
const fetchPartnerFailure = error => {
  return {
    type: FETCH_PARTNER_FAILURE,
    payload: error
  }
}
const fetchPartner = parameter => {
  return dispatch => {
    dispatch(fetchPartnerRequest());
    axios
      .get(`${serverBaseURL()}/organization/partner/view_one-partner?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchPartnerSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchPartnerFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchPartnerFailure(error)));
  }
}

const fetchPartnersRequest = () => {
  return {
    type: FETCH_PARTNERS_REQUEST,
  }
}
const fetchPartnersSuccess = partners => {
  return {
    type: FETCH_PARTNERS_SUCCESS,
    payload: partners
  }
}
const fetchPartnersFailure = error => {
  return {
    type: FETCH_PARTNERS_FAILURE,
    payload: error
  }
}
const fetchPartners = () => {
  return dispatch => {
    dispatch(fetchPartnersRequest());
    axios
      .get(`${serverBaseURL()}/organization/partner/view_all-partner`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchPartnersSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchPartnersFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchPartnersFailure(error)));
  }
}




const createProjectRequest = () => {
  return {
    type: CREATE_PROJECT_REQUEST,
  }
}
const createProjectSuccess = data => {
  return {
    type: CREATE_PROJECT_SUCCESS,
    payload: data
  }
}
const createProjectFailure = error => {
  return {
    type: CREATE_PROJECT_FAILURE,
    payload: error
  }
}
const createProject = data => {
  return dispatch => {
    dispatch(createProjectRequest());
    axios
      .post(`${serverBaseURL()}/organization/project/create-project`, data)
      .then(rs => {
        if (rs.data.data)  dispatch(createProjectSuccess(rs.data.data));
        if (rs.data.error) dispatch(createProjectFailure(rs.data.error));
      })
      .catch(error => dispatch(createProjectFailure(error)));
  }
}

const updateProjectRequest = () => {
  return {
    type: UPDATE_PROJECT_REQUEST,
  }
}
const updateProjectSuccess = data => {
  return {
    type: UPDATE_PROJECT_SUCCESS,
    payload: data
  }
}
const updateProjectFailure = error => {
  return {
    type: UPDATE_PROJECT_FAILURE,
    payload: error
  }
}
const updateProject = data => {
  return dispatch => {
    dispatch(updateProjectRequest());
    axios
      .post(`${serverBaseURL()}/organization/project/update-project`, data)
      .then(rs => {
        if (rs.data.data)  dispatch(updateProjectSuccess(rs.data.data));
        if (rs.data.error) dispatch(updateProjectFailure(rs.data.error));
      })
      .catch(error => dispatch(updateProjectFailure(error)));
  }
}

const deleteProjectsRequest = () => {
  return {
    type: DELETE_PROJECTS_REQUEST,
  }
}
const deleteProjectsSuccess = data => {
  return {
    type: DELETE_PROJECTS_SUCCESS,
    payload: data
  }
}
const deleteProjectsFailure = error => {
  return {
    type: DELETE_PROJECTS_FAILURE,
    payload: error
  }
}
const deleteProjects = data => {
  return dispatch => {
    dispatch(deleteProjectsRequest());
    axios
      .post(`${serverBaseURL()}/organization/project/delete-project`, data)
      .then(rs => {
        if (rs.data.data)  dispatch(deleteProjectsSuccess(rs.data.data));
        if (rs.data.error) dispatch(deleteProjectsFailure(rs.data.error));
      })
      .catch(error => dispatch(deleteProjectsFailure(error)));
  }
}

const fetchProjectRequest = () => {
  return {
    type: FETCH_PROJECT_REQUEST,
  }
}
const fetchProjectSuccess = data => {
  return {
    type: FETCH_PROJECT_SUCCESS,
    payload: data
  }
}
const fetchProjectFailure = error => {
  return {
    type: FETCH_PROJECT_FAILURE,
    payload: error
  }
}
const fetchProject = parameter => {
  return dispatch => {
    dispatch(fetchProjectRequest());
    axios
      .get(`${serverBaseURL()}/organization/project/fetch_one-project?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchProjectSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchProjectFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchProjectFailure(error)));
  }
}

const fetchProjectsRequest = () => {
  return {
    type: FETCH_PROJECTS_REQUEST,
  }
}
const fetchProjectsSuccess = data => {
  return {
    type: FETCH_PROJECTS_SUCCESS,
    payload: data
  }
}
const fetchProjectsFailure = error => {
  return {
    type: FETCH_PROJECTS_FAILURE,
    payload: error
  }
}
const fetchProjects = () => {
  return dispatch => {
    dispatch(fetchProjectsRequest());
    axios
      .get(`${serverBaseURL()}/organization/project/fetch_all-project`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchProjectsSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchProjectsFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchProjectsFailure(error)));
  }
}


const createFunfactRequest = () => {
  return {
    type: CREATE_FUNFACT_REQUEST,
  }
}
const createFunfactSuccess = data => {
  return {
    type: CREATE_FUNFACT_SUCCESS,
    payload: data
  }
}
const createFunfactFailure = error => {
  return {
    type: CREATE_FUNFACT_FAILURE,
    payload: error
  }
}
const createFunfact = data => {
  return dispatch => {
    dispatch(createFunfactRequest());
    axios
      .post(`${serverBaseURL()}/organization/funfact/create-funfact`, data)
      .then(rs => {
        if (rs.data.data)  dispatch(createFunfactSuccess(rs.data.data));
        if (rs.data.error) dispatch(createFunfactFailure(rs.data.error));
      })
      .catch(error => dispatch(createFunfactFailure(error)));
  }
}

const updateFunfactRequest = () => {
  return {
    type: UPDATE_FUNFACT_REQUEST,
  }
}
const updateFunfactSuccess = data => {
  return {
    type: UPDATE_FUNFACT_SUCCESS,
    payload: data
  }
}
const updateFunfactFailure = error => {
  return {
    type: UPDATE_FUNFACT_FAILURE,
    payload: error
  }
}
const updateFunfact = data => {
  return dispatch => {
    dispatch(updateFunfactRequest());
    axios
      .post(`${serverBaseURL()}/organization/funfact/update-funfact`, data)
      .then(rs => {
        if (rs.data.data)  dispatch(updateFunfactSuccess(rs.data.data));
        if (rs.data.error) dispatch(updateFunfactFailure(rs.data.error));
      })
      .catch(error => dispatch(updateFunfactFailure(error)));
  }
}

const deleteFunfactsRequest = () => {
  return {
    type: DELETE_FUNFACTS_REQUEST,
  }
}
const deleteFunfactsSuccess = data => {
  return {
    type: DELETE_FUNFACTS_SUCCESS,
    payload: data
  }
}
const deleteFunfactsFailure = error => {
  return {
    type: DELETE_FUNFACTS_FAILURE,
    payload: error
  }
}
const deleteFunfacts = data => {
  return dispatch => {
    dispatch(deleteFunfactsRequest());
    axios
      .post(`${serverBaseURL()}/organization/funfact/delete-funfact`, data)
      .then(rs => {
        if (rs.data.data)  dispatch(deleteFunfactsSuccess(rs.data.data));
        if (rs.data.error) dispatch(deleteFunfactsFailure(rs.data.error));
      })
      .catch(error => dispatch(deleteFunfactsFailure(error)));
  }
}

const fetchFunfactRequest = () => {
  return {
    type: FETCH_FUNFACT_REQUEST,
  }
}
const fetchFunfactSuccess = data => {
  return {
    type: FETCH_FUNFACT_SUCCESS,
    payload: data
  }
}
const fetchFunfactFailure = error => {
  return {
    type: FETCH_FUNFACT_FAILURE,
    payload: error
  }
}
const fetchFunfact = parameter => {
  return dispatch => {
    dispatch(fetchFunfactRequest());
    axios
      .get(`${serverBaseURL()}/organization/funfact/fetch_one-funfact?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchFunfactSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchFunfactFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchFunfactFailure(error)));
  }
}

const fetchFunfactsRequest = () => {
  return {
    type: FETCH_FUNFACTS_REQUEST,
  }
}
const fetchFunfactsSuccess = data => {
  return {
    type: FETCH_FUNFACTS_SUCCESS,
    payload: data
  }
}
const fetchFunfactsFailure = error => {
  return {
    type: FETCH_FUNFACTS_FAILURE,
    payload: error
  }
}
const fetchFunfacts = () => {
  return dispatch => {
    dispatch(fetchFunfactsRequest());
    axios
      .get(`${serverBaseURL()}/organization/funfact/fetch_all-funfact`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchFunfactsSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchFunfactsFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchFunfactsFailure(error)));
  }
}

export {
  createModule, fetchModules, deleteModules, fetchModule, updateModule,
  createDesignation, updateDesignation, deleteDesignations, fetchDesignation, fetchDesignations,
  createValue, updateValue, deleteValues, fetchValue, fetchValues, createTestimonial, 
  updateTestimonial, deleteTestimonials, fetchTestimonial, fetchTestimonials, createPartner, 
  updatePartner, deletePartners, fetchPartner, fetchPartners, 
  createProject, updateProject, deleteProjects, fetchProject, fetchProjects, 
  createFunfact, updateFunfact, deleteFunfacts, fetchFunfact, fetchFunfacts
}