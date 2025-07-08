import { thunk } from "redux-thunk";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Auth/Reducer.js";
import { allCoinsReducer } from "./Coin/Reducer.js";

const rootReducer = combineReducers({
  auth: authReducer,
  allCoins: allCoinsReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
