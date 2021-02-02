package com.incomm.cca.controller.session;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.converter.SessionClassConverter;
import com.incomm.cca.model.domain.session.SessionClass;
import com.incomm.cca.model.domain.session.SessionStatus;
import com.incomm.cca.service.session.SessionClassService;
import com.incomm.cca.service.session.SessionStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rest/session-definition")
public class SessionDefinitionController extends RestResponseHandler {

    @Autowired
    private SessionClassConverter sessionClassConverter;
    @Autowired
    private SessionClassService sessionClassService;
    @Autowired
    private SessionStatusService sessionStatusService;

    @GetMapping("/session-class")
    public ResponseEntity findAllSessionClasses() {
        List<SessionClass> sessionClasses = sessionClassService.findAll();
        return ok(sessionClassConverter.convert(sessionClasses));
    }

    @GetMapping("/status")
    public ResponseEntity findAllSessionStatuses() {
        List<SessionStatus> statuses = this.sessionStatusService.findAll();
        return ok(statuses.stream()
                          .map(SessionStatus::getName)
                          .collect(Collectors.toList()));
    }
}
