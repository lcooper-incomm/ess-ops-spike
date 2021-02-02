package com.incomm.cca.controller;

import com.incomm.cca.service.SecurityService;
import com.incomm.cca.service.cache.ClusterCacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/cache")
public class CacheController {

    @Autowired
    private ClusterCacheService cacheService;
    @Autowired
    private SecurityService securityService;

    @DeleteMapping("/{name}")
    public ResponseEntity clearCache(@PathVariable("name") String name) {
        securityService.validateIsSystemAdministrator();
        cacheService.clearCache(name);
        return ResponseEntity.noContent()
                             .build();
    }
}
