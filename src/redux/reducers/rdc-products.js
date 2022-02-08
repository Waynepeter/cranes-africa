import {
  CREATE_CATALOGUE_REQUEST, CREATE_CATALOGUE_SUCCESS, CREATE_CATALOGUE_FAILURE, 
  UPDATE_CATALOGUE_REQUEST, UPDATE_CATALOGUE_SUCCESS, UPDATE_CATALOGUE_FAILURE, 
  DELETE_CATALOGUES_REQUEST, DELETE_CATALOGUES_SUCCESS, DELETE_CATALOGUES_FAILURE, 
  FETCH_CATALOGUE_REQUEST, FETCH_CATALOGUE_SUCCESS, FETCH_CATALOGUE_FAILURE, 
  FETCH_CATALOGUES_REQUEST, FETCH_CATALOGUES_SUCCESS, FETCH_CATALOGUES_FAILURE, 
  CREATE_DISTRIBUTION_REQUEST, CREATE_DISTRIBUTION_SUCCESS, CREATE_DISTRIBUTION_FAILURE, 
  UPDATE_DISTRIBUTION_REQUEST, UPDATE_DISTRIBUTION_SUCCESS, UPDATE_DISTRIBUTION_FAILURE, 
  DELETE_DISTRIBUTIONS_REQUEST, DELETE_DISTRIBUTIONS_SUCCESS, DELETE_DISTRIBUTIONS_FAILURE, 
  FETCH_DISTRIBUTION_REQUEST, FETCH_DISTRIBUTION_SUCCESS, FETCH_DISTRIBUTION_FAILURE, 
  FETCH_DISTRIBUTIONS_REQUEST, FETCH_DISTRIBUTIONS_SUCCESS, FETCH_DISTRIBUTIONS_FAILURE, 
  CREATE_SALEMODE_REQUEST, CREATE_SALEMODE_SUCCESS, CREATE_SALEMODE_FAILURE, 
  UPDATE_SALEMODE_REQUEST, UPDATE_SALEMODE_SUCCESS, UPDATE_SALEMODE_FAILURE, 
  DELETE_SALEMODES_REQUEST, DELETE_SALEMODES_SUCCESS, DELETE_SALEMODES_FAILURE, 
  FETCH_SALEMODE_REQUEST, FETCH_SALEMODE_SUCCESS, FETCH_SALEMODE_FAILURE, 
  FETCH_SALEMODES_REQUEST, FETCH_SALEMODES_SUCCESS, FETCH_SALEMODES_FAILURE, 
  CREATE_PRODUCTCAT_REQUEST, CREATE_PRODUCTCAT_SUCCESS, CREATE_PRODUCTCAT_FAILURE, 
  UPDATE_PRODUCTCAT_REQUEST, UPDATE_PRODUCTCAT_SUCCESS, UPDATE_PRODUCTCAT_FAILURE, 
  DELETE_PRODUCTCATS_REQUEST, DELETE_PRODUCTCATS_SUCCESS, DELETE_PRODUCTCATS_FAILURE, 
  FETCH_PRODUCTCAT_REQUEST, FETCH_PRODUCTCAT_SUCCESS, FETCH_PRODUCTCAT_FAILURE, 
  FETCH_PRODUCTCATS_REQUEST, FETCH_PRODUCTCATS_SUCCESS, FETCH_PRODUCTCATS_FAILURE, 
  CREATE_PRODUCTSUBCAT_REQUEST, CREATE_PRODUCTSUBCAT_SUCCESS, CREATE_PRODUCTSUBCAT_FAILURE, 
  UPDATE_PRODUCTSUBCAT_REQUEST, UPDATE_PRODUCTSUBCAT_SUCCESS, UPDATE_PRODUCTSUBCAT_FAILURE, 
  DELETE_PRODUCTSUBCATS_REQUEST, DELETE_PRODUCTSUBCATS_SUCCESS, DELETE_PRODUCTSUBCATS_FAILURE, 
  FETCH_PRODUCTSUBCAT_REQUEST, FETCH_PRODUCTSUBCAT_SUCCESS, FETCH_PRODUCTSUBCAT_FAILURE, 
  FETCH_PRODUCTSUBCATS_REQUEST, FETCH_PRODUCTSUBCATS_SUCCESS, FETCH_PRODUCTSUBCATS_FAILURE, 
  CREATE_PRODUCTGROUP_REQUEST, CREATE_PRODUCTGROUP_SUCCESS, CREATE_PRODUCTGROUP_FAILURE, 
  UPDATE_PRODUCTGROUP_REQUEST, UPDATE_PRODUCTGROUP_SUCCESS, UPDATE_PRODUCTGROUP_FAILURE, 
  DELETE_PRODUCTGROUPS_REQUEST, DELETE_PRODUCTGROUPS_SUCCESS, DELETE_PRODUCTGROUPS_FAILURE, 
  FETCH_PRODUCTGROUP_REQUEST, FETCH_PRODUCTGROUP_SUCCESS, FETCH_PRODUCTGROUP_FAILURE, 
  FETCH_PRODUCTGROUPS_REQUEST, FETCH_PRODUCTGROUPS_SUCCESS, FETCH_PRODUCTGROUPS_FAILURE, 
  CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE, 
  UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE, 
  DELETE_PRODUCTS_REQUEST, DELETE_PRODUCTS_SUCCESS, DELETE_PRODUCTS_FAILURE, 
  FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_FAILURE, 
  FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE
} from '../types';
import {
  initCatalogueCreate, initCatalogueUpdate, initCataloguesDelete, 
  initCatalogueFetch, initCataloguesFetch, initDistributionCreate, 
  initDistributionUpdate, initDistributionsDelete, initDistributionFetch, 
  initDistributionsFetch, initSalemodeCreate, initSalemodeUpdate, 
  initSalemodesDelete, initSalemodeFetch, initSalemodesFetch, 
  initProductcatCreate, initProductcatUpdate, initProductcatsDelete, 
  initProductcatFetch, initProductcatsFetch, initProductsubcatCreate, 
  initProductsubcatUpdate, initProductsubcatsDelete, initProductsubcatFetch, 
  initProductsubcatsFetch, initProductgroupCreate, initProductgroupUpdate, 
  initProductgroupsDelete, initProductgroupFetch, initProductgroupsFetch, 
  initProductCreate, initProductUpdate, initProductsDelete, 
  initProductFetch, initProductsFetch
} from '../states';

