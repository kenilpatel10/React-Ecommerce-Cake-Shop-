import { CREATE_ORDER_FAIL,CREATE_ORDER_SUCCESS,CREATE_ORDER_REQUEST } from "../constants/orderConstants";
import { CLEAR_ERRORS } from "../constants/productConstatnts";


export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case CREATE_ORDER_SUCCESS:
        return {
          loading: false,
          order: action.payload,
        };
  
      case CREATE_ORDER_FAIL:
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