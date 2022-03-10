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
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />

          <Route path="/success" element={<SuccessOrder />} />

          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />

          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />

          <Route
            path="/admin/dashboard"
            isAdmin={true}
            element={<DashBoard />}
          />

          <Route
            path="/admin/products"
            isAdmin={true}
            element={<AdminProducts />}
          />

          <Route
            path="/admin/product"
            isAdmin={true}
            element={<AddProduct />}
          />

          <Route
            path="/admin/product/:id"
            isAdmin={true}
            element={<UpdateProduct />}
          />
          <Route path="/admin/users" isAdmin={true} element={<AllUsers />} />
          <Route
            path="/admin/orders"
            isAdmin={true}
            element={<AdminOrders />}
          />
           <Route path="/admin/order/:id"  isAdmin={true}  element={<AdminOrderDetails/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
