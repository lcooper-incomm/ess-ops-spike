package com.incomm.cca.service.cache;

import com.fasterxml.jackson.core.type.TypeReference;
import com.incomm.cca.model.view.session.queue.SessionQueueView;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionQueueBySessionTypeCache extends AbstractClusterCachingService<String, List<SessionQueueView>> {

    @Value("${cache.session-queue.name}")
    private String cacheName;
    @Value("${cache.session-queue.ttl:86400000}")
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
        return new TypeReference<List<SessionQueueView>>() {
        };
    }
}
