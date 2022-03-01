import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./redux/reducers/productReducer";
import { profileReducer, userReducer } from "./redux/reducers/userReducer";
import { cartReducer } from "./redux/reducers/cartReducer";
import { myOrdersReducer, newOrderReducer } from "./redux/reducers/orderReducer";

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile:profileReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer
});

let initialState={
    cart:{
        cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        :[],
            shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            :{},
    }
};

const middleware = [thunk];

const store = createStore(
    reducer, initialState,composeWithDevTools(applyMiddleware(...middleware))
);

export default store;