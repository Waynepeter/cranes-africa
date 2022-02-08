
import axios from 'axios';
import { serverBaseURL } from '../util';
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

const createCatalogueRequest = () => {
  return {
    type: CREATE_CATALOGUE_REQUEST,
  }
}
const createCatalogueSuccess = catalogue => {
  return {
    type: CREATE_CATALOGUE_SUCCESS,
    payload: catalogue
  }
}
const createCatalogueFailure = error => {
  return {
    type: CREATE_CATALOGUE_FAILURE,
    payload: error
  }
}
const createCatalogue = catalogue => {
  return dispatch => {
    dispatch(createCatalogueRequest());
    axios
      .post(`${serverBaseURL()}/products/catalogue/create-catalogue`, catalogue, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(rs => {
        if (rs.data.data)  dispatch(createCatalogueSuccess(rs.data.data));
        if (rs.data.error) dispatch(createCatalogueFailure(rs.data.error));
      })
      .catch(error => dispatch(createCatalogueFailure(error)));
  }
}

const updateCatalogueRequest = () => {
  return {
    type: UPDATE_CATALOGUE_REQUEST,
  }
}
const updateCatalogueSuccess = catalogue => {
  return {
    type: UPDATE_CATALOGUE_SUCCESS,
    payload: catalogue
  }
}
const updateCatalogueFailure = error => {
  return {
    type: UPDATE_CATALOGUE_FAILURE,
    payload: error
  }
}
const updateCatalogue = catalogue => {
  return dispatch => {
    dispatch(updateCatalogueRequest());
    axios
      .post(`${serverBaseURL()}/products/catalogue/update-catalogue`, catalogue, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(rs => {
        if (rs.data.data)  dispatch(updateCatalogueSuccess(rs.data.data));
        if (rs.data.error) dispatch(updateCatalogueFailure(rs.data.error));
      })
      .catch(error => dispatch(updateCatalogueFailure(error)));
  }
}

const deleteCataloguesRequest = () => {
  return {
    type: DELETE_CATALOGUES_REQUEST,
  }
}
const deleteCataloguesSuccess = catalogues => {
  return {
    type: DELETE_CATALOGUES_SUCCESS,
    payload: catalogues
  }
}
const deleteCataloguesFailure = error => {
  return {
    type: DELETE_CATALOGUES_FAILURE,
    payload: error
  }
}
const deleteCatalogues = catalogues => {
  return dispatch => {
    dispatch(deleteCataloguesRequest());
    axios
      .post(`${serverBaseURL()}/products/catalogue/delete-catalogue`, catalogues)
      .then(rs => {
        if (rs.data.data)  dispatch(deleteCataloguesSuccess(rs.data.data));
        if (rs.data.error) dispatch(deleteCataloguesFailure(rs.data.error));
      })
      .catch(error => dispatch(deleteCataloguesFailure(error)));
  }
}

const fetchCatalogueRequest = () => {
  return {
    type: FETCH_CATALOGUE_REQUEST,
  }
}
const fetchCatalogueSuccess = catalogue => {
  return {
    type: FETCH_CATALOGUE_SUCCESS,
    payload: catalogue
  }
}
const fetchCatalogueFailure = error => {
  return {
    type: FETCH_CATALOGUE_FAILURE,
    payload: error
  }
}
const fetchCatalogue = parameter => {
  return dispatch => {
    dispatch(fetchCatalogueRequest());
    axios
      .get(`${serverBaseURL()}/products/catalogue/fetch_one-catalogue?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchCatalogueSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchCatalogueFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchCatalogueFailure(error)));
  }
}

const fetchCataloguesRequest = () => {
  return {
    type: FETCH_CATALOGUES_REQUEST,
  }
}
const fetchCataloguesSuccess = catalogues => {
  return {
    type: FETCH_CATALOGUES_SUCCESS,
    payload: catalogues
  }
}
const fetchCataloguesFailure = error => {
  return {
    type: FETCH_CATALOGUES_FAILURE,
    payload: error
  }
}
const fetchCatalogues = () => {
  return dispatch => {
    dispatch(fetchCataloguesRequest());
    axios
      .get(`${serverBaseURL()}/products/catalogue/fetch_all-catalogue`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchCataloguesSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchCataloguesFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchCataloguesFailure(error)));
  }
}

const createDistributionRequest = () => {
  return {
    type: CREATE_DISTRIBUTION_REQUEST,
  }
}
const createDistributionSuccess = distribution => {
  return {
    type: CREATE_DISTRIBUTION_SUCCESS,
    payload: distribution
  }
}
const createDistributionFailure = error => {
  return {
    type: CREATE_DISTRIBUTION_FAILURE,
    payload: error
  }
}
const createDistribution = distribution => {
  return dispatch => {
    dispatch(createDistributionRequest());
    axios
      .post(`${serverBaseURL()}/products/distribution/create-distribution`, distribution, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(rs => {
        if (rs.data.data)  dispatch(createDistributionSuccess(rs.data.data));
        if (rs.data.error) dispatch(createDistributionFailure(rs.data.error));
      })
      .catch(error => dispatch(createDistributionFailure(error)));
  }
}

const updateDistributionRequest = () => {
  return {
    type: UPDATE_DISTRIBUTION_REQUEST,
  }
}
const updateDistributionSuccess = distribution => {
  return {
    type: UPDATE_DISTRIBUTION_SUCCESS,
    payload: distribution
  }
}
const updateDistributionFailure = error => {
  return {
    type: UPDATE_DISTRIBUTION_FAILURE,
    payload: error
  }
}
const updateDistribution = distribution => {
  return dispatch => {
    dispatch(updateDistributionRequest());
    axios
      .post(`${serverBaseURL()}/products/distribution/update-distribution`, distribution, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(rs => {
        if (rs.data.data)  dispatch(updateDistributionSuccess(rs.data.data));
        if (rs.data.error) dispatch(updateDistributionFailure(rs.data.error));
      })
      .catch(error => dispatch(updateDistributionFailure(error)));
  }
}

const deleteDistributionsRequest = () => {
  return {
    type: DELETE_DISTRIBUTIONS_REQUEST,
  }
}
const deleteDistributionsSuccess = distributions => {
  return {
    type: DELETE_DISTRIBUTIONS_SUCCESS,
    payload: distributions
  }
}
const deleteDistributionsFailure = error => {
  return {
    type: DELETE_DISTRIBUTIONS_FAILURE,
    payload: error
  }
}
const deleteDistributions = distributions => {
  return dispatch => {
    dispatch(deleteDistributionsRequest());
    axios
      .post(`${serverBaseURL()}/products/distribution/delete-distribution`, distributions)
      .then(rs => {
        if (rs.data.data)  dispatch(deleteDistributionsSuccess(rs.data.data));
        if (rs.data.error) dispatch(deleteDistributionsFailure(rs.data.error));
      })
      .catch(error => dispatch(deleteDistributionsFailure(error)));
  }
}

const fetchDistributionRequest = () => {
  return {
    type: FETCH_DISTRIBUTION_REQUEST,
  }
}
const fetchDistributionSuccess = distribution => {
  return {
    type: FETCH_DISTRIBUTION_SUCCESS,
    payload: distribution
  }
}
const fetchDistributionFailure = error => {
  return {
    type: FETCH_DISTRIBUTION_FAILURE,
    payload: error
  }
}
const fetchDistribution = parameter => {
  return dispatch => {
    dispatch(fetchDistributionRequest());
    axios
      .get(`${serverBaseURL()}/products/distribution/fetch_one-distribution?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchDistributionSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchDistributionFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchDistributionFailure(error)));
  }
}

const fetchDistributionsRequest = () => {
  return {
    type: FETCH_DISTRIBUTIONS_REQUEST,
  }
}
const fetchDistributionsSuccess = distributions => {
  return {
    type: FETCH_DISTRIBUTIONS_SUCCESS,
    payload: distributions
  }
}
const fetchDistributionsFailure = error => {
  return {
    type: FETCH_DISTRIBUTIONS_FAILURE,
    payload: error
  }
}
const fetchDistributions = () => {
  return dispatch => {
    dispatch(fetchDistributionsRequest());
    axios
      .get(`${serverBaseURL()}/products/distribution/fetch_all-distribution`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchDistributionsSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchDistributionsFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchDistributionsFailure(error)));
  }
}

