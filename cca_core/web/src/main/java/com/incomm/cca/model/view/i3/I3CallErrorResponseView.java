package com.incomm.cca.model.view.i3;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class I3CallErrorResponseView {

    private String message;

    public I3CallErrorResponseView() {
    }

    public I3CallErrorResponseView(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "I3CallErrorResponseView{" +
                "message='" + message + '\'' +
                '}';
    }
}
