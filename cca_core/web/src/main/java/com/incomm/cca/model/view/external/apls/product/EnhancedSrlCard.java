package com.incomm.cca.model.view.external.apls.product;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.apls.model.card.EnhancedCard;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class EnhancedSrlCard extends EnhancedCard implements Serializable {

    private EnhancedCard srlData;

    public EnhancedCard getSrlData() {
        return srlData;
    }

    public void setSrlData(EnhancedCard srlData) {
        this.srlData = srlData;
    }
}
