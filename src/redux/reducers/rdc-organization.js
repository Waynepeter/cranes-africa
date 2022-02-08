
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
import {
  initCreateModule, initFetchModules, initDeleteModules, initFetchModule, initUpdateModule,
  initCreateDesignation, initUpdateDesignation, initDeleteDesignations, initFetchDesignation, 
  initFetchDesignations, initCreateValue, initUpdateValue, initDeleteValues, initFetchValue, 
  initFetchValues, initCreateTestimonial, initUpdateTestimonial, initDeleteTestimonials, 
  initFetchTestimonial, initFetchTestimonials, initCreatePartner, initUpdatePartner, 
  initDeletePartners, initFetchPartner, initFetchPartners,
  initCreateProject, initUpdateProject, initDeleteProjects, initFetchProject, initFetchProjects, 
  initCreateFunfact, initUpdateFunfact, initDeleteFunfacts, initFetchFunfact, initFetchFunfacts,
} from '../states';

const createModuleReducer = (state = initCreateModule, action) => {
  switch (action.type) {
    case CREATE_MODULE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_MODULE_SUCCESS:
      return {
        loading: false,
        createModule: action.payload,
        error: null
      }
    case CREATE_MODULE_FAILURE:
      return {
        loading: false,
        createModule: {},
        error: action.payload
      }
    default:
      return state
  }
}
const fetchModulesReducer = (state = initFetchModules, action) => {
  switch (action.type) {
    case FETCH_MODULES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_MODULES_SUCCESS:
      return {
        loading: false,
        modules: action.payload,
        error: null
      }
    case FETCH_MODULES_FAILURE:
      return {
        loading: false,
        modules: [],
        error: action.payload
      }
    default:
      return state
  }
}
const deleteModulesReducer = (state = initDeleteModules, action) => {
  switch (action.type) {
    case DELETE_MODULES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_MODULES_SUCCESS:
      return {
        loading: false,
        modules: action.payload,
        error: null
      }
    case DELETE_MODULES_FAILURE:
      return {
        loading: false,
        modules: [],
        error: action.payload
      }
    default:
      return state
  }
}
const fetchModuleReducer = (state = initFetchModule, action) => {
  switch (action.type) {
    case FETCH_MODULE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_MODULE_SUCCESS:
      return {
        loading: false,
        module: action.payload,
        error: null
      }
    case FETCH_MODULE_FAILURE:
      return {
        loading: false,
        module: {},
        error: action.payload
      }
    default:
      return state
  }
}
const updateModuleReducer = (state = initUpdateModule, action) => {
  switch (action.type) {
    case UPDATE_MODULE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_MODULE_SUCCESS:
      return {
        loading: false,
        module: action.payload,
        error: null
      }
    case UPDATE_MODULE_FAILURE:
      return {
        loading: false,
        module: {},
        error: action.payload
      }
    default:
      return state
  }
}

const createDesignationReducer = (state = initCreateDesignation, action) => {
  switch (action.type) {
    case CREATE_DESIGNATION_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_DESIGNATION_SUCCESS:
      return {
        loading: false,
        createDesignation: action.payload,
        error: null
      }
    case CREATE_DESIGNATION_FAILURE:
      return {
        loading: false,
        createDesignation: {},
        error: action.payload
      }
    default:
      return state
  }
}
const updateDesignationReducer = (state = initUpdateDesignation, action) => {
  switch (action.type) {
    case UPDATE_DESIGNATION_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_DESIGNATION_SUCCESS:
      return {
        loading: false,
        updateDesignation: action.payload,
        error: null
      }
    case UPDATE_DESIGNATION_FAILURE:
      return {
        loading: false,
        updateDesignation: {},
        error: action.payload
      }
    default:
      return state
  }
}
const deleteDesignationsReducer = (state = initDeleteDesignations, action) => {
  switch (action.type) {
    case DELETE_DESIGNATIONS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_DESIGNATIONS_SUCCESS:
      return {
        loading: false,
        deleteDesignations: action.payload,
        error: null
      }
    case DELETE_DESIGNATIONS_FAILURE:
      return {
        loading: false,
        deleteDesignations: [],
        error: action.payload
      }
    default:
      return state
  }
}
const fetchDesignationReducer = (state = initFetchDesignation, action) => {
  switch (action.type) {
    case FETCH_DESIGNATION_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_DESIGNATION_SUCCESS:
      return {
        loading: false,
        fetchDesignation: action.payload,
        error: null
      }
    case FETCH_DESIGNATION_FAILURE:
      return {
        loading: false,
        fetchDesignation: {},
        error: action.payload
      }
    default:
      return state
  }
}
const fetchDesignationsReducer = (state = initFetchDesignations, action) => {
  switch (action.type) {
    case FETCH_DESIGNATIONS_REQUEST:
      return {
        ...state, loading: true
      }
    case FETCH_DESIGNATIONS_SUCCESS:
      return {
        loading: false,
        fetchDesignations: action.payload,
        error: null
      }
    case FETCH_DESIGNATIONS_FAILURE:
      return {
        loading: false,
        fetchDesignations: [],
        error: action.payload
      }
    default:
      return state
  }
}

