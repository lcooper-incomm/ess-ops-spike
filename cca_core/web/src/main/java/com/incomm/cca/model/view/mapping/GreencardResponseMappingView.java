package com.incomm.cca.model.view.mapping;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.domain.mapping.GCResponse;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GreencardResponseMappingView implements Serializable {

    protected Long id;
    protected String responseCode;
    protected String responseValue;

    public GreencardResponseMappingView() {
    }

    public GreencardResponseMappingView(GCResponse response) {
        this.id = response.getId();
        this.responseCode = response.getResponseCode();
        this.responseValue = response.getResponseValue();
    }

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(final String responseCode) {
        this.responseCode = responseCode;
    }

    public String getResponseValue() {
        return responseValue;
    }

    public void setResponseValue(final String responseValue) {
        this.responseValue = responseValue;
    }
}
