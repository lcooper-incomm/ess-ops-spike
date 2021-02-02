package com.incomm.cca.service.cache;

import com.fasterxml.jackson.core.type.TypeReference;
import com.incomm.cca.service.cache.support.CodexCacheItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CodexCache extends AbstractClusterCachingService<String, CodexCacheItem> {

    @Value("${cache.codex.name}")
    private String cacheName;
    @Value("${cache.codex.ttl:86400000}")
    private Long ttl;

    @Override
    protected String getMapName() {
        return cacheName;
    }

    @Override
    protected Long getTimeToLive() {
        return ttl;
    }

    @Override
    protected TypeReference getTypeReference() {
        return new TypeReference<CodexCacheItem>() {
        };
    }
}