const createSalemodeRequest = () => {
  return {
    type: CREATE_SALEMODE_REQUEST,
  }
}
const createSalemodeSuccess = salemode => {
  return {
    type: CREATE_SALEMODE_SUCCESS,
    payload: salemode
  }
}
const createSalemodeFailure = error => {
  return {
    type: CREATE_SALEMODE_FAILURE,
    payload: error
  }
}
const createSalemode = salemode => {
  return dispatch => {
    dispatch(createSalemodeRequest());
    axios
      .post(`${serverBaseURL()}/products/salemode/create-salemode`, salemode, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(rs => {
        if (rs.data.data)  dispatch(createSalemodeSuccess(rs.data.data));
        if (rs.data.error) dispatch(createSalemodeFailure(rs.data.error));
      })
      .catch(error => dispatch(createSalemodeFailure(error)));
  }
}

const updateSalemodeRequest = () => {
  return {
    type: UPDATE_SALEMODE_REQUEST,
  }
}
const updateSalemodeSuccess = salemode => {
  return {
    type: UPDATE_SALEMODE_SUCCESS,
    payload: salemode
  }
}
const updateSalemodeFailure = error => {
  return {
    type: UPDATE_SALEMODE_FAILURE,
    payload: error
  }
}
const updateSalemode = salemode => {
  return dispatch => {
    dispatch(updateSalemodeRequest());
    axios
      .post(`${serverBaseURL()}/products/salemode/update-salemode`, salemode, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(rs => {
        if (rs.data.data)  dispatch(updateSalemodeSuccess(rs.data.data));
        if (rs.data.error) dispatch(updateSalemodeFailure(rs.data.error));
      })
      .catch(error => dispatch(updateSalemodeFailure(error)));
  }
}

const deleteSalemodesRequest = () => {
  return {
    type: DELETE_SALEMODES_REQUEST,
  }
}
const deleteSalemodesSuccess = salemodes => {
  return {
    type: DELETE_SALEMODES_SUCCESS,
    payload: salemodes
  }
}
const deleteSalemodesFailure = error => {
  return {
    type: DELETE_SALEMODES_FAILURE,
    payload: error
  }
}
const deleteSalemodes = salemodes => {
  return dispatch => {
    dispatch(deleteSalemodesRequest());
    axios
      .post(`${serverBaseURL()}/products/salemode/delete-salemode`, salemodes)
      .then(rs => {
        if (rs.data.data)  dispatch(deleteSalemodesSuccess(rs.data.data));
        if (rs.data.error) dispatch(deleteSalemodesFailure(rs.data.error));
      })
      .catch(error => dispatch(deleteSalemodesFailure(error)));
  }
}

const fetchSalemodeRequest = () => {
  return {
    type: FETCH_SALEMODE_REQUEST,
  }
}
const fetchSalemodeSuccess = salemode => {
  return {
    type: FETCH_SALEMODE_SUCCESS,
    payload: salemode
  }
}
const fetchSalemodeFailure = error => {
  return {
    type: FETCH_SALEMODE_FAILURE,
    payload: error
  }
}
const fetchSalemode = parameter => {
  return dispatch => {
    dispatch(fetchSalemodeRequest());
    axios
      .get(`${serverBaseURL()}/products/salemode/fetch_one-salemode?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchSalemodeSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchSalemodeFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchSalemodeFailure(error)));
  }
}

const fetchSalemodesRequest = () => {
  return {
    type: FETCH_SALEMODES_REQUEST,
  }
}
const fetchSalemodesSuccess = salemodes => {
  return {
    type: FETCH_SALEMODES_SUCCESS,
    payload: salemodes
  }
}
const fetchSalemodesFailure = error => {
  return {
    type: FETCH_SALEMODES_FAILURE,
    payload: error
  }
}
const fetchSalemodes = () => {
  return dispatch => {
    dispatch(fetchSalemodesRequest());
    axios
      .get(`${serverBaseURL()}/products/salemode/fetch_all-salemode`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchSalemodesSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchSalemodesFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchSalemodesFailure(error)));
  }
}

const createProductcatRequest = () => {
  return {
    type: CREATE_PRODUCTCAT_REQUEST,
  }
}
const createProductcatSuccess = productcat => {
  return {
    type: CREATE_PRODUCTCAT_SUCCESS,
    payload: productcat
  }
}
const createProductcatFailure = error => {
  return {
    type: CREATE_PRODUCTCAT_FAILURE,
    payload: error
  }
}
const createProductcat = productcat => {
  return dispatch => {
    dispatch(createProductcatRequest());
    axios
      .post(`${serverBaseURL()}/products/category/create-category`, productcat, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(rs => {
        if (rs.data.data)  dispatch(createProductcatSuccess(rs.data.data));
        if (rs.data.error) dispatch(createProductcatFailure(rs.data.error));
      })
      .catch(error => dispatch(createProductcatFailure(error)));
  }
}

const updateProductcatRequest = () => {
  return {
    type: UPDATE_PRODUCTCAT_REQUEST,
  }
}
const updateProductcatSuccess = productcat => {
  return {
    type: UPDATE_PRODUCTCAT_SUCCESS,
    payload: productcat
  }
}
const updateProductcatFailure = error => {
  return {
    type: UPDATE_PRODUCTCAT_FAILURE,
    payload: error
  }
}
const updateProductcat = productcat => {
  return dispatch => {
    dispatch(updateProductcatRequest());
    axios
      .post(`${serverBaseURL()}/products/category/update-category`, productcat, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(rs => {
        if (rs.data.data)  dispatch(updateProductcatSuccess(rs.data.data));
        if (rs.data.error) dispatch(updateProductcatFailure(rs.data.error));
      })
      .catch(error => dispatch(updateProductcatFailure(error)));
  }
}

const deleteProductcatsRequest = () => {
  return {
    type: DELETE_PRODUCTCATS_REQUEST,
  }
}
const deleteProductcatsSuccess = productcats => {
  return {
    type: DELETE_PRODUCTCATS_SUCCESS,
    payload: productcats
  }
}
const deleteProductcatsFailure = error => {
  return {
    type: DELETE_PRODUCTCATS_FAILURE,
    payload: error
  }
}
const deleteProductcats = productcats => {
  return dispatch => {
    dispatch(deleteProductcatsRequest());
    axios
      .post(`${serverBaseURL()}/products/category/delete-category`, productcats)
      .then(rs => {
        if (rs.data.data)  dispatch(deleteProductcatsSuccess(rs.data.data));
        if (rs.data.error) dispatch(deleteProductcatsFailure(rs.data.error));
      })
      .catch(error => dispatch(deleteProductcatsFailure(error)));
  }
}

const fetchProductcatRequest = () => {
  return {
    type: FETCH_PRODUCTCAT_REQUEST,
  }
}
const fetchProductcatSuccess = productcat => {
  return {
    type: FETCH_PRODUCTCAT_SUCCESS,
    payload: productcat
  }
}
const fetchProductcatFailure = error => {
  return {
    type: FETCH_PRODUCTCAT_FAILURE,
    payload: error
  }
}
const fetchProductcat = parameter => {
  return dispatch => {
    dispatch(fetchProductcatRequest());
    axios
      .get(`${serverBaseURL()}/products/category/fetch_one-category?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchProductcatSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchProductcatFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchProductcatFailure(error)));
  }
}

const fetchProductcatsRequest = () => {
  return {
    type: FETCH_PRODUCTCATS_REQUEST,
  }
}
const fetchProductcatsSuccess = productcats => {
  return {
    type: FETCH_PRODUCTCATS_SUCCESS,
    payload: productcats
  }
}
const fetchProductcatsFailure = error => {
  return {
    type: FETCH_PRODUCTCATS_FAILURE,
    payload: error
  }
}
const fetchProductcats = () => {
  return dispatch => {
    dispatch(fetchProductcatsRequest());
    axios
      .get(`${serverBaseURL()}/products/category/fetch_all-category`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchProductcatsSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchProductcatsFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchProductcatsFailure(error)));
  }
}

