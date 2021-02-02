package com.incomm.cca.controller;

import com.incomm.cca.exception.DuplicateI3ConnectionException;
import com.incomm.cca.exception.UnsupportedI3ConnectionException;
import com.incomm.cca.model.view.i3.I3CallRequestView;
import com.incomm.cca.model.view.i3.I3CallResponseView;
import com.incomm.cca.service.session.I3SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Handles incoming calls from the I3 client.
 */
@RestController
@RequestMapping(value = "/rest/i3", produces = "application/json")
public class I3Controller extends RestResponseHandler {

    @Autowired
    private I3SessionService i3SessionService;

    /*
    The exception handling blocks here are necessary, as the responses for exceptions are
    specifically tailored to I3.
     */

    @RequestMapping(method = RequestMethod.POST, value = "/call")
    public ResponseEntity connect(@RequestBody I3CallRequestView i3CallRequestView) {
        try {
            I3CallResponseView response = i3SessionService.connectI3Call(i3CallRequestView);
            return i3Ok(response);
        } catch (UnsupportedI3ConnectionException | DuplicateI3ConnectionException e) {
            return noContent();
        } catch (IllegalArgumentException e) {
            return i3BadRequest(e.getMessage());
        } catch (Exception e) {
            return internalServerError();
        }
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/call/{id}")
    public ResponseEntity disconnect(@PathVariable("id") String callId, @RequestParam("disconnectType") String disconnectTypeString, @RequestParam("user") String username) {
        try {
            I3CallResponseView response = i3SessionService.disconnectI3Call(callId, disconnectTypeString, username);
            return i3Ok(response);
        } catch (IllegalArgumentException e) {
            return i3BadRequest(e.getMessage());
        } catch (UnsupportedI3ConnectionException e) {
            return noContent();
        } catch (Exception e) {
            return internalServerError();
        }
    }
}
