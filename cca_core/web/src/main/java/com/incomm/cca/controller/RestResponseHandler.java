package com.incomm.cca.controller;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.incomm.cca.model.view.i3.I3CallErrorResponseView;
import com.incomm.cscore.client.model.CsCoreGenericMessageView;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public abstract class RestResponseHandler {

    private static final ObjectMapper objectMapper = new ObjectMapper();
    public static final String HEADER_CCA_ERROR_MESSAGES = "cca-error-messages";
    public static final String UNEXPECTED_ERROR_MESSAGE = "An unexpected error occurred";

    protected ResponseEntity noContent() {
        return ResponseEntity.noContent()
                             .build();
    }

    protected ResponseEntity ok() {
        return ResponseEntity.ok()
                             .build();
    }

    protected <T> ResponseEntity ok(T object) {
        return ResponseEntity.ok(object);
    }

    protected ResponseEntity badRequest(String responseMessage) {
        return this.badRequest(responseMessage, null);
    }

    protected ResponseEntity badRequest(String message, List<String> toastErrorMessages) {
        CsCoreGenericMessageView errorResponse = new CsCoreGenericMessageView();
        errorResponse.setMessage(message);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .header(HEADER_CCA_ERROR_MESSAGES, json(new ErrorMessagesResponse(toastErrorMessages)))
                             .body(errorResponse);
    }

    protected ResponseEntity forbidden() {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                             .build();
    }

    protected ResponseEntity internalServerError() {
        CsCoreGenericMessageView errorResponse = new CsCoreGenericMessageView();
        errorResponse.setMessage(UNEXPECTED_ERROR_MESSAGE);

        List<String> errorMessages = new ArrayList<>();
        errorMessages.add(UNEXPECTED_ERROR_MESSAGE);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .header(HEADER_CCA_ERROR_MESSAGES, json(new ErrorMessagesResponse(errorMessages)))
                             .body(errorResponse);
    }

    protected ResponseEntity i3Ok(Object object) {
        return ResponseEntity.ok(object);
    }

    protected ResponseEntity i3BadRequest(String message) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body(new I3CallErrorResponseView(message));
    }

    protected ResponseEntity exportOk(byte[] bytes, String disposition) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", disposition);

        return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
    }

    protected String json(Object object) {
        String value = null;
        try {
            value = objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to parse object to JSON")
                        .exception(e)
                        .build();
        }
        return value;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    protected static class ErrorMessagesResponse implements Serializable {

        private List<String> messages = new ArrayList<>();

        public ErrorMessagesResponse() {
        }

        public ErrorMessagesResponse(List<String> messages) {
            this.messages = messages;
        }

        public List<String> getMessages() {
            return messages;
        }

        public void setMessages(final List<String> messages) {
            this.messages = messages;
        }
    }
}
