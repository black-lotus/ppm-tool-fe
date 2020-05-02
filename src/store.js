import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleWare = [thunk];

let store;

const reactReduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

if (window.navigator.userAgent.includes("Chrome") && reactReduxDevTools) {
  store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleWare), reactReduxDevTools)
  );
} else {
  store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleWare))
  );
}

export default store;
