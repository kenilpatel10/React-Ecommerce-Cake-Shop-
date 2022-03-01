import axios from "axios"
import { ALL_PRODUCT_FAIL,CLEAR_ERRORS,LOGOUT_SUCCESS, LOGOUT_FAIL,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL } from "../constants/productConstatnts"

export const getProduct = (page = 1, price=[0,5000])=> async(dispatch)=>{
    try {
        dispatch({type: ALL_PRODUCT_REQUEST})
        let link = `/api/v1/products?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

            // if (category) {
            //   link = `/api/v1/products?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
            // }
  

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




