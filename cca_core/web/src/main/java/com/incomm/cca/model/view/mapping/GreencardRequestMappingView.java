package com.incomm.cca.model.view.mapping;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.domain.mapping.GCRequest;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GreencardRequestMappingView implements Serializable {

    protected Long id;
    protected String x95Code;
    protected String requestCode;
    protected String requestValue;
    protected String transactionType;

    public GreencardRequestMappingView() {
    }

    public GreencardRequestMappingView(GCRequest request) {
        this.id = request.getId();
        this.x95Code = request.getX95Code();
        this.requestCode = request.getRequestCode();
        this.requestValue = request.getRequestValue();
        this.transactionType = request.getTransactionType();
    }

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getX95Code() {
        return x95Code;
    }

    public void setX95Code(final String x95Code) {
        this.x95Code = x95Code;
    }

    public String getRequestCode() {
        return requestCode;
    }

    public void setRequestCode(final String requestCode) {
        this.requestCode = requestCode;
    }

    public String getRequestValue() {
        return requestValue;
    }

    public void setRequestValue(final String requestValue) {
        this.requestValue = requestValue;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(final String transactionType) {
        this.transactionType = transactionType;
    }
}
