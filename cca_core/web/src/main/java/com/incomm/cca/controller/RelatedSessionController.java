package com.incomm.cca.controller;

import com.incomm.cca.model.converter.SessionConverter;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.service.CaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/session/related")
public class RelatedSessionController extends RestResponseHandler {

    @Autowired
    private CaseService caseService;
    @Autowired
    private SessionConverter sessionConverter;

    @GetMapping("/identifier/{identifierId}")
    public ResponseEntity findAllRelatedByIdentifierId(@PathVariable("identifierId") Long identifierId) {
        List<Session> domainModels = caseService.findAllRelatedByIdentifierId(identifierId);
        return ok(sessionConverter.convert(domainModels));
    }

    //TODO place other "related" type query endpoints here
}
