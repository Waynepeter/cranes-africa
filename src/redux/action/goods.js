
import axios from 'axios';
import {
  FETCH_GOODS_CATEGORY_REQUEST, FETCH_GOODS_CATEGORY_SUCCESS, FETCH_GOODS_CATEGORY_FAILURE,
  FETCH_GOODS_CATEGORIES_REQUEST, FETCH_GOODS_CATEGORIES_SUCCESS, FETCH_GOODS_CATEGORIES_FAILURE,
  FETCH_GOODS_SUB_CATEGORY_REQUEST, FETCH_GOODS_SUB_CATEGORY_SUCCESS, FETCH_GOODS_SUB_CATEGORY_FAILURE,
  SAVE_BOOKING_REQUEST, SAVE_BOOKING_SUCCESS, SAVE_BOOKING_FAILURE, FETCH_ITEM_REQUEST, FETCH_ITEM_SUCCESS, 
  FETCH_ITEM_FAILURE, SEND_ORDER_REQUEST, SEND_ORDER_SUCCESS, SEND_ORDER_FAILURE, FETCH_ORDER_REQUEST, 
  FETCH_ORDER_SUCCESS, FETCH_ORDER_FAILURE, FETCH_GOODS_SUB_CATEGORIES_REQUEST, FETCH_GOODS_SUB_CATEGORIES_SUCCESS, 
  FETCH_GOODS_SUB_CATEGORIES_FAILURE, TRACK_ORDER_REQUEST, TRACK_ORDER_SUCCESS, TRACK_ORDER_FAILURE
} from '../type';


const fetchGoodsCategoryRequest = () => {
  return {
    type: FETCH_GOODS_CATEGORY_REQUEST,
  }
}

const fetchGoodsCategorySuccess = category => {
  return {
    type: FETCH_GOODS_CATEGORY_SUCCESS,
    payload: category
  }
}

const fetchGoodsCategoryFailure = error => {
  return {
    type: FETCH_GOODS_CATEGORY_FAILURE,
    payload: error
  }
}

const fetchGoodsCategory = parameter => {
  return dispatch => {
    dispatch(fetchGoodsCategoryRequest());
    axios
      .get(`${window.baseURL}/products/goods/view_one-category?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchGoodsCategorySuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchGoodsCategoryFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchGoodsCategoryFailure(error)));
  }
}


const fetchGoodsCategoriesRequest = () => {
  return {
    type: FETCH_GOODS_CATEGORIES_REQUEST,
  }
}

const fetchGoodsCategoriesSuccess = categories => {
  return {
    type: FETCH_GOODS_CATEGORIES_SUCCESS,
    payload: categories
  }
}

const fetchGoodsCategoriesFailure = error => {
  return {
    type: FETCH_GOODS_CATEGORIES_FAILURE,
    payload: error
  }
}

const fetchGoodsCategories = () => {
  return dispatch => {
    dispatch(fetchGoodsCategoriesRequest());
    axios
      .get(`${window.baseURL}/products/goods/view_all-category`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchGoodsCategoriesSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchGoodsCategoriesFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchGoodsCategoriesFailure(error)));
  }
}


const fetchGoodsSubCategoryRequest = () => {
  return {
    type: FETCH_GOODS_SUB_CATEGORY_REQUEST,
  }
}

const fetchGoodsSubCategorySuccess = subcategory => {
  return {
    type: FETCH_GOODS_SUB_CATEGORY_SUCCESS,
    payload: subcategory
  }
}

const fetchGoodsSubCategoryFailure = error => {
  return {
    type: FETCH_GOODS_SUB_CATEGORY_FAILURE,
    payload: error
  }
}

const fetchGoodsSubCategory = parameter => {
  return dispatch => {
    dispatch(fetchGoodsSubCategoryRequest());
    axios
      .get(`${window.baseURL}/products/goods/view_one-sub_category?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchGoodsSubCategorySuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchGoodsSubCategoryFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchGoodsSubCategoryFailure(error)));
  }
}


const fetchGoodsSubCategoriesRequest = () => {
  return {
    type: FETCH_GOODS_SUB_CATEGORIES_REQUEST,
  }
}

const fetchGoodsSubCategoriesSuccess = subcategories => {
  return {
    type: FETCH_GOODS_SUB_CATEGORIES_SUCCESS,
    payload: subcategories
  }
}

const fetchGoodsSubCategoriesFailure = error => {
  return {
    type: FETCH_GOODS_SUB_CATEGORIES_FAILURE,
    payload: error
  }
}

