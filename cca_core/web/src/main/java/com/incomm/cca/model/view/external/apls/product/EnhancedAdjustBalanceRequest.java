package com.incomm.cca.model.view.external.apls.product;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.apls.model.requests.AdjustBalanceRequest;

@JsonIgnoreProperties(ignoreUnknown = true)
public class EnhancedAdjustBalanceRequest extends AdjustBalanceRequest {

    private String productDescription;

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(final String productDescription) {
        this.productDescription = productDescription;
    }
}
