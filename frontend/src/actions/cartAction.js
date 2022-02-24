import {
    ADD_TO_CART,
    REMOVE_PRODUCT_CART
  } from "../constants/cartConstants";
  import axios from "axios";
  
  // Add to Cart
  export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
  
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        quantity,
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };

  export const removeItemsFromCart = (id, quantity) => async (dispatch, getState) => {
    
  
    dispatch({
      type: REMOVE_PRODUCT_CART,
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };