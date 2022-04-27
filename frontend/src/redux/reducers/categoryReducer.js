import {
    CREATE_CATEGORY_FAIL,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_REQUEST,
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,
   REMOVE_CATEGORY_REQUEST,
   REMOVE_CATEGORY_SUCCESS,
   REMOVE_CATEGORY_FAIL,
  } from "../constants/categoryConstants";
  import { CLEAR_ERRORS } from "../constants/productConstatnts";
  
  export const newCategoryReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_CATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case CREATE_CATEGORY_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          category: action.payload,
        };
  
      case CREATE_CATEGORY_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  export const myCategoriesReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
    
      case ALL_CATEGORY_REQUEST:
        return {
          loading: true,
          categories: [],
        };
  
   
      case ALL_CATEGORY_SUCCESS:
        return {
          loading: false,
          categories: action.payload.categories,
        };
  

      case ALL_CATEGORY_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  export const orderReducer = (state = {}, action) => {
    switch (action.type) {
      case REMOVE_CATEGORY_REQUEST:

        return {
          loading: true,
          ...state,
        };
      case REMOVE_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
   
  
      case REMOVE_CATEGORY_FAIL:

        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
    //  case DELETE_ORDER_RESET:
    //     return {
    //       isDeleted: false,
    //     };
   
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
 