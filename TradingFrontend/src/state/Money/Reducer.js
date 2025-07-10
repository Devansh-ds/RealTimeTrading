import { tuple } from "zod";
import { ALL_WITHDRAWALS, WITHDRAW_MONEY } from "./ActionType.js";

const initialValue = {
  allWithdrawals: null,
  currentWithdrawal: null,
};

export const withdrawalReducer = (store = initialValue, { type, payload }) => {
  if (type == WITHDRAW_MONEY) {
    return { ...store, currentWithdrawal: payload };
  } else if (type == ALL_WITHDRAWALS) {
    return { ...store, allWithdrawals: payload };
  }
  return store;
};
