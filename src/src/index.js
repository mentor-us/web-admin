import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { MaterialUIControllerProvider } from "context/index";

import store from "redux/store";
import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
