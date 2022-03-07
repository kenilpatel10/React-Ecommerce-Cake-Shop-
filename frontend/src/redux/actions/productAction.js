import axios from "axios"
import { ALL_PRODUCT_FAIL ,DELETE_PRODUCT_RESET, DELETE_PRODUCT_FAIL,DELETE_PRODUCT_REQUEST,DELETE_PRODUCT_SUCCESS ,NEW_PRODUCT_REQUEST,NEW_PRODUCT_SUCCESS ,CLEAR_ERRORS,ADMIN_PRODUCT_FAIL,ADMIN_PRODUCT_REQUEST,ADMIN_PRODUCT_SUCCESS,LOGOUT_SUCCESS, LOGOUT_FAIL,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL, NEW_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL } from "../constants/productConstatnts"

export const getProduct = (page = 1, price=[0,5000],category,search)=> async(dispatch)=>{
    try {
        dispatch({type: ALL_PRODUCT_REQUEST})
        let link = `/api/v1/products?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

            if (category) {
              link = `/api/v1/products?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
            }
            if (search) {
                link = `/api/v1/products?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&name=${search}`;
              }

        const{data} = await axios.get(link)
        setTimeout(() => {
            dispatch({
                type: ALL_PRODUCT_SUCCESS,  
                payload:data,
            })
        },2000);
       
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
        
    }
}
// export const getSearchProduct = (keyword = "")=> async(dispatch)=>{
//     try {
//         dispatch({type: ALL_PRODUCT_REQUEST})

//         const{data} = await axios.get(`/api/v1/products?keyword=${keyword}`)
//         setTimeout(() => {
//             dispatch({
//                 type: ALL_PRODUCT_SUCCESS,
//                 payload:data,
//             })
//         },2000);
       
//     } catch (error) {
//         dispatch({
//             type: ALL_PRODUCT_FAIL,
//             payload: error.response.data.message,
//         })
        
//     }
// }
export const clearErrors = ()=> async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}
export const newProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        `/api/v1/admin/product/new`,
        productData,
        config
      );
  
      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const updateProduct = (id , productData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(
        `/api/v1/admin/product/${id}`,
        productData,
        config
      );
  
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
  
      const { data } = await axios.delete(
        `/api/v1/admin/product/${id}`,
       
      );
  
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
export const getProductDetails = (id)=> async(dispatch)=>{
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const{data} = await axios.get(`/api/v1/product/${id}`)
        setTimeout(() => {
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload:data,
            })
        }, 4000);
       
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        })
        
    }
}
export const getAdminProduct = () => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_PRODUCT_REQUEST });
  
      const { data } = await axios.get("/api/v1/admin/products");
  
      dispatch({
        type: ADMIN_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  

