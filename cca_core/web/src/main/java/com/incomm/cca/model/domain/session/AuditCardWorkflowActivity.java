package com.incomm.cca.model.domain.session;

import com.incomm.cca.model.domain.User;
import com.incomm.cscore.mvcutils.model.CrudEntity;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table
public class AuditCardWorkflowActivity implements Serializable, CrudEntity<Long> {

    private Long id;
    private Card card;
    private Date createdDate;
    private String fieldName;
    private Boolean fromValue;
    private Boolean toValue;
    private User user;

    @Override
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "card_id")
    public Card getCard() {
        return card;
    }

    public void setCard(final Card card) {
        this.card = card;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(final String fieldName) {
        this.fieldName = fieldName;
    }

    public Boolean getFromValue() {
        return fromValue;
    }

    public void setFromValue(final Boolean fromValue) {
        this.fromValue = fromValue;
    }

    public Boolean getToValue() {
        return toValue;
    }

    public void setToValue(final Boolean toValue) {
        this.toValue = toValue;
    }

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "user_id")
    public User getUser() {
        return user;
    }

    public void setUser(final User user) {
        this.user = user;
    }

    @Override
    public void validate() throws IllegalArgumentException {
        if (this.card == null) {
            throw new IllegalArgumentException("AuditCardWorkflowActivity must be associated to a Card");
        } else if (this.createdDate == null) {
            throw new IllegalArgumentException("AuditCardWorkflowActivity createdDate must be provided");
        } else if (StringUtils.isBlank(this.fieldName)) {
            throw new IllegalArgumentException("AuditCardWorkflowActivity field must be provided");
        } else if (this.fromValue.equals(this.toValue)) {
            throw new IllegalArgumentException("AuditCardWorkflowActivity fromValue can't equal toValue");
        } else if (this.user == null) {
            throw new IllegalArgumentException("AuditCardWorkflowActivity user must be provided");
        }
    }
}