const catalogueCreateReducer = (state = initCatalogueCreate, action) => {
  switch (action.type) {
    case CREATE_CATALOGUE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_CATALOGUE_SUCCESS:
      return {
        loading: false,
        catalogueCreate: action.payload, 
        error: null
      }
    case CREATE_CATALOGUE_FAILURE:
      return {
        loading: false,
        catalogueCreate: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const catalogueUpdateReducer = (state = initCatalogueUpdate, action) => {
  switch (action.type) {
    case UPDATE_CATALOGUE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_CATALOGUE_SUCCESS:
      return {
        loading: false,
        catalogueUpdate: action.payload, 
        error: null
      }
    case UPDATE_CATALOGUE_FAILURE:
      return {
        loading: false,
        catalogueUpdate: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const cataloguesDeleteReducer = (state = initCataloguesDelete, action) => {
  switch (action.type) {
    case DELETE_CATALOGUES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_CATALOGUES_SUCCESS:
      return {
        loading: false,
        cataloguesDelete: action.payload, 
        error: null
      }
    case DELETE_CATALOGUES_FAILURE:
      return {
        loading: false,
        cataloguesDelete: [], 
        error: action.payload
      }
    default:
      return state
  }
}
const catalogueFetchReducer = (state = initCatalogueFetch, action) => {
  switch (action.type) {
    case FETCH_CATALOGUE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_CATALOGUE_SUCCESS:
      return {
        loading: false,
        catalogueFetch: action.payload, 
        error: null
      }
    case FETCH_CATALOGUE_FAILURE:
      return {
        loading: false,
        catalogueFetch: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const cataloguesFetchReducer = (state = initCataloguesFetch, action) => {
  switch (action.type) {
    case FETCH_CATALOGUES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_CATALOGUES_SUCCESS:
      return {
        loading: false,
        cataloguesFetch: action.payload, 
        error: null
      }
    case FETCH_CATALOGUES_FAILURE:
      return {
        loading: false,
        cataloguesFetch: [], 
        error: action.payload
      }
    default:
      return state
  }
}

const distributionCreateReducer = (state = initDistributionCreate, action) => {
  switch (action.type) {
    case CREATE_DISTRIBUTION_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_DISTRIBUTION_SUCCESS:
      return {
        loading: false,
        distributionCreate: action.payload, 
        error: null
      }
    case CREATE_DISTRIBUTION_FAILURE:
      return {
        loading: false,
        distributionCreate: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const distributionUpdateReducer = (state = initDistributionUpdate, action) => {
  switch (action.type) {
    case UPDATE_DISTRIBUTION_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_DISTRIBUTION_SUCCESS:
      return {
        loading: false,
        distributionUpdate: action.payload, 
        error: null
      }
    case UPDATE_DISTRIBUTION_FAILURE:
      return {
        loading: false,
        distributionUpdate: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const distributionsDeleteReducer = (state = initDistributionsDelete, action) => {
  switch (action.type) {
    case DELETE_DISTRIBUTIONS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_DISTRIBUTIONS_SUCCESS:
      return {
        loading: false,
        distributionsDelete: action.payload, 
        error: null
      }
    case DELETE_DISTRIBUTIONS_FAILURE:
      return {
        loading: false,
        distributionsDelete: [], 
        error: action.payload
      }
    default:
      return state
  }
}
const distributionFetchReducer = (state = initDistributionFetch, action) => {
  switch (action.type) {
    case FETCH_DISTRIBUTION_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_DISTRIBUTION_SUCCESS:
      return {
        loading: false,
        distributionFetch: action.payload, 
        error: null
      }
    case FETCH_DISTRIBUTION_FAILURE:
      return {
        loading: false,
        distributionFetch: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const distributionsFetchReducer = (state = initDistributionsFetch, action) => {
  switch (action.type) {
    case FETCH_DISTRIBUTIONS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_DISTRIBUTIONS_SUCCESS:
      return {
        loading: false,
        distributionsFetch: action.payload, 
        error: null
      }
    case FETCH_DISTRIBUTIONS_FAILURE:
      return {
        loading: false,
        distributionsFetch: [], 
        error: action.payload
      }
    default:
      return state
  }
}

const salemodeCreateReducer = (state = initSalemodeCreate, action) => {
  switch (action.type) {
    case CREATE_SALEMODE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_SALEMODE_SUCCESS:
      return {
        loading: false,
        salemodeCreate: action.payload, 
        error: null
      }
    case CREATE_SALEMODE_FAILURE:
      return {
        loading: false,
        salemodeCreate: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const salemodeUpdateReducer = (state = initSalemodeUpdate, action) => {
  switch (action.type) {
    case UPDATE_SALEMODE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_SALEMODE_SUCCESS:
      return {
        loading: false,
        salemodeUpdate: action.payload, 
        error: null
      }
    case UPDATE_SALEMODE_FAILURE:
      return {
        loading: false,
        salemodeUpdate: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const salemodesDeleteReducer = (state = initSalemodesDelete, action) => {
  switch (action.type) {
    case DELETE_SALEMODES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_SALEMODES_SUCCESS:
      return {
        loading: false,
        salemodesDelete: action.payload, 
        error: null
      }
    case DELETE_SALEMODES_FAILURE:
      return {
        loading: false,
        salemodesDelete: [], 
        error: action.payload
      }
    default:
      return state
  }
}
const salemodeFetchReducer = (state = initSalemodeFetch, action) => {
  switch (action.type) {
    case FETCH_SALEMODE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_SALEMODE_SUCCESS:
      return {
        loading: false,
        salemodeFetch: action.payload, 
        error: null
      }
    case FETCH_SALEMODE_FAILURE:
      return {
        loading: false,
        salemodeFetch: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const salemodesFetchReducer = (state = initSalemodesFetch, action) => {
  switch (action.type) {
    case FETCH_SALEMODES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_SALEMODES_SUCCESS:
      return {
        loading: false,
        salemodesFetch: action.payload, 
        error: null
      }
    case FETCH_SALEMODES_FAILURE:
      return {
        loading: false,
        salemodesFetch: [], 
        error: action.payload
      }
    default:
      return state
  }
}

const productcatCreateReducer = (state = initProductcatCreate, action) => {
  switch (action.type) {
    case CREATE_PRODUCTCAT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_PRODUCTCAT_SUCCESS:
      return {
        loading: false,
        productcatCreate: action.payload, 
        error: null
      }
    case CREATE_PRODUCTCAT_FAILURE:
      return {
        loading: false,
        productcatCreate: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const productcatUpdateReducer = (state = initProductcatUpdate, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTCAT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_PRODUCTCAT_SUCCESS:
      return {
        loading: false,
        productcatUpdate: action.payload, 
        error: null
      }
    case UPDATE_PRODUCTCAT_FAILURE:
      return {
        loading: false,
        productcatUpdate: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const productcatsDeleteReducer = (state = initProductcatsDelete, action) => {
  switch (action.type) {
    case DELETE_PRODUCTCATS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_PRODUCTCATS_SUCCESS:
      return {
        loading: false,
        productcatsDelete: action.payload, 
        error: null
      }
    case DELETE_PRODUCTCATS_FAILURE:
      return {
        loading: false,
        productcatsDelete: [], 
        error: action.payload
      }
    default:
      return state
  }
}
const productcatFetchReducer = (state = initProductcatFetch, action) => {
  switch (action.type) {
    case FETCH_PRODUCTCAT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_PRODUCTCAT_SUCCESS:
      return {
        loading: false,
        productcatFetch: action.payload, 
        error: null
      }
    case FETCH_PRODUCTCAT_FAILURE:
      return {
        loading: false,
        productcatFetch: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const productcatsFetchReducer = (state = initProductcatsFetch, action) => {
  switch (action.type) {
    case FETCH_PRODUCTCATS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_PRODUCTCATS_SUCCESS:
      return {
        loading: false,
        productcatsFetch: action.payload, 
        error: null
      }
    case FETCH_PRODUCTCATS_FAILURE:
      return {
        loading: false,
        productcatsFetch: [], 
        error: action.payload
      }
    default:
      return state
  }
}

const productsubcatCreateReducer = (state = initProductsubcatCreate, action) => {
  switch (action.type) {
    case CREATE_PRODUCTSUBCAT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_PRODUCTSUBCAT_SUCCESS:
      return {
        loading: false,
        productsubcatCreate: action.payload, 
        error: null
      }
    case CREATE_PRODUCTSUBCAT_FAILURE:
      return {
        loading: false,
        productsubcatCreate: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const productsubcatUpdateReducer = (state = initProductsubcatUpdate, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTSUBCAT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_PRODUCTSUBCAT_SUCCESS:
      return {
        loading: false,
        productsubcatUpdate: action.payload, 
        error: null
      }
    case UPDATE_PRODUCTSUBCAT_FAILURE:
      return {
        loading: false,
        productsubcatUpdate: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const productsubcatsDeleteReducer = (state = initProductsubcatsDelete, action) => {
  switch (action.type) {
    case DELETE_PRODUCTSUBCATS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_PRODUCTSUBCATS_SUCCESS:
      return {
        loading: false,
        productsubcatsDelete: action.payload, 
        error: null
      }
    case DELETE_PRODUCTSUBCATS_FAILURE:
      return {
        loading: false,
        productsubcatsDelete: [], 
        error: action.payload
      }
    default:
      return state
  }
}
const productsubcatFetchReducer = (state = initProductsubcatFetch, action) => {
  switch (action.type) {
    case FETCH_PRODUCTSUBCAT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_PRODUCTSUBCAT_SUCCESS:
      return {
        loading: false,
        productsubcatFetch: action.payload, 
        error: null
      }
    case FETCH_PRODUCTSUBCAT_FAILURE:
      return {
        loading: false,
        productsubcatFetch: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const productsubcatsFetchReducer = (state = initProductsubcatsFetch, action) => {
  switch (action.type) {
    case FETCH_PRODUCTSUBCATS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_PRODUCTSUBCATS_SUCCESS:
      return {
        loading: false,
        productsubcatsFetch: action.payload, 
        error: null
      }
    case FETCH_PRODUCTSUBCATS_FAILURE:
      return {
        loading: false,
        productsubcatsFetch: [], 
        error: action.payload
      }
    default:
      return state
  }
}

const productgroupCreateReducer = (state = initProductgroupCreate, action) => {
  switch (action.type) {
    case CREATE_PRODUCTGROUP_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_PRODUCTGROUP_SUCCESS:
      return {
        loading: false,
        productgroupCreate: action.payload, 
        error: null
      }
    case CREATE_PRODUCTGROUP_FAILURE:
      return {
        loading: false,
        productgroupCreate: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const productgroupUpdateReducer = (state = initProductgroupUpdate, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTGROUP_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_PRODUCTGROUP_SUCCESS:
      return {
        loading: false,
        productgroupUpdate: action.payload, 
        error: null
      }
    case UPDATE_PRODUCTGROUP_FAILURE:
      return {
        loading: false,
        productgroupUpdate: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const productgroupsDeleteReducer = (state = initProductgroupsDelete, action) => {
  switch (action.type) {
    case DELETE_PRODUCTGROUPS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_PRODUCTGROUPS_SUCCESS:
      return {
        loading: false,
        productgroupsDelete: action.payload, 
        error: null
      }
    case DELETE_PRODUCTGROUPS_FAILURE:
      return {
        loading: false,
        productgroupsDelete: [], 
        error: action.payload
      }
    default:
      return state
  }
}
const productgroupFetchReducer = (state = initProductgroupFetch, action) => {
  switch (action.type) {
    case FETCH_PRODUCTGROUP_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_PRODUCTGROUP_SUCCESS:
      return {
        loading: false,
        productgroupFetch: action.payload, 
        error: null
      }
    case FETCH_PRODUCTGROUP_FAILURE:
      return {
        loading: false,
        productgroupFetch: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const productgroupsFetchReducer = (state = initProductgroupsFetch, action) => {
  switch (action.type) {
    case FETCH_PRODUCTGROUPS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_PRODUCTGROUPS_SUCCESS:
      return {
        loading: false,
        productgroupsFetch: action.payload, 
        error: null
      }
    case FETCH_PRODUCTGROUPS_FAILURE:
      return {
        loading: false,
        productgroupsFetch: [], 
        error: action.payload
      }
    default:
      return state
  }
}

const productCreateReducer = (state = initProductCreate, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        productCreate: action.payload, 
        error: null
      }
    case CREATE_PRODUCT_FAILURE:
      return {
        loading: false,
        productCreate: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const productUpdateReducer = (state = initProductUpdate, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        productUpdate: action.payload, 
        error: null
      }
    case UPDATE_PRODUCT_FAILURE:
      return {
        loading: false,
        productUpdate: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const productsDeleteReducer = (state = initProductsDelete, action) => {
  switch (action.type) {
    case DELETE_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_PRODUCTS_SUCCESS:
      return {
        loading: false,
        productsDelete: action.payload, 
        error: null
      }
    case DELETE_PRODUCTS_FAILURE:
      return {
        loading: false,
        productsDelete: [], 
        error: action.payload
      }
    default:
      return state
  }
}
const productFetchReducer = (state = initProductFetch, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_PRODUCT_SUCCESS:
      return {
        loading: false,
        productFetch: action.payload, 
        error: null
      }
    case FETCH_PRODUCT_FAILURE:
      return {
        loading: false,
        productFetch: {}, 
        error: action.payload
      }
    default:
      return state
  }
}
const productsFetchReducer = (state = initProductsFetch, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_PRODUCTS_SUCCESS:
      return {
        loading: false,
        productsFetch: action.payload, 
        error: null
      }
    case FETCH_PRODUCTS_FAILURE:
      return {
        loading: false,
        productsFetch: [], 
        error: action.payload
      }
    default:
      return state
  }
}

export {
  catalogueCreateReducer, catalogueUpdateReducer, cataloguesDeleteReducer, 
  catalogueFetchReducer, cataloguesFetchReducer, distributionCreateReducer, 
  distributionUpdateReducer, distributionsDeleteReducer, distributionFetchReducer, 
  distributionsFetchReducer, salemodeCreateReducer, salemodeUpdateReducer, 
  salemodesDeleteReducer, salemodeFetchReducer, salemodesFetchReducer, 
  productcatCreateReducer, productcatUpdateReducer, productcatsDeleteReducer, 
  productcatFetchReducer, productcatsFetchReducer, productsubcatCreateReducer, 
  productsubcatUpdateReducer, productsubcatsDeleteReducer, productsubcatFetchReducer, 
  productsubcatsFetchReducer, productgroupCreateReducer, productgroupUpdateReducer, 
  productgroupsDeleteReducer, productgroupFetchReducer, productgroupsFetchReducer, 
  productCreateReducer, productUpdateReducer, productsDeleteReducer, 
  productFetchReducer, productsFetchReducer
}
