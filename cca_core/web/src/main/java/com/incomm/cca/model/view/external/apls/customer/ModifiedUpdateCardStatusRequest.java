package com.incomm.cca.model.view.external.apls.customer;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.apls.model.requests.UpdateCardStatusRequest;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ModifiedUpdateCardStatusRequest extends UpdateCardStatusRequest {

    private String currentStatus;
    private Boolean isVmsGiftCard = false;

    public String getCurrentStatus() {
        return currentStatus;
    }

    public void setCurrentStatus(final String currentStatus) {
        this.currentStatus = currentStatus;
    }

    public Boolean getIsVmsGiftCard() {
        return isVmsGiftCard;
    }

    public void setIsVmsGiftCard(final Boolean vmsGiftCard) {
        isVmsGiftCard = vmsGiftCard;
    }
}
