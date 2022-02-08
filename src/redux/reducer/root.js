
import { combineReducers } from 'redux';
import {
  organizationReducer, sendContactMessageReducer, sendSubscriptionReducer, fetchFAQCatsReducer,
  fetchTeamReducer
} from './organization';
import {
  goodsCategoryReducer, goodsCategoriesReducer, goodsSubCategoryReducer, goodsSubCategoriesReducer, 
  saveBookingReducer, fetchItemReducer, sendOrderReducer, fetchOrderReducer, trackOrderReducer
} from './goods';

const rootReducer = combineReducers({
  organizationData: organizationReducer,
  goodsCategoryData: goodsCategoryReducer,
  goodsCategoriesData: goodsCategoriesReducer,
  goodsSubCategoryData: goodsSubCategoryReducer,
  goodsSubCategoriesData: goodsSubCategoriesReducer,
  saveBookingData: saveBookingReducer,
  fetchItemData: fetchItemReducer,
  sendOrderData: sendOrderReducer,
  fetchOrderData: fetchOrderReducer,
  sendContactMessageData: sendContactMessageReducer,
  sendSubscriptionData: sendSubscriptionReducer,
  trackOrderData: trackOrderReducer,
  fetchFAQCatsData: fetchFAQCatsReducer,
  fetchTeamData: fetchTeamReducer,
});

export default rootReducer;