package com.incomm.cca.model.view;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.apls.constant.AplsPlatform;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ActivatingMerchantView implements Serializable {

    protected Long id;
    protected String merchantId;
    protected String merchantName;
    protected AplsPlatform platform;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(final String merchantId) {
        this.merchantId = merchantId;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(final String merchantName) {
        this.merchantName = merchantName;
    }

    public AplsPlatform getPlatform() {
        return platform;
    }

    public void setPlatform(final AplsPlatform platform) {
        this.platform = platform;
    }
}
