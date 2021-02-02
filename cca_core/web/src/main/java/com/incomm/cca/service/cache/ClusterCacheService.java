package com.incomm.cca.service.cache;

import com.hazelcast.core.IMap;
import com.incomm.cca.hazelcast.HazelcastManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClusterCacheService {

    @Autowired
    private HazelcastManager hazelcastManager;

    public void clearCache(String name) {
        IMap map = this.hazelcastManager.getHazelcastInstance()
                                        .getMap(name);
        if (map != null) {
            map.clear();
        }
    }
}
