package com.incomm.cca.exception;

public class DuplicateI3ConnectionException extends RuntimeException {

    public DuplicateI3ConnectionException() {
        super();
    }

    public DuplicateI3ConnectionException(String uid, String username) {
        super(String.format("Duplicate attempt to connect I3 call for uid=%s username=%s", uid, username));
    }
}
