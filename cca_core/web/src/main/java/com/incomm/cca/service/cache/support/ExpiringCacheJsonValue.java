package com.incomm.cca.service.cache.support;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class ExpiringCacheJsonValue implements Serializable {

    private String json;
    private LocalDateTime expirationDate;

    public ExpiringCacheJsonValue(String json, long timeToLive) {
        this.json = json;
        this.expirationDate = LocalDateTime.now()
                                           .plus(timeToLive, ChronoUnit.MILLIS);
    }

    public String getValue() {
        return this.json;
    }

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public boolean isExpired() {
        return this.expirationDate.isBefore(LocalDateTime.now());
    }
}