const createValueReducer = (state = initCreateValue, action) => {
  switch (action.type) {
    case CREATE_VALUE_REQUEST:
      return {
        ...state, loading: true
      }
    case CREATE_VALUE_SUCCESS:
      return {
        loading: false,
        createValue: action.payload,
        error: null
      }
    case CREATE_VALUE_FAILURE:
      return {
        loading: false,
        createValue: {},
        error: action.payload
      }
    default:
      return state
  }
}
const updateValueReducer = (state = initUpdateValue, action) => {
  switch (action.type) {
    case UPDATE_VALUE_REQUEST:
      return {
        ...state, loading: true
      }
    case UPDATE_VALUE_SUCCESS:
      return {
        loading: false,
        updateValue: action.payload,
        error: null
      }
    case UPDATE_VALUE_FAILURE:
      return {
        loading: false,
        updateValue: {},
        error: action.payload
      }
    default:
      return state
  }
}
const deleteValuesReducer = (state = initDeleteValues, action) => {
  switch (action.type) {
    case DELETE_VALUES_REQUEST:
      return {
        ...state, loading: true
      }
    case DELETE_VALUES_SUCCESS:
      return {
        loading: false,
        deleteValues: action.payload,
        error: null
      }
    case DELETE_VALUES_FAILURE:
      return {
        loading: false,
        deleteValues: [],
        error: action.payload
      }
    default:
      return state
  }
}
const fetchValueReducer = (state = initFetchValue, action) => {
  switch (action.type) {
    case FETCH_VALUE_REQUEST:
      return {
        ...state, loading: true
      }
    case FETCH_VALUE_SUCCESS:
      return {
        loading: false,
        fetchValue: action.payload,
        error: null
      }
    case FETCH_VALUE_FAILURE:
      return {
        loading: false,
        fetchValue: {},
        error: action.payload
      }
    default:
      return state
  }
}
const fetchValuesReducer = (state = initFetchValues, action) => {
  switch (action.type) {
    case FETCH_VALUES_REQUEST:
      return {
        ...state, loading: true
      }
    case FETCH_VALUES_SUCCESS:
      return {
        loading: false,
        fetchValues: action.payload,
        error: null
      }
    case FETCH_VALUES_FAILURE:
      return {
        loading: false,
        fetchValues: [],
        error: action.payload
      }
    default:
      return state
  }
}

const createTestimonialReducer = (state = initCreateTestimonial, action) => {
  switch (action.type) {
    case CREATE_TESTIMONIAL_REQUEST:
      return {
        ...state, loading: true
      }
    case CREATE_TESTIMONIAL_SUCCESS:
      return {
        loading: false,
        createTestimonial: action.payload,
        error: null
      }
    case CREATE_TESTIMONIAL_FAILURE:
      return {
        loading: false,
        createTestimonial: {},
        error: action.payload
      }
    default:
      return state
  }
}
const updateTestimonialReducer = (state = initUpdateTestimonial, action) => {
  switch (action.type) {
    case UPDATE_TESTIMONIAL_REQUEST:
      return {
        ...state, loading: true
      }
    case UPDATE_TESTIMONIAL_SUCCESS:
      return {
        loading: false,
        updateTestimonial: action.payload,
        error: null
      }
    case UPDATE_TESTIMONIAL_FAILURE:
      return {
        loading: false,
        updateTestimonial: {},
        error: action.payload
      }
    default:
      return state
  }
}
const deleteTestimonialsReducer = (state = initDeleteTestimonials, action) => {
  switch (action.type) {
    case DELETE_TESTIMONIALS_REQUEST:
      return {
        ...state, loading: true
      }
    case DELETE_TESTIMONIALS_SUCCESS:
      return {
        loading: false,
        deleteTestimonials: action.payload,
        error: null
      }
    case DELETE_TESTIMONIALS_FAILURE:
      return {
        loading: false,
        deleteTestimonials: [],
        error: action.payload
      }
    default:
      return state
  }
}
const fetchTestimonialReducer = (state = initFetchTestimonial, action) => {
  switch (action.type) {
    case FETCH_TESTIMONIAL_REQUEST:
      return {
        ...state, loading: true
      }
    case FETCH_TESTIMONIAL_SUCCESS:
      return {
        loading: false,
        fetchTestimonial: action.payload,
        error: null
      }
    case FETCH_TESTIMONIAL_FAILURE:
      return {
        loading: false,
        fetchTestimonial: {},
        error: action.payload
      }
    default:
      return state
  }
}
const fetchTestimonialsReducer = (state = initFetchTestimonials, action) => {
  switch (action.type) {
    case FETCH_TESTIMONIALS_REQUEST:
      return {
        ...state, loading: true
      }
    case FETCH_TESTIMONIALS_SUCCESS:
      return {
        loading: false,
        fetchTestimonials: action.payload,
        error: null
      }
    case FETCH_TESTIMONIALS_FAILURE:
      return {
        loading: false,
        fetchTestimonials: [],
        error: action.payload
      }
    default:
      return state
  }
}

