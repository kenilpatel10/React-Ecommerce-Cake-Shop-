import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { newProductReducer, productDetailsReducer, productReducer, productsReducer } from "./redux/reducers/productReducer";
import { profileReducer, userReducer, allUsersReducer, forgotPasswordReducer } from "./redux/reducers/userReducer";
import { cartReducer } from "./redux/reducers/cartReducer";
import { myOrdersReducer, newOrderReducer, orderDetailReducer, orderReducer } from "./redux/reducers/orderReducer";

const reducer = combineReducers({
    products:productsReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    newProduct:newProductReducer,
    product:productReducer,
    order:orderReducer,
    allUsers:allUsersReducer,
    orderDetail:orderDetailReducer,
    forgotPassword: forgotPasswordReducer
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