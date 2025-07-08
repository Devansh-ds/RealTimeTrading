import { GET_ALL_COINS_FAILURE, GET_ALL_COINS_SUCCESS, GET_COIN_BY_ID } from "./ActionType.js";

const initialValue = {
  disCoins: null,
  currCoin: null
};

export const allCoinsReducer = (store = initialValue, { type, payload }) => {
  if (type == GET_ALL_COINS_SUCCESS) {
    return { ...store, disCoins: payload };
  } else if (type == GET_ALL_COINS_FAILURE) {
    return { ...store, disCoins: { error: payload } };
  } else if (type == GET_COIN_BY_ID) {
    return {...store, currCoin: payload};
  }
  return store;
};