const createProductsubcatRequest = () => {
  return {
    type: CREATE_PRODUCTSUBCAT_REQUEST,
  }
}
const createProductsubcatSuccess = productsubcat => {
  return {
    type: CREATE_PRODUCTSUBCAT_SUCCESS,
    payload: productsubcat
  }
}
const createProductsubcatFailure = error => {
  return {
    type: CREATE_PRODUCTSUBCAT_FAILURE,
    payload: error
  }
}
const createProductsubcat = productsubcat => {
  return dispatch => {
    dispatch(createProductsubcatRequest());
    axios
      .post(`${serverBaseURL()}/products/subcategory/create-subcategory`, productsubcat, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(rs => {
        if (rs.data.data)  dispatch(createProductsubcatSuccess(rs.data.data));
        if (rs.data.error) dispatch(createProductsubcatFailure(rs.data.error));
      })
      .catch(error => dispatch(createProductsubcatFailure(error)));
  }
}

const updateProductsubcatRequest = () => {
  return {
    type: UPDATE_PRODUCTSUBCAT_REQUEST,
  }
}
const updateProductsubcatSuccess = productsubcat => {
  return {
    type: UPDATE_PRODUCTSUBCAT_SUCCESS,
    payload: productsubcat
  }
}
const updateProductsubcatFailure = error => {
  return {
    type: UPDATE_PRODUCTSUBCAT_FAILURE,
    payload: error
  }
}
const updateProductsubcat = productsubcat => {
  return dispatch => {
    dispatch(updateProductsubcatRequest());
    axios
      .post(`${serverBaseURL()}/products/subcategory/update-subcategory`, productsubcat, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(rs => {
        if (rs.data.data)  dispatch(updateProductsubcatSuccess(rs.data.data));
        if (rs.data.error) dispatch(updateProductsubcatFailure(rs.data.error));
      })
      .catch(error => dispatch(updateProductsubcatFailure(error)));
  }
}

const deleteProductsubcatsRequest = () => {
  return {
    type: DELETE_PRODUCTSUBCATS_REQUEST,
  }
}
const deleteProductsubcatsSuccess = productsubcats => {
  return {
    type: DELETE_PRODUCTSUBCATS_SUCCESS,
    payload: productsubcats
  }
}
const deleteProductsubcatsFailure = error => {
  return {
    type: DELETE_PRODUCTSUBCATS_FAILURE,
    payload: error
  }
}
const deleteProductsubcats = productsubcats => {
  return dispatch => {
    dispatch(deleteProductsubcatsRequest());
    axios
      .post(`${serverBaseURL()}/products/subcategory/delete-subcategory`, productsubcats)
      .then(rs => {
        if (rs.data.data)  dispatch(deleteProductsubcatsSuccess(rs.data.data));
        if (rs.data.error) dispatch(deleteProductsubcatsFailure(rs.data.error));
      })
      .catch(error => dispatch(deleteProductsubcatsFailure(error)));
  }
}

const fetchProductsubcatRequest = () => {
  return {
    type: FETCH_PRODUCTSUBCAT_REQUEST,
  }
}
const fetchProductsubcatSuccess = productsubcat => {
  return {
    type: FETCH_PRODUCTSUBCAT_SUCCESS,
    payload: productsubcat
  }
}
const fetchProductsubcatFailure = error => {
  return {
    type: FETCH_PRODUCTSUBCAT_FAILURE,
    payload: error
  }
}
const fetchProductsubcat = parameter => {
  return dispatch => {
    dispatch(fetchProductsubcatRequest());
    axios
      .get(`${serverBaseURL()}/products/subcategory/fetch_one-subcategory?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchProductsubcatSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchProductsubcatFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchProductsubcatFailure(error)));
  }
}

const fetchProductsubcatsRequest = () => {
  return {
    type: FETCH_PRODUCTSUBCATS_REQUEST,
  }
}
const fetchProductsubcatsSuccess = productsubcats => {
  return {
    type: FETCH_PRODUCTSUBCATS_SUCCESS,
    payload: productsubcats
  }
}
const fetchProductsubcatsFailure = error => {
  return {
    type: FETCH_PRODUCTSUBCATS_FAILURE,
    payload: error
  }
}
const fetchProductsubcats = () => {
  return dispatch => {
    dispatch(fetchProductsubcatsRequest());
    axios
      .get(`${serverBaseURL()}/products/subcategory/fetch_all-subcategory`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchProductsubcatsSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchProductsubcatsFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchProductsubcatsFailure(error)));
  }
}

const createProductgroupRequest = () => {
  return {
    type: CREATE_PRODUCTGROUP_REQUEST,
  }
}
const createProductgroupSuccess = productgroup => {
  return {
    type: CREATE_PRODUCTGROUP_SUCCESS,
    payload: productgroup
  }
}
const createProductgroupFailure = error => {
  return {
    type: CREATE_PRODUCTGROUP_FAILURE,
    payload: error
  }
}
const createProductgroup = productgroup => {
  return dispatch => {
    dispatch(createProductgroupRequest());
    axios
      .post(`${serverBaseURL()}/products/group/create-group`, productgroup, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(rs => {
        if (rs.data.data)  dispatch(createProductgroupSuccess(rs.data.data));
        if (rs.data.error) dispatch(createProductgroupFailure(rs.data.error));
      })
      .catch(error => dispatch(createProductgroupFailure(error)));
  }
}

const updateProductgroupRequest = () => {
  return {
    type: UPDATE_PRODUCTGROUP_REQUEST,
  }
}
const updateProductgroupSuccess = productgroup => {
  return {
    type: UPDATE_PRODUCTGROUP_SUCCESS,
    payload: productgroup
  }
}
const updateProductgroupFailure = error => {
  return {
    type: UPDATE_PRODUCTGROUP_FAILURE,
    payload: error
  }
}
const updateProductgroup = productgroup => {
  return dispatch => {
    dispatch(updateProductgroupRequest());
    axios
      .post(`${serverBaseURL()}/products/group/update-group`, productgroup, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(rs => {
        if (rs.data.data)  dispatch(updateProductgroupSuccess(rs.data.data));
        if (rs.data.error) dispatch(updateProductgroupFailure(rs.data.error));
      })
      .catch(error => dispatch(updateProductgroupFailure(error)));
  }
}

const deleteProductgroupsRequest = () => {
  return {
    type: DELETE_PRODUCTGROUPS_REQUEST,
  }
}
const deleteProductgroupsSuccess = productgroups => {
  return {
    type: DELETE_PRODUCTGROUPS_SUCCESS,
    payload: productgroups
  }
}
const deleteProductgroupsFailure = error => {
  return {
    type: DELETE_PRODUCTGROUPS_FAILURE,
    payload: error
  }
}
const deleteProductgroups = productgroups => {
  return dispatch => {
    dispatch(deleteProductgroupsRequest());
    axios
      .post(`${serverBaseURL()}/products/group/delete-group`, productgroups)
      .then(rs => {
        if (rs.data.data)  dispatch(deleteProductgroupsSuccess(rs.data.data));
        if (rs.data.error) dispatch(deleteProductgroupsFailure(rs.data.error));
      })
      .catch(error => dispatch(deleteProductgroupsFailure(error)));
  }
}

const fetchProductgroupRequest = () => {
  return {
    type: FETCH_PRODUCTGROUP_REQUEST,
  }
}
const fetchProductgroupSuccess = productgroup => {
  return {
    type: FETCH_PRODUCTGROUP_SUCCESS,
    payload: productgroup
  }
}
const fetchProductgroupFailure = error => {
  return {
    type: FETCH_PRODUCTGROUP_FAILURE,
    payload: error
  }
}
const fetchProductgroup = parameter => {
  return dispatch => {
    dispatch(fetchProductgroupRequest());
    axios
      .get(`${serverBaseURL()}/products/group/fetch_one-group?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchProductgroupSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchProductgroupFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchProductgroupFailure(error)));
  }
}

const fetchProductgroupsRequest = () => {
  return {
    type: FETCH_PRODUCTGROUPS_REQUEST,
  }
}
const fetchProductgroupsSuccess = productgroups => {
  return {
    type: FETCH_PRODUCTGROUPS_SUCCESS,
    payload: productgroups
  }
}
const fetchProductgroupsFailure = error => {
  return {
    type: FETCH_PRODUCTGROUPS_FAILURE,
    payload: error
  }
}
const fetchProductgroups = () => {
  return dispatch => {
    dispatch(fetchProductgroupsRequest());
    axios
      .get(`${serverBaseURL()}/products/group/fetch_all-group`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchProductgroupsSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchProductgroupsFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchProductgroupsFailure(error)));
  }
}

