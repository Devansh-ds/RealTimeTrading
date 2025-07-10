import { thunk } from "redux-thunk";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Auth/Reducer.js";
import { allCoinsReducer } from "./Coin/Reducer.js";
import { watchlistReducer } from "./Watchlist/Reducer.js";
import { withdrawalReducer } from "./Money/Reducer.js";
import { assetReducer } from "./Asset/Reducer.js";

const rootReducer = combineReducers({
  auth: authReducer,
  allCoins: allCoinsReducer,
  userWatchlist: watchlistReducer,
  withdrawals: withdrawalReducer,
  assets: assetReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
