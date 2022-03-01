import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Image from "../src/component/img/back1.jpg";
import {Provider} from "react-redux"
import store from "./store"
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";


const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

ReactDOM.render(
  <div style={{    backgroundImage: `url(${Image})`,
  height: "100%",
  minHeight: "100vh",
  backgroundPosition: "center",
  backgroundRepeat: "norepeat",
  backgroundSize: "cover",}}>
<Provider store={store}>
<AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
  </div>
  ,
  document.getElementById('root')
);

