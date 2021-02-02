package com.incomm.cca.service.cache;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hazelcast.core.IMap;
import com.incomm.cca.hazelcast.HazelcastManager;
import com.incomm.cca.model.dictionary.DictionaryEntity;
import com.incomm.cca.service.cache.support.ExpiringCacheJsonValue;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Based off the Abstract Cache Service; however, that required a new service for every entity being
 * cached.  This uses one service to cache all dictionaries by storing "Dictionar:{{className}}" as
 * a map.  That class name is based upon the passed in argument usually coming from the UI request.
 */
@Service
public class DictionaryCacheService {

    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private HazelcastManager hazelcastManager;

    protected Long getTimeToLive() {
        return 86400000L;
    }

    public <E> void clear(Class<E> entityClass) {
        this.getMap(entityClass)
            .clear();
    }

    public <E> E get(Class<E> entityClass, Long key) {
        CsCoreLogger.debug("get: " + entityClass.getName() + ": " + key).build();
        clearExpiredEntries(entityClass);
        ExpiringCacheJsonValue expiringValue = this.getMap(entityClass)
                                                   .get(key);
        return expiringValue != null ? readJsonValue(entityClass, expiringValue.getValue()) : null;
    }

    public <E> List<E> getAll(Class<E> entityClass) {
        CsCoreLogger.debug("getAll: " + entityClass.getName()).build();
        this.clearExpiredEntries(entityClass);
        return this.getMap(entityClass)
                   .values()
                   .stream()
                   .map(value -> this.readJsonValue(entityClass, value.getValue()))
                   .collect(Collectors.toList());
    }

    public void put(Long key, Object value) {
        try {
            this.getMap(value.getClass())
                .set(key, new ExpiringCacheJsonValue(objectMapper.writeValueAsString(value), getTimeToLive()));
        } catch (JsonProcessingException e) {
            CsCoreLogger.error("Failed to write cache object to JSON")
                        .exception(e)
                        .build();
        }
    }

    public void putAll(Map<Long, ? extends DictionaryEntity> map) {
        map.forEach(this::put);
    }

    private <E> void clearExpiredEntries(Class<E> entityClass) {
        List<Long> expiredKeys = this.getMap(entityClass)
                                     .entrySet()
                                     .stream()
                                     .filter(entry -> entry.getValue()
                                                        .isExpired())
                                     .map(entry -> entry.getKey())
                                     .collect(Collectors.toList());
        for (Long key : expiredKeys) {
            this.getMap(entityClass)
                .remove(key);
        }
    }

    private IMap<Long, ExpiringCacheJsonValue> getMap(Class entityClass) {
        return hazelcastManager.getHazelcastInstance()
                               .getMap("Dictionary:" + entityClass.getName());
    }

    private <E> E readJsonValue(Class<E> entityClass, String json) {
        try {
            return objectMapper.readValue(json, entityClass);
        } catch (IOException e) {
            CsCoreLogger.error("Failed to read cache object from JSON")
                        .exception(e)
                        .build();
            return null;
        }
    }
}
