package com.devansh.service;

import com.devansh.exception.CoinException;
import com.devansh.exception.HttpException;
import com.devansh.model.Coin;
import com.devansh.repo.CoinRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@AllArgsConstructor
public class CoinServiceImpl implements CoinService {

    private final CoinRepository coinRepository;
    private final ObjectMapper objectMapper;
    private final String key = "CG-bB4twjxfuvzu6ss59TPQ3QpC";

//    @Override
//    public List<Coin> getCoinList(int page) throws HttpException {
//        if (page < 0) page = 0;
//
//        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=" + page;
//        RestTemplate template = new RestTemplate();
//        try {
//            HttpHeaders headers = new HttpHeaders();
//            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
//            ResponseEntity<String> response = template.exchange(url, HttpMethod.GET, entity, String.class);
//
//            return objectMapper.readValue(
//                    response.getBody(),
//                    new TypeReference<List<Coin>>() {}
//            );
//        } catch (Exception e) {
//            throw new HttpException(e.getMessage());
//        }
//    }

    @Override
    public List<Coin> getFilteredCoins(String name, String symbol, Double minPrice, Double maxPrice, Pageable pageable) {
        return coinRepository.filterCoins(name, symbol, minPrice, maxPrice, pageable);
    }

    @Override
    public Integer getTotalCoins() {
        return coinRepository.getTotalCount();
    }

    @Scheduled(fixedRate = 1000*60*40)
    public void syncCoinList() throws HttpException {
        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
        RestTemplate template = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = template.exchange(url, HttpMethod.GET, entity, String.class);

            List<Coin> coinList = objectMapper.readValue(
                    response.getBody(),
                    new TypeReference<List<Coin>>() {}
            );
            coinRepository.saveAll(coinList);
        } catch (Exception e) {
            throw new HttpException(e.getMessage());
        }
    }

    @Override
    public String getMarketChart(String coinId, int days) throws HttpException {
        String url = "https://api.coingecko.com/api/v3/coins/"
                + coinId
                + "/market_chart?vs_currency=usd&days=" + days;
        RestTemplate template = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = template.exchange(url, HttpMethod.GET, entity, String.class);

           return response.getBody();
        } catch (Exception e) {
            throw new HttpException(e.getMessage());
        }
    }

    @Override
    public String getCoinDetails(String coinId) throws HttpException {
        String url = "https://api.coingecko.com/api/v3/coins/" + coinId;

        RestTemplate template = new RestTemplate();

        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = template.exchange(url, HttpMethod.GET, entity, String.class);

            JsonNode jsonNode = objectMapper.readTree(response.getBody());
            Coin coin = new Coin();
            coin.setId(jsonNode.get("id").asText());
            coin.setName(jsonNode.get("name").asText());
            coin.setSymbol(jsonNode.get("symbol").asText());
            coin.setImage(jsonNode.get("image").get("large").asText());

            JsonNode marketData = jsonNode.get("market_data");
            coin.setCurrentPrice(marketData.get("current_price").get("usd").asDouble());
            coin.setMarketCap(marketData.get("market_cap").get("usd").asDouble());
            coin.setMarketCapRank(marketData.get("market_cap_rank").asInt());

            coin.setTotalVolume(marketData.get("total_volume").get("usd").asLong());
            coin.setHigh24h(marketData.get("high_24h").get("usd").asDouble());
            coin.setLow24h(marketData.get("low_24h").get("usd").asDouble());

            coin.setPriceChange24h(marketData.get("price_change_24h_in_currency").get("usd").asDouble());
            coin.setPriceChangePercentage24h(marketData.get("price_change_percentage_24h_in_currency").get("usd").asDouble());
            coin.setMarketCapChange24h(marketData.get("market_cap_change_24h_in_currency").get("usd").asLong());

            coin.setMarketCapChangePercentage24h(marketData.get("market_cap_change_percentage_24h_in_currency").get("usd").asDouble());
            coin.setTotalSupply(marketData.get("total_supply").asLong());

            coinRepository.save(coin);
            return response.getBody();

        } catch (Exception e) {
            throw new HttpException(e.getMessage());
        }
    }

    @Override
    public Coin findById(String coinId) throws CoinException {
        return coinRepository
                .findById(coinId)
                .orElseThrow(() -> new CoinException("coin not found with id: " + coinId));
    }

    @Override
    public String searchCoin(String keyword) throws HttpException {
        String url = "https://api.coingecko.com/api/v3/search?query=" + keyword;
        RestTemplate template = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = template.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();
        } catch (Exception e) {
            throw new HttpException(e.getMessage());
        }
    }

    @Override
    public String getTopCoinsByMarketCapRank() throws HttpException {
        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=0&per_page=50";
        RestTemplate template = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = template.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();
        } catch (Exception e) {
            throw new HttpException(e.getMessage());
        }
    }

    @Override
    public String getTradingCoins() throws HttpException {
        String url = "https://api.coingecko.com/api/v3/search/trending";
        RestTemplate template = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = template.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();
        } catch (Exception e) {
            throw new HttpException(e.getMessage());
        }
    }
}
