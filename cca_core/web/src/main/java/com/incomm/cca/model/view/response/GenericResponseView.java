package com.incomm.cca.model.view.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GenericResponseView<T> implements Serializable {

    private T code;
    private String message;

    public GenericResponseView() {
    }

    public GenericResponseView(T code, String message) {
        this.code = code;
        this.message = message;
    }

    public T getCode() {
        return code;
    }

    public void setCode(T code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
