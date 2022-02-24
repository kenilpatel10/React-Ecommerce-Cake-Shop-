import './App.css';
import { useEffect } from 'react';
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
function App() {
  // const dispatch = useDispatch();
  useEffect(() => {
  
    store.dispatch(loadUser())
  }, [])
  
  return (
<Router>
 
    <Routes>
      <Route exact path="/" element={<Home/>}  />
      <Route path="/product/:id" element={<ProductDetails/>}  />
      <Route path="/products" element={<AllProducts/>}  />
      <Route path="/account" element={<Profile/>}  />
      <Route path="/me/update" element={<UpdateProfile/>}  />
      <Route path="/password/update" element={<UpdatePassword/>}  />
      <Route path="/cart" element={<Cart/>}  />

   
      
    </Routes>
</Router>

   
  
  );
}

export default App;
