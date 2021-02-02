package com.incomm.cca.model.view.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GenericMessageView implements Serializable {

    private String message;
    private String code;

    public GenericMessageView() {
    }

    public GenericMessageView(String message) {
        this.message = message;
    }

    public GenericMessageView(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}