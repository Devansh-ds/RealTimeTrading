import { baseUrl } from "../config.js";
import { ADD_REMOVE_COIN_IN_WATCHLIST, GET_USER_WATCHLIST } from "./ActionType.js";


export const getWatchlist = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${baseUrl}/watchlist`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    const resData = await res.json();

    console.log("get user watchlist: " + resData)
    dispatch({ type: GET_USER_WATCHLIST, payload: resData });
  } catch (error) {
    console.log("get user watchlist (error): ", error);
  }
};

export const addRemoveCoinWatchlist = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${baseUrl}/watchlist/add/coin/` + data.coinId, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        })
        const resData = await res.json();

        console.log("add-remove coin watchlist: ", resData);
        dispatch({type: ADD_REMOVE_COIN_IN_WATCHLIST, payload: resData});
    } catch (error) {
        console.log("add remove coin in watchlist(error): ", error);
    }
}