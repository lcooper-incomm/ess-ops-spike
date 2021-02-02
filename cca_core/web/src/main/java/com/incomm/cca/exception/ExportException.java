package com.incomm.cca.exception;

import org.springframework.http.HttpStatus;

public class ExportException extends RuntimeException {

    private HttpStatus status;

    public ExportException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public int getStatusCode() {
        return status.value();
    }
}
