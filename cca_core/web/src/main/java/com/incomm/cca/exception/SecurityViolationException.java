package com.incomm.cca.exception;

import org.springframework.http.HttpStatus;

public class SecurityViolationException extends RuntimeException {

    private HttpStatus status;
    private String identifier;

    public SecurityViolationException() {
        super();
    }

    public SecurityViolationException(HttpStatus status, String identifier, String message) {
        super(message);
        this.status = status;
        this.identifier = identifier;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getIdentifier() {
        return identifier;
    }

    @Override
    public String toString() {
        return "SecurityViolationException{" +
                "status=" + status +
                ", identifier='" + identifier + '\'' +
                ", message=" + getMessage() +
                '}';
    }
}