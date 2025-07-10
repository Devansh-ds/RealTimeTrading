import { ASSET_HISTORY, BUY_ASSET } from "./ActionType";

const initialValue = {
  buyAsset: null,
  sellAsset: null,
  userAssets: null,
  assetHistory: null,
};

export const assetReducer = (store = initialValue, { type, payload }) => {
  if (type == BUY_ASSET) {
    return { ...store, buyAsset: payload };
  } else if (type == ASSET_HISTORY) {
    return { ...store, assetHistory: payload };
  }
  return store;
};
