package com.incomm.cca.controller;

import com.incomm.cca.exception.LimitViolationException;
import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.exception.SessionAlreadyClosedValidationException;
import com.incomm.cca.exception.SessionAlreadyWrappedValidationException;
import com.incomm.cca.togglz.TogglzFeature;
import com.incomm.cscore.client.rest.CsCoreResponseException;
import com.incomm.cscore.client.rest.response.ResponseError;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.catalina.connector.ClientAbortException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpServerErrorException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler extends RestResponseHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity exception(Exception e) {
        if (!(e instanceof ClientAbortException)
                && !(e instanceof HttpServerErrorException)) {

            if (TogglzFeature.LOG_FULL_STACKTRACE_IN_GLOBALEXCEPTIONHANDLER.isActive()) {
                CsCoreLogger.error("Exception caught in global exception handler, logged just in case")
                            .exception(e)
                            .build();
            } else {
                CsCoreLogger.error("Exception caught in global exception handler, logged just in case")
                            .keyValue("cause", e.getMessage())
                            .build();
            }
        }

        return internalServerError();
    }

    @ExceptionHandler(CsCoreResponseException.class)
    public ResponseEntity handleCsCoreException(CsCoreResponseException e) {
        List<String> errorMessages = new ArrayList<>();

        if (e.getResponse() != null) {
            errorMessages.addAll(e.getResponse()
                                  .getErrors()
                                  .stream()
                                  .map(ResponseError::getMessage)
                                  .collect(Collectors.toList()));
        }

        if (errorMessages.isEmpty()) {
            errorMessages.add("An unexpected error occurred");
        }

        return badRequest("Request failed with one or more error messages", errorMessages);
    }

    @ExceptionHandler({
            NotFoundException.class,
            IllegalArgumentException.class,
            IllegalStateException.class,
            LimitViolationException.class,
            SessionAlreadyClosedValidationException.class,
            SessionAlreadyWrappedValidationException.class})
    public ResponseEntity badRequest(Exception e) {
        if (e instanceof LimitViolationException) {
            return badRequest("Request failed with one or more error messages", Collections.singletonList(e.getMessage()));
        }
        return badRequest(e.getMessage());
    }

    @ExceptionHandler(SecurityViolationException.class)
    public ResponseEntity securityViolationException() {
        return forbidden();
    }

}
