package com.incomm.cca.controller;

import com.incomm.cca.model.view.i3.IVRCallDetailView;
import com.incomm.cca.service.session.I3SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Handles incoming calls from the various IVRs.
 */
@RestController
@RequestMapping(value = "/rest/ivr", produces = {"application/json", "application/xml"})
public class IVRController extends RestResponseHandler {

    @Autowired
    private I3SessionService i3SessionService;

    @RequestMapping(method = RequestMethod.POST, value = "/calldetail")
    public ResponseEntity post(HttpServletRequest hsr, @RequestBody IVRCallDetailView ivrCallDetailView) {
        try {
            ivrCallDetailView = i3SessionService.processIVRCallDetail(ivrCallDetailView, hsr.getRemoteAddr());
        } catch (Exception e) {
            //We have to always respond to IVR with a 200...
        }

        return i3Ok(ivrCallDetailView);
    }
}