package com.incomm.cca.model.view.external.apls.customer;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.apls.model.response.Comments;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ModifiedCommentsView extends Comments implements Serializable {

    private boolean isPartial = false;

    public ModifiedCommentsView() {
        super();
    }

    public ModifiedCommentsView(Comments comments) {
        this.setComments(comments.getComments());
        this.setAplsResponse(comments.getAplsResponse());
    }

    public boolean getIsPartial() {
        return isPartial;
    }

    public void setIsPartial(boolean partial) {
        isPartial = partial;
    }
}