const fetchGoodsSubCategories = () => {
  return dispatch => {
    dispatch(fetchGoodsSubCategoriesRequest());
    axios
      .get(`${window.baseURL}/products/goods/view_all-sub_category`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchGoodsSubCategoriesSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchGoodsSubCategoriesFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchGoodsSubCategoriesFailure(error)));
  }
}


const saveBookingRequest = () => {
  return {
    type: SAVE_BOOKING_REQUEST,
  }
}

const saveBookingSuccess = saveBooking => {
  return {
    type: SAVE_BOOKING_SUCCESS,
    payload: saveBooking
  }
}

const saveBookingFailure = error => {
  return {
    type: SAVE_BOOKING_FAILURE,
    payload: error
  }
}

const saveBooking = bookingData => {
  return dispatch => {
    dispatch(saveBookingRequest());
    axios
      .post(`${window.baseURL}/media/appointment/booking-appointment`, bookingData)
      .then(rs => {
        if (rs.data.data)  dispatch(saveBookingSuccess(rs.data.data));
        if (rs.data.error) dispatch(saveBookingFailure(rs.data.error));
      })
      .catch(error => dispatch(saveBookingFailure(error)));
  }
}


const fetchItemRequest = () => {
  return {
    type: FETCH_ITEM_REQUEST,
  }
}

const fetchItemSuccess = saveBooking => {
  return {
    type: FETCH_ITEM_SUCCESS,
    payload: saveBooking
  }
}

const fetchItemFailure = error => {
  return {
    type: FETCH_ITEM_FAILURE,
    payload: error
  }
}

const fetchItem = parameter => {
  return dispatch => {
    dispatch(fetchItemRequest());
    axios
      .get(`${window.baseURL}/products/goods/view_one-item?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchItemSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchItemFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchItemFailure(error)));
  }
}


const sendOrderRequest = () => {
  return {
    type: SEND_ORDER_REQUEST,
  }
}

const sendOrderSuccess = order => {
  return {
    type: SEND_ORDER_SUCCESS,
    payload: order
  }
}

const sendOrderFailure = error => {
  return {
    type: SEND_ORDER_FAILURE,
    payload: error
  }
}

const sendOrder = orderData => {
  return dispatch => {
    dispatch(sendOrderRequest());
    axios
      .post(`${window.baseURL}/products/orders/create-order`, orderData)
      .then(rs => {
        if (rs.data.data)  dispatch(sendOrderSuccess(rs.data.data));
        if (rs.data.error) dispatch(sendOrderFailure(rs.data.error));
      })
      .catch(error => dispatch(sendOrderFailure(error)));
  }
}


const fetchOrderRequest = () => {
  return {
    type: FETCH_ORDER_REQUEST,
  }
}

const fetchOrderSuccess = order => {
  return {
    type: FETCH_ORDER_SUCCESS,
    payload: order
  }
}

const fetchOrderFailure = error => {
  return {
    type: FETCH_ORDER_FAILURE,
    payload: error
  }
}

const fetchOrder = parameter => {
  return dispatch => {
    dispatch(fetchOrderRequest());
    axios
      .get(`${window.baseURL}/products/orders/view_one-order?parameter=${parameter}`)
      .then(rs => {
        if (rs.data.data)  dispatch(fetchOrderSuccess(rs.data.data));
        if (rs.data.error) dispatch(fetchOrderFailure(rs.data.error));
      })
      .catch(error => dispatch(fetchOrderFailure(error)));
  }
}


const trackOrderRequest = () => {
  return {
    type: TRACK_ORDER_REQUEST,
  }
}

const trackOrderSuccess = trackOrder => {
  return {
    type: TRACK_ORDER_SUCCESS,
    payload: trackOrder
  }
}

const trackOrderFailure = error => {
  return {
    type: TRACK_ORDER_FAILURE,
    payload: error
  }
}

const trackOrder = trackData => {
  return dispatch => {
    dispatch(trackOrderRequest());
    axios
      .post(`${window.baseURL}/products/orders/track-order`, trackData)
      .then(rs => {
        if (rs.data.data)  dispatch(trackOrderSuccess(rs.data.data));
        if (rs.data.error) dispatch(trackOrderFailure(rs.data.error));
      })
      .catch(error => dispatch(trackOrderFailure(error)));
  }
}


export {
  fetchGoodsCategory, fetchGoodsCategories, fetchGoodsSubCategory, fetchGoodsSubCategories, 
  saveBooking, fetchItem, sendOrder, fetchOrder, trackOrder
}