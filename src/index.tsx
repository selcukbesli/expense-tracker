import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "antd/dist/antd.css";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import rootReducer from "./store";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
