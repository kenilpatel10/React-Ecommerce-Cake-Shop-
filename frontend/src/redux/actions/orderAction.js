import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CLEAR_ERRORS,
  MY_ORDER_SUCCESS,MY_ORDER_REQUEST,MY_ORDER_FAIL
} from "../constants/orderConstants";

import axios from "axios";



export const createOrder = (order) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_ORDER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/v1/order/new", order, config);

      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });

    const { data } = await axios.get("/api/v1/orders/me");
console.log("kai b",data.orders)
    dispatch({ type: MY_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

