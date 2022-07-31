import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {createStore} from "redux";
import rootReducer from "./reducers";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(rootReducer);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
