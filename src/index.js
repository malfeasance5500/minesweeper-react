import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import App from "./components/App";
import reducers from "./reducers";

// set up the redux store to be used in the application
const store = createStore(reducers, composeWithDevTools(applyMiddleware()));

ReactDOM.render(
  // set up the application to have access to the store
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
