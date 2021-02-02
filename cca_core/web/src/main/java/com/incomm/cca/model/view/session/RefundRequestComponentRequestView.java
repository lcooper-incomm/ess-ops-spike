package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.model.CsCoreAddress;

import java.io.Serializable;
import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RefundRequestComponentRequestView implements Serializable {

    private Long id;
    private CsCoreAddress address;
    private String amount;
    private String ani;
    private Date approvedDate;
    private String name;
    private Date requestedDate;

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

    public String getAmount() {
        return amount;
    }

    public void setAmount(final String amount) {
        this.amount = amount;
    }

    public String getAni() {
        return ani;
    }

    public void setAni(final String ani) {
        this.ani = ani;
    }

    public Date getApprovedDate() {
        return approvedDate;
    }

    public void setApprovedDate(final Date approvedDate) {
        this.approvedDate = approvedDate;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public Date getRequestedDate() {
        return requestedDate;
    }

    public void setRequestedDate(final Date requestedDate) {
        this.requestedDate = requestedDate;
    }
}
