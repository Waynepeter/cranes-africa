
import {
  FETCH_GOODS_CATEGORY_REQUEST, FETCH_GOODS_CATEGORY_SUCCESS, FETCH_GOODS_CATEGORY_FAILURE,
  FETCH_GOODS_CATEGORIES_REQUEST, FETCH_GOODS_CATEGORIES_SUCCESS, FETCH_GOODS_CATEGORIES_FAILURE,
  FETCH_GOODS_SUB_CATEGORY_REQUEST, FETCH_GOODS_SUB_CATEGORY_SUCCESS, FETCH_GOODS_SUB_CATEGORY_FAILURE,
  SAVE_BOOKING_REQUEST, SAVE_BOOKING_SUCCESS, SAVE_BOOKING_FAILURE, FETCH_ITEM_REQUEST, FETCH_ITEM_SUCCESS, 
  FETCH_ITEM_FAILURE, SEND_ORDER_REQUEST, SEND_ORDER_SUCCESS, SEND_ORDER_FAILURE, FETCH_ORDER_REQUEST, 
  FETCH_ORDER_SUCCESS, FETCH_ORDER_FAILURE, FETCH_GOODS_SUB_CATEGORIES_REQUEST, FETCH_GOODS_SUB_CATEGORIES_SUCCESS, 
  FETCH_GOODS_SUB_CATEGORIES_FAILURE, TRACK_ORDER_REQUEST, TRACK_ORDER_SUCCESS, TRACK_ORDER_FAILURE
} from '../type';
import {
  initGoodsCategory, initGoodsCategories, initGoodsSubCategory, initGoodsSubCategories, initSaveBooking, 
  initFetchItem, initSendOrder, initFetchOrder, initTrackOrder
} from '../state';

const goodsCategoryReducer = (state = initGoodsCategory, action) => {
  switch (action.type) {
    case FETCH_GOODS_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_GOODS_CATEGORY_SUCCESS:
      return {
        loading: false,
        goodsCategory: action.payload,
        error: null
      }
    case FETCH_GOODS_CATEGORY_FAILURE:
      return {
        loading: false,
        goodsCategory: {},
        error: action.payload
      }
    default:
      return state
  }
}

const goodsCategoriesReducer = (state = initGoodsCategories, action) => {
  switch (action.type) {
    case FETCH_GOODS_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_GOODS_CATEGORIES_SUCCESS:
      return {
        loading: false,
        goodsCategories: action.payload,
        error: null
      }
    case FETCH_GOODS_CATEGORIES_FAILURE:
      return {
        loading: false,
        goodsCategories: [],
        error: action.payload
      }
    default:
      return state
  }
}

const goodsSubCategoryReducer = (state = initGoodsSubCategory, action) => {
  switch (action.type) {
    case FETCH_GOODS_SUB_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_GOODS_SUB_CATEGORY_SUCCESS:
      return {
        loading: false,
        goodsSubCategory: action.payload,
        error: null
      }
    case FETCH_GOODS_SUB_CATEGORY_FAILURE:
      return {
        loading: false,
        goodsSubCategory: {},
        error: action.payload
      }
    default:
      return state
  }
}

const goodsSubCategoriesReducer = (state = initGoodsSubCategories, action) => {
  switch (action.type) {
    case FETCH_GOODS_SUB_CATEGORIES_REQUEST:
      return {
        ...state, loading: true
      }
    case FETCH_GOODS_SUB_CATEGORIES_SUCCESS:
      return {
        loading: false,
        goodsSubCategories: action.payload,
        error: null
      }
    case FETCH_GOODS_SUB_CATEGORIES_FAILURE:
      return {
        loading: false,
        goodsSubCategories: [],
        error: action.payload
      }
    default:
      return state
  }
}

const saveBookingReducer = (state = initSaveBooking, action) => {
  switch (action.type) {
    case SAVE_BOOKING_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SAVE_BOOKING_SUCCESS:
      return {
        loading: false,
        saveBooking: action.payload,
        error: null
      }
    case SAVE_BOOKING_FAILURE:
      return {
        loading: false,
        saveBooking: {},
        error: action.payload
      }
    default:
      return state
  }
}

const fetchItemReducer = (state = initFetchItem, action) => {
  switch (action.type) {
    case FETCH_ITEM_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_ITEM_SUCCESS:
      return {
        loading: false,
        fetchItem: action.payload,
        error: null
      }
    case FETCH_ITEM_FAILURE:
      return {
        loading: false,
        fetchItem: {},
        error: action.payload
      }
    default:
      return state
  }
}

const sendOrderReducer = (state = initSendOrder, action) => {
  switch (action.type) {
    case SEND_ORDER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SEND_ORDER_SUCCESS:
      return {
        loading: false,
        sendOrder: action.payload,
        error: null
      }
    case SEND_ORDER_FAILURE:
      return {
        loading: false,
        sendOrder: {},
        error: action.payload
      }
    default:
      return state
  }
}

const fetchOrderReducer = (state = initFetchOrder, action) => {
  switch (action.type) {
    case FETCH_ORDER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_ORDER_SUCCESS:
      return {
        loading: false,
        fetchOrder: action.payload,
        error: null
      }
    case FETCH_ORDER_FAILURE:
      return {
        loading: false,
        fetchOrder: {},
        error: action.payload
      }
    default:
      return state
  }
}

const trackOrderReducer = (state = initTrackOrder, action) => {
  switch (action.type) {
    case TRACK_ORDER_REQUEST:
      return {
        ...state, loading: true
      }
    case TRACK_ORDER_SUCCESS:
      return {
        loading: false,
        trackOrder: action.payload,
        error: null
      }
    case TRACK_ORDER_FAILURE:
      return {
        loading: false,
        trackOrder: {},
        error: action.payload
      }
    default:
      return state
  }
}

export {
  goodsCategoryReducer, goodsCategoriesReducer, goodsSubCategoryReducer, goodsSubCategoriesReducer, 
  saveBookingReducer, fetchItemReducer, sendOrderReducer, fetchOrderReducer, trackOrderReducer
}

