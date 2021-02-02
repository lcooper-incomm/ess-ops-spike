package com.incomm.cca.model.domain.encor;

import java.io.Serializable;

public class EncorSymphonyResponse implements Serializable {

    private Long responseCode;
    private String message;
    private String responseMessage;
    private Object responseObject;

    public Long getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(Long responseCode) {
        this.responseCode = responseCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getResponseMessage() {
        return responseMessage;
    }

    public void setResponseMessage(String responseMessage) {
        this.responseMessage = responseMessage;
    }

    public Object getResponseObject() {
        return responseObject;
    }

    public void setResponseObject(Object responseObject) {
        this.responseObject = responseObject;
    }
}
