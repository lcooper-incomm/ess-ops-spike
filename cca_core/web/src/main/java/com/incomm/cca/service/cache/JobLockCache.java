package com.incomm.cca.service.cache;

import com.fasterxml.jackson.core.type.TypeReference;
import com.incomm.cca.model.domain.JobLock;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JobLockCache extends AbstractClusterCachingService<String, JobLock> {

    @Value("${cache.job-lock.name}")
    private String cacheName;
    @Value("${cache.job-lock.ttl:86460000}")
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
        return new TypeReference<JobLock>() {
        };
    }
}
