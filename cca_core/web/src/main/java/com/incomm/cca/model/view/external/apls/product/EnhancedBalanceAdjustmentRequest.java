package com.incomm.cca.model.view.external.apls.product;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.apls.model.requests.BalanceAdjustmentRequest;

@JsonIgnoreProperties(ignoreUnknown = true)
public class EnhancedBalanceAdjustmentRequest extends BalanceAdjustmentRequest {

    private String productDescription;

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(final String productDescription) {
        this.productDescription = productDescription;
    }
}
