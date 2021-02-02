package com.incomm.cca.model.view.action;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.enums.apls.AplsIdentifier;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductSearchRequestView implements Serializable {

    private String identifierType;
    private String identifier;
    private AplsPlatform platform = AplsPlatform.INCOMM;

    public String getIdentifierType() {
        return identifierType;
    }

    @JsonIgnore
    public AplsIdentifier getAplsIdentifier() {
        if (StringUtils.isNotBlank(this.identifierType)) {
            return AplsIdentifier.valueOf(this.identifierType.toUpperCase());
        }
        return null;
    }

    public void setIdentifierType(String identifierType) {
        this.identifierType = identifierType;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public AplsPlatform getPlatform() {
        return platform;
    }

    public void setPlatform(AplsPlatform platform) {
        this.platform = platform;
    }

    @Override
    public String toString() {
        return "ProductSearchRequestView{" +
                "identifierType='" + identifierType + '\'' +
                ", identifier='" + identifier + '\'' +
                ", platform='" + platform + '\'' +
                '}';
    }
}
