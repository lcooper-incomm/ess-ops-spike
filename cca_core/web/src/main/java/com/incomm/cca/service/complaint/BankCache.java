package com.incomm.cca.service.complaint;

import com.fasterxml.jackson.core.type.TypeReference;
import com.incomm.cca.model.view.complaint.BankView;
import com.incomm.cca.service.cache.AbstractClusterCachingService;
import org.springframework.stereotype.Service;

@Service
public class BankCache extends AbstractClusterCachingService<Long, BankView> {

    private static final String MAP_NAME = "BANKS";

    @Override
    protected String getMapName() {
        return BankCache.MAP_NAME;
    }

    @Override
    protected Long getTimeToLive() {
        return 86400000L;
    }

    @Override
    protected TypeReference getTypeReference() {
        return new TypeReference<BankView>() {
        };
    }
}
