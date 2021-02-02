package com.incomm.cca.service.cache;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hazelcast.core.IMap;
import com.incomm.cca.hazelcast.HazelcastManager;
import com.incomm.cca.service.cache.support.ExpiringCacheJsonValue;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public abstract class AbstractClusterCachingService<K, V> {

    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private HazelcastManager hazelcastManager;

    protected abstract String getMapName();

    protected abstract Long getTimeToLive();

    protected abstract TypeReference getTypeReference();

    public void clear() {
        this.getMap()
            .clear();
    }

    public V get(K key) {
        clearExpiredEntries();
        ExpiringCacheJsonValue expiringValue = this.getMap()
                                                   .get(key);
        return expiringValue != null ? readJsonValue(expiringValue.getValue()) : null;
    }

    public List<V> getAll() {
        this.clearExpiredEntries();
        return this.getMap()
                   .values()
                   .stream()
                   .map(value -> this.readJsonValue(value.getValue()))
                   .collect(Collectors.toList());
    }

    public void put(K key, V value) {
        try {
            this.getMap()
                .set(key, new ExpiringCacheJsonValue(objectMapper.writeValueAsString(value), getTimeToLive()));
        } catch (JsonProcessingException e) {
            CsCoreLogger.error("Failed to write cache object to JSON")
                        .exception(e)
                        .build();

        }
    }

    public void putAll(Map<K, V> map) {
        map.forEach(this::put);
    }

    private void clearExpiredEntries() {
        List<K> expiredKeys = this.getMap()
                                  .entrySet()
                                  .stream()
                                  .filter(entry -> entry.getValue()
                                                        .isExpired())
                                  .map(entry -> entry.getKey())
                                  .collect(Collectors.toList());
        for (K key : expiredKeys) {
            this.getMap()
                .remove(key);
        }
    }

    private IMap<K, ExpiringCacheJsonValue> getMap() {
        return hazelcastManager.getHazelcastInstance()
                               .getMap(getMapName());
    }

    private V readJsonValue(String json) {
        try {
            return objectMapper.readValue(json, getTypeReference());
        } catch (IOException e) {
            CsCoreLogger.error("Failed to read cache object from JSON")
                        .exception(e)
                        .build();
            return null;
        }
    }
}
