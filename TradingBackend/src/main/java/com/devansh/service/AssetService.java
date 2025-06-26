package com.devansh.service;

import com.devansh.exception.AssetException;
import com.devansh.model.Asset;
import com.devansh.model.Coin;
import com.devansh.model.User;

import java.util.List;

public interface AssetService {

    Asset createAsset(User user, Coin coin, double quantity);
    Asset getAssetById(Integer assetId) throws AssetException;
    Asset getAssetByUserIdAndId(Integer userId, Integer assetId) throws AssetException;
    List<Asset> getUserAssets(Integer userId);
    Asset updateAsset(Integer assetId, double quantity) throws AssetException;
    Asset findAssetByUserIdAndCoinId(Integer userId, String coinId);
    void deleteAsset(Integer assetId);

}
