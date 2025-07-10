import { baseUrl } from "../config";
import { ASSET_HISTORY, BUY_ASSET } from "./ActionType";

export const buyAsset = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${baseUrl}/orders/pay`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${data.token}`
            }, 
            body: JSON.stringify(data.req)
        });

        const resData = await res.json();

        console.log("buy asset: ", resData);
        dispatch({type: BUY_ASSET, payload: resData});
    } catch (error) {
        console.log("buy asset (error): ", error)
    }
}

export const assetHistory = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${baseUrl}/orders/all`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${data.token}`
            }, 
        });

        const resData = await res.json();

        console.log("history asset: ", resData);
        dispatch({type: ASSET_HISTORY, payload: resData});
    } catch (error) {
        console.log("history asset (error): ", error)
    }
}