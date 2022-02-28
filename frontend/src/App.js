import './App.css';
import { useEffect, useState } from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

import Home from './Home';

import ProductDetails from './component/ProductDetails';
import AllProducts from './component/AllProducts';
import Search from './component/layout/Search';
import store from "./store"
import { loadUser } from './actions/userAction';
import UpdateProfile from './component/UpdateProfile';
import { useDispatch, useSelector } from 'react-redux';
import Shortcut from "./component/layout/Shortcut"
import Profile from './component/Profile';
import UpdatePassword from './component/UpdatePassword';
import Cart from './component/Cart';
import Shipping from './component/Shipping';
import ConfirmOrder from './component/ConfirmOrder';
import axios from 'axios';
import Payment from './component/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/OrderSuccess';
import SuccessAnimation from './component/layout/SuccessAnimation';

function App() {
  // const dispatch = useDispatch();


  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  
  }
  useEffect(() => {
  
    store.dispatch(loadUser())
    getStripeApiKey();
  }, [])
  
  return (
<><Router>
 
 <Routes>
   <Route exact path="/" element={<Home/>}  />
   <Route path="/product/:id" element={<ProductDetails/>}  />
   <Route path="/products" element={<AllProducts/>}  />
   <Route path="/account" element={<Profile/>}  />
   <Route path="/me/update" element={<UpdateProfile/>}  />
   <Route path="/password/update" element={<UpdatePassword/>}  />
   <Route path="/cart" element={<Cart/>}  />
   <Route path="/shipping" element={<Shipping/>}  />
   <Route path="/order/confirm" element={<ConfirmOrder/>}  />

   <Route path="/success" element={<SuccessAnimation/>}  />


<Route path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>}  />





 </Routes>
</Router></>


   
  
  );
}

export default App;
