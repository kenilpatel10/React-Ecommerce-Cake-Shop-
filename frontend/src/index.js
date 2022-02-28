import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Image from "../src/component/img/back1.jpg";
import {Provider} from "react-redux"
import store from "./store"


ReactDOM.render(
  <div style={{    backgroundImage: `url(${Image})`,
  height: "100%",
  minHeight: "100vh",
  backgroundPosition: "center",
  backgroundRepeat: "norepeat",
  backgroundSize: "cover",}}>
<Provider store={store}>
    <App />
  </Provider>
  </div>
  ,
  document.getElementById('root')
);

