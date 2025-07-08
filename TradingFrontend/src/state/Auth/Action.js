import { baseUrl } from "../config";
import { LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_SUCCESS } from "./ActionType";

export const register = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${baseUrl}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(data)
        });

        const resData = await res.json();

        if (!res.ok) {
          dispatch({ type: REGISTER_FAILURE, payload: "Email already exist" });
          return;
        }

        localStorage.setItem("authToken", resData.accessToken);

        console.log("register: ", resData);
        dispatch({type: REGISTER_SUCCESS, payload: resData});
    } catch (error) {
        console.log("register (error): ", error)
        dispatch({type: REGISTER_FAILURE, payload: error})
    }
}

export const login = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${baseUrl}/auth/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (!res.ok) {
      dispatch({ type: LOGIN_FAILURE, payload: "Email or password is incorrect" });
      return;
    }

    console.log("login: ", resData);
    dispatch({ type: LOGIN_SUCCESS, payload: resData });
  } catch (error) {
    console.log("login (error): ", error);
    dispatch({ type: LOGIN_FAILURE, payload: error });
  }
};