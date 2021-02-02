package com.incomm.cca.controller.external;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.view.session.SessionView;
import com.incomm.cca.service.SessionSummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/external/session")
public class ExternalSessionSummaryController extends RestResponseHandler {

    @Autowired
    private SessionSummaryService sessionSummaryService;

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    public ResponseEntity getSessionSummary(@PathVariable("id") Long id) {
        SessionView sessionSummary = sessionSummaryService.getSessionSummary(id);
        if (sessionSummary != null) {
            return ok(sessionSummary);
        } else {
            return noContent();
        }
    }
}
