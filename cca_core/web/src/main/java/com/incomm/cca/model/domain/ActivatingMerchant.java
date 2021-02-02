package com.incomm.cca.model.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.incomm.cscore.client.apls.constant.AplsPlatform;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;

@Entity
public class ActivatingMerchant {

    private Long id;
    private String merchantId;
    private String merchantName;
    private String platform;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(String merchantId) {
        this.merchantId = merchantId;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(String merchantName) {
        this.merchantName = merchantName;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    @Transient
    @JsonIgnore
    public AplsPlatform getAplsPlatform() {
        AplsPlatform aplsPlatform = null;
        try {
            aplsPlatform = AplsPlatform.convert(this.platform);
        } catch (IllegalArgumentException e) {
            //Fail silently
        }
        return aplsPlatform;
    }

    @Override
    public String toString() {
        return "ActivatingMerchant{" +
                "id=" + id +
                ", merchantId='" + merchantId + '\'' +
                ", merchantName='" + merchantName + '\'' +
                ", platform=" + platform +
                '}';
    }
}