const createProductRequest = () => {
  return {
    type: CREATE_PRODUCT_REQUEST,
  }
}
const createProductSuccess = product => {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    payload: product
  }
}
const createProductFailure = error => {
  return {
    type: CREATE_PRODUCT_FAILURE,
    payload: error
  }
}
const createProduct = product => {
  return dispatch => {
    dispatch(createProductRequest());
    axios
      .post(`${serverBaseURL()}/products/product/create-product`, product, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(rs => {
        if (rs.data.data)  dispatch(createProductSuccess(rs.data.data));
        if (rs.data.error) dispatch(createProductFailure(rs.data.error));
      })
      .catch(error => dispatch(createProductFailure(error)));
  }
}

const updateProductRequest = () => {
  return {
    type: UPDATE_PRODUCT_REQUEST,
  }
}
const updateProductSuccess = product => {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    payload: product
  }
}
const updateProductFailure = error => {
  return {
    type: UPDATE_PRODUCT_FAILURE,
    payload: error
  }
}
const updateProduct = product => {
  return dispatch => {
    dispatch(updateProductRequest());
    axios
      .post(`${serverBaseURL()}/products/product/update-product`, product, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(rs => {
        if (rs.data.data)  dispatch(updateProductSuccess(rs.data.data));
        if (rs.data.error) dispatch(updateProductFailure(rs.data.error));
      })
      .catch(error => dispatch(updateProductFailure(error)));
  }
}

const deleteProductsRequest = () => {
  return {
    type: DELETE_PRODUCTS_REQUEST,
  }
}
const deleteProductsSuccess = products => {
  return {
    type: DELETE_PRODUCTS_SUCCESS,
    payload: products
  }
}
const deleteProductsFailure = error => {
  return {
    type: DELETE_PRODUCTS_FAILURE,
    payload: error
  }
}
const deleteProducts = products => {
  return dispatch => {
    dispatch(deleteProductsRequest());
    axios
      .post(`${serverBaseURL()}/products/product/delete-product`, products)
      .then(rs => {
        if (rs.data.data)  dispatch(deleteProductsSuccess(rs.data.data));
        if (rs.data.error) dispatch(deleteProductsFailure(rs.data.error));
      })
      .catch(error => dispatch(deleteProductsFailure(error)));
  }
}

const fetchProductRequest = () => {
  return {
    type: FETCH_PRODUCT_REQUEST,
  }
}
const fetchProductSuccess = product => {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: product
  }
}
const fetchProductFailure = error => {
  return {
    type: FETCH_PRODUCT_FAILURE,
    payload: error
  }
}
const fetchProduct = parameter => {
  return dispatch => {
    dispatch(fetchProductRequest());
    axios
      .get(`${serverBaseURL()}/products/product/fetch_one-product?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchProductSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchProductFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchProductFailure(error)));
  }
}

const fetchProductsRequest = () => {
  return {
    type: FETCH_PRODUCTS_REQUEST,
  }
}
const fetchProductsSuccess = products => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
  }
}
const fetchProductsFailure = error => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error
  }
}
const fetchProducts = () => {
  return dispatch => {
    dispatch(fetchProductsRequest());
    axios
      .get(`${serverBaseURL()}/products/product/fetch_all-product`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchProductsSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchProductsFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchProductsFailure(error)));
  }
}

export {
  createCatalogue, updateCatalogue, deleteCatalogues, fetchCatalogue, fetchCatalogues, 
  createDistribution, updateDistribution, deleteDistributions, fetchDistribution, fetchDistributions, 
  createSalemode, updateSalemode, deleteSalemodes, fetchSalemode, fetchSalemodes, 
  createProductcat, updateProductcat, deleteProductcats, fetchProductcat, fetchProductcats, 
  createProductsubcat, updateProductsubcat, deleteProductsubcats, fetchProductsubcat, fetchProductsubcats, 
  createProductgroup, updateProductgroup, deleteProductgroups, fetchProductgroup, fetchProductgroups, 
  createProduct, updateProduct, deleteProducts, fetchProduct, fetchProducts
}