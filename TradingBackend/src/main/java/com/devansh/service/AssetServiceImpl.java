package com.devansh.service;

import com.devansh.exception.AssetException;
import com.devansh.model.Asset;
import com.devansh.model.Coin;
import com.devansh.model.User;
import com.devansh.repo.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssetServiceImpl implements AssetService {

    private final AssetRepository assetRepository;

    @Override
    public Asset createAsset(User user, Coin coin, double quantity) {
        Asset asset = Asset
                .builder()
                .user(user)
                .quantity(quantity)
                .buyPrice(coin.getCurrentPrice())
                .coin(coin)
                .build();
        return assetRepository.save(asset);
    }

    @Override
    public Asset getAssetById(Integer assetId) throws AssetException {
        return assetRepository
                .findById(assetId)
                .orElseThrow(() -> new AssetException("Asset not found with id: " + assetId));
    }

    @Override
    public Asset getAssetByUserIdAndId(Integer userId, Integer assetId) throws AssetException {
        Asset savedAsset = getAssetById(assetId);
        if (!savedAsset.getUser().getId().equals(userId)) {
            throw new AssetException("user with id " + userId + " does not own asset with id " + assetId);
        }
        return savedAsset;
    }

    @Override
    public List<Asset> getUserAssets(Integer userId) {
        return assetRepository.findByUserId(userId);
    }

    @Override
    public Asset updateAsset(Integer assetId, double quantity) throws AssetException {
        Asset savedAsset = getAssetById(assetId);
        savedAsset.setQuantity(savedAsset.getQuantity() + quantity);
        return assetRepository.save(savedAsset);
    }

    @Override
    public Asset findAssetByUserIdAndCoinId(Integer userId, String coinId) {
        return assetRepository.findByUserIdAndCoinId(userId, coinId);
    }

    @Override
    public void deleteAsset(Integer assetId) {
        assetRepository.deleteById(assetId);
    }
}
