import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";

import ProductDetails from "./component/product/ProductDetails";
import AllProducts from "./component/product/AllProducts";
import store from "./store";
import { loadUser } from "./redux/actions/userAction";
import UpdateProfile from "./component/user/UpdateProfile";
import { useSelector } from "react-redux";
import Shortcut from "./component/layout/Shortcut";
import Profile from "./component/user/Profile";
import UpdatePassword from "./component/user/UpdatePassword";
import Cart from "./component/cart/Cart";
import Shipping from "./component/cart/Shipping";
import ConfirmOrder from "./component/cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SuccessOrder from "./component/cart/SuccessOrder";
import MyOrders from "./component/order/MyOrders";
import DashBoard from "./component/Admin/DashBoard";
import AdminProducts from "./component/Admin/AdminProducts";
import AddProduct from "./component/Admin/AddProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import AllUsers from "./component/Admin/AllUsers";
import AdminOrders from "./component/Admin/AdminOrders";
import OrderDetails from "./component/order/OrderDetails";
import AdminOrderDetails from "./component/Admin/AdminOrderDetails";
import AboutUs from "./component/layout/AboutUs";
import ContactUs from "./component/layout/ContactUs";
import ForgotPassword from "./component/user/ForgotPassword";
import ResetPassword from "./component/user/ResetPassword";
import Delivery from "./component/cart/Delivery"
import AddCategory from "./component/Admin/AddCategory";
import AllCategories from "./component/Admin/AllCategories";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <>
      <Router>
        {isAuthenticated && <Shortcut user={user} />}

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/forgot" element={<ForgotPassword/>} />
          <Route path="/password/reset/:token" element={<ResetPassword/>} />
          <Route path="/aboutus" element={<AboutUs/>} />
          <Route path="/contactus" element={<ContactUs/>} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/account"  element = {isAuthenticated ? <Profile / > : <Home />}/>
          <Route path="/me/update" element={isAuthenticated ? <UpdateProfile /> : <Home/>} />
          <Route path="/password/update" element={isAuthenticated ?<UpdatePassword /> : <Home/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/delivery" element = {isAuthenticated ? <Delivery/> : <Home />} />
          <Route path="/shipping" element = {isAuthenticated ? <Shipping/> : <Home />} />
          <Route path="/order/confirm"  element = {isAuthenticated ? <ConfirmOrder/>: <Home />}/>

          <Route path="/success" element = {isAuthenticated ? <SuccessOrder/>: <Home />} />

          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
             {isAuthenticated ? <Payment/>: <Home />}
              </Elements>
            }
          />

          <Route path="/orders" element = {isAuthenticated ? <MyOrders/>: <Home />} />
          <Route path="/order/:id" element = {isAuthenticated ? <OrderDetails/>: <Home />} />

          <Route
            path="/admin/dashboard"
            isAdmin={true}
            element = {isAuthenticated ? <DashBoard/>: <Home />}
          />

          <Route
            path="/admin/products"
            isAdmin={true}
            element = {isAuthenticated ? <AdminProducts/>: <Home />}
          />

          <Route
            path="/admin/product"
            isAdmin={true}
            element = {isAuthenticated ? <AddProduct/>: <Home />}
          />

          <Route
            path="/admin/product/:id"
            isAdmin={true}
            element = {isAuthenticated ? <UpdateProduct/>: <Home />}
          />
          <Route path="/admin/users" isAdmin={true} element = {isAuthenticated ? <AllUsers/>: <Home />} />
          <Route
            path="/admin/orders"
            isAdmin={true}
            element = {isAuthenticated ? <AdminOrders/>: <Home />}
          />
               <Route
            path="/admin/category"
            isAdmin={true}
            element = {isAuthenticated ? <AddCategory/>: <Home />}
          />
                 <Route
            path="/admin/categories"
            isAdmin={true}
            element = {isAuthenticated ? <AllCategories/>: <Home />}
          />
           <Route path="/admin/order/:id"  isAdmin={true}  element = {isAuthenticated ? <AdminOrderDetails/>: <Home />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
