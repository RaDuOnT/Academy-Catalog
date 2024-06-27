import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers/rootReducer";
import thunkMiddleware from "redux-thunk";
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from "./store/configureStore";
// import persistor from "./store/configureStore";


const storage = store;
const persist = persistor;

window.__APP_STATE__ = undefined;
const initialState = window.__APP_STATE__;


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={storage}>
    <PersistGate loading={null} persistor={persist}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </PersistGate >
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
