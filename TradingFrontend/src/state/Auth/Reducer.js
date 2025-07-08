import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_TWO_STEP_SUCCESS,
  ENABLE_TWO_STEP_AUTH_SUCCESS,
  GET_USER_SUCCESS,
  SEND_RESET_PASSWORD_SUCCESS,
  SEND_VERIFICATION_OTP_SUCCESS,
  VERIFY_RESET_PASSWORD_OTP_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  LOGIN_FAILURE
} from "./ActionType";

const initialValue = {
  register: null,
  login: null,
  login2step: null,
  reqUser: null,
  otp: null,
  logout: null,
  token:localStorage.getItem("authToken") || null
};

export const authReducer = (store = initialValue, { type, payload }) => {
  if (type == REGISTER_SUCCESS) {
    localStorage.setItem("authToken", payload.accessToken);
    return { ...store, register: payload, token: payload.accessToken };
  } else if (type == REGISTER_FAILURE) {
    return { ...store, register: { error: payload }, token: null };
  } else if (type == LOGIN_FAILURE) {
    return { ...store, login : { error: payload }, token: null };
  } else if (type == LOGIN_SUCCESS) {
    localStorage.setItem("authToken", payload.accessToken);
    return { ...store, login: payload, token: payload.accessToken };
  } else if (type == LOGIN_TWO_STEP_SUCCESS) {
    return { ...store, login2step: payload };
  } else if (type == GET_USER_SUCCESS) {
    return { ...store, reqUser: payload };
  } else if (type == SEND_VERIFICATION_OTP_SUCCESS) {
    return { ...store, otp: payload };
  } else if (type == LOGOUT) {
    localStorage.removeItem("authToken")
    return { ...store, logout: payload, token: null };
  }
  return store;
};
