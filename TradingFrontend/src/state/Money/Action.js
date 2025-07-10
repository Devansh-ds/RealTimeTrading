import { baseUrl } from "../config";
import { ADD_MONEY, ALL_WITHDRAWALS, WITHDRAW_MONEY } from "./ActionType.js";

export const addMoney = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${baseUrl}/wallet/add?money=${data.money}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${data.token}`
      }
    });

    const resData = await res.json();

    console.log("add money to wallet: ", resData);
    dispatch({ type: ADD_MONEY, payload: resData });
  } catch (error) {
    console.log("add money to wallet (error): ", error);
  }
};

export const withdrawMoney = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${baseUrl}/withdrawal?amount=${data.money}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.token}`
      }
    });

    const resData = await res.json();

    console.log("withdraw money from wallet: ", resData);
    dispatch({ type: WITHDRAW_MONEY, payload: resData });
  } catch (error) {
    console.log("withdraw money from wallet (error): ", error);
  }
};

export const allWithdrawals = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${baseUrl}/withdrawal`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${data.token}`
      }
    });

    const resData = await res.json();

    console.log("all withdrawals from wallet: ", resData);
    dispatch({ type: ALL_WITHDRAWALS, payload: resData });
  } catch (error) {
    console.log("all withdrawals from wallet (error): ", error);
  }
};