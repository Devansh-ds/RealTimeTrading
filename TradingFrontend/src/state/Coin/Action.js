import { baseUrl } from "../config.js";
import { GET_ALL_COINS_FAILURE, GET_ALL_COINS_SUCCESS, GET_COIN_BY_ID } from "./ActionType.js";

export const getAllCoins = (data) => async (dispatch) => {
  try {
    console.log(data.sort);
    let url = `${baseUrl}/coins?page=${data.page}&size=${data.size}`;
    if (data?.sort != "") {
      url = url + "&sort=" + data.sort;
    }
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    const resData = await res.json();

    if (!res.ok) {
      dispatch({ type: GET_ALL_COINS_FAILURE, payload: "Error getting coins" });
      return;
    }

    dispatch({ type: GET_ALL_COINS_SUCCESS, payload: resData });
  } catch (error) {
    console.log("get all coins (error): ", error);
    dispatch({ type: GET_ALL_COINS_FAILURE, payload: error });
  }
};

export const getCoinById = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${baseUrl}/coins/details/` + data.id, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    const resData = await res.json();

    dispatch({ type: GET_COIN_BY_ID, payload: resData });
  } catch (error) {
    console.log("get coin by id (error): ", error);
  }
};