const createPartnerReducer = (state = initCreatePartner, action) => {
  switch (action.type) {
    case CREATE_PARTNER_REQUEST:
      return {
        ...state, loading: true
      }
    case CREATE_PARTNER_SUCCESS:
      return {
        loading: false,
        createPartner: action.payload,
        error: null
      }
    case CREATE_PARTNER_FAILURE:
      return {
        loading: false,
        createPartner: {},
        error: action.payload
      }
    default:
      return state
  }
}
const updatePartnerReducer = (state = initUpdatePartner, action) => {
  switch (action.type) {
    case UPDATE_PARTNER_REQUEST:
      return {
        ...state, loading: true
      }
    case UPDATE_PARTNER_SUCCESS:
      return {
        loading: false,
        updatePartner: action.payload,
        error: null
      }
    case UPDATE_PARTNER_FAILURE:
      return {
        loading: false,
        updatePartner: {},
        error: action.payload
      }
    default:
      return state
  }
}
const deletePartnersReducer = (state = initDeletePartners, action) => {
  switch (action.type) {
    case DELETE_PARTNERS_REQUEST:
      return {
        ...state, loading: true
      }
    case DELETE_PARTNERS_SUCCESS:
      return {
        loading: false,
        deletePartners: action.payload,
        error: null
      }
    case DELETE_PARTNERS_FAILURE:
      return {
        loading: false,
        deletePartners: [],
        error: action.payload
      }
    default:
      return state
  }
}
const fetchPartnerReducer = (state = initFetchPartner, action) => {
  switch (action.type) {
    case FETCH_PARTNER_REQUEST:
      return {
        ...state, loading: true
      }
    case FETCH_PARTNER_SUCCESS:
      return {
        loading: false,
        fetchPartner: action.payload,
        error: null
      }
    case FETCH_PARTNER_FAILURE:
      return {
        loading: false,
        fetchPartner: {},
        error: action.payload
      }
    default:
      return state
  }
}
const fetchPartnersReducer = (state = initFetchPartners, action) => {
  switch (action.type) {
    case FETCH_PARTNERS_REQUEST:
      return {
        ...state, loading: true
      }
    case FETCH_PARTNERS_SUCCESS:
      return {
        loading: false,
        fetchPartners: action.payload,
        error: null
      }
    case FETCH_PARTNERS_FAILURE:
      return {
        loading: false,
        fetchPartners: [],
        error: action.payload
      }
    default:
      return state
  }
}

const createProjectReducer = (state = initCreateProject, action) => {
  switch (action.type) {
    case CREATE_PROJECT_REQUEST:
      return {
        ...state, loading: true
      }
    case CREATE_PROJECT_SUCCESS:
      return {
        loading: false,
        createProject: action.payload,
        error: null
      }
    case CREATE_PROJECT_FAILURE:
      return {
        loading: false,
        createProject: {},
        error: action.payload
      }
    default:
      return state
  }
}
const updateProjectReducer = (state = initUpdateProject, action) => {
  switch (action.type) {
    case UPDATE_PROJECT_REQUEST:
      return {
        ...state, loading: true
      }
    case UPDATE_PROJECT_SUCCESS:
      return {
        loading: false,
        updateProject: action.payload,
        error: null
      }
    case UPDATE_PROJECT_FAILURE:
      return {
        loading: false,
        updateProject: {},
        error: action.payload
      }
    default:
      return state
  }
}
const deleteProjectsReducer = (state = initDeleteProjects, action) => {
  switch (action.type) {
    case DELETE_PROJECTS_REQUEST:
      return {
        ...state, loading: true
      }
    case DELETE_PROJECTS_SUCCESS:
      return {
        loading: false,
        deleteProjects: action.payload,
        error: null
      }
    case DELETE_PROJECTS_FAILURE:
      return {
        loading: false,
        deleteProjects: [],
        error: action.payload
      }
    default:
      return state
  }
}
const fetchProjectReducer = (state = initFetchProject, action) => {
  switch (action.type) {
    case FETCH_PROJECT_REQUEST:
      return {
        ...state, loading: true
      }
    case FETCH_PROJECT_SUCCESS:
      return {
        loading: false,
        fetchProject: action.payload,
        error: null
      }
    case FETCH_PROJECT_FAILURE:
      return {
        loading: false,
        fetchProject: {},
        error: action.payload
      }
    default:
      return state
  }
}
const fetchProjectsReducer = (state = initFetchProjects, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
      return {
        ...state, loading: true
      }
    case FETCH_PROJECTS_SUCCESS:
      return {
        loading: false,
        fetchProjects: action.payload,
        error: null
      }
    case FETCH_PROJECTS_FAILURE:
      return {
        loading: false,
        fetchProjects: [],
        error: action.payload
      }
    default:
      return state
  }
}

