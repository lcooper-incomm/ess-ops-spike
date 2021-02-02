package com.incomm.cca.model.view.session.comment;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.auth.UserView;
import com.incomm.cscore.client.model.CsCoreTimestamp;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CommentView implements Serializable {

    private Long id;
    private String cardNumber;
    private String content;
    private CsCoreTimestamp createdDate;
    private UserView createdBy;
    private CsCoreTimestamp modifiedDate;
    private UserView modifiedBy;
    private Boolean isPrivate = false;
    private String system;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(final String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getContent() {
        return content;
    }

    public void setContent(final String content) {
        this.content = content;
    }

    public CsCoreTimestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final CsCoreTimestamp createdDate) {
        this.createdDate = createdDate;
    }

    public UserView getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(final UserView createdBy) {
        this.createdBy = createdBy;
    }

    public CsCoreTimestamp getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(final CsCoreTimestamp modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public UserView getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(final UserView modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Boolean getIsPrivate() {
        return isPrivate;
    }

    public void setIsPrivate(final Boolean aPrivate) {
        isPrivate = aPrivate;
    }

    public String getSystem() {
        return system;
    }

    public void setSystem(final String system) {
        this.system = system;
    }
}
