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
  } from "../constants/categoryConstant";
  import { CLEAR_ERRORS } from "../constants/productConstatnts";
  
  import axios from "axios";
  
  export const createCategory = (category) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_CATEGORY_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/v1/category", category, config);
  
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_CATEGORY_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  export const allCategories = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_CATEGORY_REQUEST });
  
      const { data } = await axios.get("/api/v1/categories");
  
      dispatch({ type: ALL_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_CATEGORY_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  

  
  export const deleteCategory = (id) => async (dispatch) => {
    try {
      dispatch({ type: REMOVE_CATEGORY_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/category/${id}`);
  
      dispatch({
        type: REMOVE_CATEGORY_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_CATEGORY_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  

  