const createFunfactReducer = (state = initCreateFunfact, action) => {
  switch (action.type) {
    case CREATE_FUNFACT_REQUEST:
      return {
        ...state, loading: true
      }
    case CREATE_FUNFACT_SUCCESS:
      return {
        loading: false,
        createFunfact: action.payload,
        error: null
      }
    case CREATE_FUNFACT_FAILURE:
      return {
        loading: false,
        createFunfact: {},
        error: action.payload
      }
    default:
      return state
  }
}
const updateFunfactReducer = (state = initUpdateFunfact, action) => {
  switch (action.type) {
    case UPDATE_FUNFACT_REQUEST:
      return {
        ...state, loading: true
      }
    case UPDATE_FUNFACT_SUCCESS:
      return {
        loading: false,
        updateFunfact: action.payload,
        error: null
      }
    case UPDATE_FUNFACT_FAILURE:
      return {
        loading: false,
        updateFunfact: {},
        error: action.payload
      }
    default:
      return state
  }
}
const deleteFunfactsReducer = (state = initDeleteFunfacts, action) => {
  switch (action.type) {
    case DELETE_FUNFACTS_REQUEST:
      return {
        ...state, loading: true
      }
    case DELETE_FUNFACTS_SUCCESS:
      return {
        loading: false,
        deleteFunfacts: action.payload,
        error: null
      }
    case DELETE_FUNFACTS_FAILURE:
      return {
        loading: false,
        deleteFunfacts: [],
        error: action.payload
      }
    default:
      return state
  }
}
const fetchFunfactReducer = (state = initFetchFunfact, action) => {
  switch (action.type) {
    case FETCH_FUNFACT_REQUEST:
      return {
        ...state, loading: true
      }
    case FETCH_FUNFACT_SUCCESS:
      return {
        loading: false,
        fetchFunfact: action.payload,
        error: null
      }
    case FETCH_FUNFACT_FAILURE:
      return {
        loading: false,
        fetchFunfact: {},
        error: action.payload
      }
    default:
      return state
  }
}
const fetchFunfactsReducer = (state = initFetchFunfacts, action) => {
  switch (action.type) {
    case FETCH_FUNFACTS_REQUEST:
      return {
        ...state, loading: true
      }
    case FETCH_FUNFACTS_SUCCESS:
      return {
        loading: false,
        fetchFunfacts: action.payload,
        error: null
      }
    case FETCH_FUNFACTS_FAILURE:
      return {
        loading: false,
        fetchFunfacts: [],
        error: action.payload
      }
    default:
      return state
  }
}

export {
  createModuleReducer, fetchModulesReducer, deleteModulesReducer, fetchModuleReducer, 
  updateModuleReducer, createDesignationReducer, updateDesignationReducer, deleteDesignationsReducer, 
  fetchDesignationReducer, fetchDesignationsReducer, createValueReducer, updateValueReducer, 
  deleteValuesReducer, fetchValueReducer, fetchValuesReducer, createTestimonialReducer, 
  updateTestimonialReducer, deleteTestimonialsReducer, fetchTestimonialReducer, 
  fetchTestimonialsReducer, createPartnerReducer, updatePartnerReducer, deletePartnersReducer, 
  fetchPartnerReducer, fetchPartnersReducer,
  createProjectReducer, updateProjectReducer, deleteProjectsReducer, fetchProjectReducer, fetchProjectsReducer, 
  createFunfactReducer, updateFunfactReducer, deleteFunfactsReducer, fetchFunfactReducer, fetchFunfactsReducer
}