package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.model.CsCoreAddress;
import com.incomm.cscore.client.model.CsCoreTimestamp;
import com.incomm.cscore.gringotts.model.CsCoreCurrency;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RefundRequestComponentView implements Serializable {

    private Long id;
    private CsCoreAddress address;
    private CsCoreCurrency amount;
    private String ani;
    private CsCoreTimestamp approvedDate;
    private String name;
    private CsCoreTimestamp requestedDate;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public CsCoreAddress getAddress() {
        return address;
    }

    public void setAddress(final CsCoreAddress address) {
        this.address = address;
    }

    public CsCoreCurrency getAmount() {
        return amount;
    }

    public void setAmount(final CsCoreCurrency amount) {
        this.amount = amount;
    }

    public String getAni() {
        return ani;
    }

    public void setAni(final String ani) {
        this.ani = ani;
    }

    public CsCoreTimestamp getApprovedDate() {
        return approvedDate;
    }

    public void setApprovedDate(final CsCoreTimestamp approvedDate) {
        this.approvedDate = approvedDate;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public CsCoreTimestamp getRequestedDate() {
        return requestedDate;
    }

    public void setRequestedDate(final CsCoreTimestamp requestedDate) {
        this.requestedDate = requestedDate;
    }
}
