package com.incomm.cca.controller;

import com.incomm.cca.model.converter.SessionConverter;
import com.incomm.cca.model.domain.session.WorkspaceSession;
import com.incomm.cca.model.view.session.WorkspaceSessionView;
import com.incomm.cca.service.session.WorkspaceSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/workspace-session")
public class WorkspaceSessionController extends RestResponseHandler {

    @Autowired
    private SessionConverter sessionConverter;
    @Autowired
    private WorkspaceSessionService workspaceSessionService;

    @GetMapping
    public ResponseEntity findAllForCurrentUser(@RequestParam(value = "page", defaultValue = "0") int page, @RequestParam(value = "limit", defaultValue = "50") int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        Page<WorkspaceSession> domainModels = workspaceSessionService.findAllActiveForCurrentUser(pageable);
        Page<WorkspaceSessionView> viewModels = domainModels.map(sessionConverter::convert);
        return ok(viewModels);
    }
}
