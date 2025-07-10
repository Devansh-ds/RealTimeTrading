import { GET_USER_WATCHLIST, ADD_REMOVE_COIN_IN_WATCHLIST } from "./ActionType";

const initialValue = {
  coins: null,
};

export const watchlistReducer = (store = initialValue, { type, payload }) => {
  if (type == GET_USER_WATCHLIST) {
    console.log("reducer js, " + payload)
    return { ...store, coins: payload.coin };
  } else if (type == ADD_REMOVE_COIN_IN_WATCHLIST) {
    return { ...store, coins: payload.coin };
  }
  return store;
};
