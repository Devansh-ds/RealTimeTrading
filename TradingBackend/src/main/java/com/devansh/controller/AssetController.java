package com.devansh.controller;

import com.devansh.exception.AssetException;
import com.devansh.exception.UserException;
import com.devansh.model.Asset;
import com.devansh.model.User;
import com.devansh.service.AssetService;
import com.devansh.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/asset")
public class AssetController {

    private final AssetService assetService;
    private final UserService userService;

    @GetMapping("/{assetId}")
    public ResponseEntity<Asset> getAssetById(@PathVariable Integer assetId) throws AssetException {
        return ResponseEntity.ok(assetService.getAssetById(assetId));
    }

    @GetMapping("/coin/{coinId}")
    public ResponseEntity<Asset> getAssetByUserIdAndCoinId(@PathVariable String coinId,
                                                           @RequestHeader("Authorization") String token)
            throws AssetException, UserException {
        User user = userService.findByJwtToken(token);
        return ResponseEntity.ok(assetService.findAssetByUserIdAndCoinId(user.getId(), coinId));
    }

    @GetMapping
    public ResponseEntity<List<Asset>> getAssetsForUser(
            @RequestHeader("Authorization") String token
    ) throws AssetException, UserException {
        User user = userService.findByJwtToken(token);
        return ResponseEntity.ok(assetService.getUserAssets(user.getId()));
    }

}




















