package com.incomm.cca.model.view.mapping;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.domain.mapping.OpCode;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OpCodeMappingView implements Serializable {

    protected Long id;
    protected String code;
    protected String requestValue;
    protected String responseValue;
    protected String transactionType;

    public OpCodeMappingView() {
    }

    public OpCodeMappingView(OpCode opCode) {
        this.id = opCode.getId();
        this.code = opCode.getCode();
        this.requestValue = opCode.getRequestValue();
        this.responseValue = opCode.getResponseValue();
        this.transactionType = opCode.getTransactionType();
    }

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(final String code) {
        this.code = code;
    }

    public String getRequestValue() {
        return requestValue;
    }

    public void setRequestValue(final String requestValue) {
        this.requestValue = requestValue;
    }

    public String getResponseValue() {
        return responseValue;
    }

    public void setResponseValue(final String responseValue) {
        this.responseValue = responseValue;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(final String transactionType) {
        this.transactionType = transactionType;
    }
}
