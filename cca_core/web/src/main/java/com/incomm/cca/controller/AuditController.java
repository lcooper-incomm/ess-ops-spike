package com.incomm.cca.controller;

import com.incomm.cca.model.converter.AuditActivityConverter;
import com.incomm.cca.model.domain.audit.AuditActivity;
import com.incomm.cca.model.domain.audit.AuditCardReplacementActivity;
import com.incomm.cca.model.view.audit.AuditActivityRequestView;
import com.incomm.cca.service.AuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/audit")
public class AuditController extends RestResponseHandler {

    @Autowired
    private AuditActivityConverter auditActivityConverter;
    @Autowired
    private AuditService auditService;

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity getRecord(@PathVariable("id") Long id) {
        AuditActivity auditActivity = auditService.findOne(id);
        if (auditActivity != null) {
            return ok(auditActivityConverter.convert(auditActivity));
        } else {
            return noContent();
        }
    }

    @PostMapping
    public ResponseEntity recordActivity(@RequestBody AuditActivityRequestView request) {
        auditService.record(request.getType(), request.getActivityDate(), request.getResponseSuccessDate(), request.getResponseFailureDate());
        return noContent();
    }

    @GetMapping("/last-card-replacement-activity")
    public ResponseEntity getLastCardReplacementActivity(@RequestParam("identifierType") String identifierType,
                                                         @RequestParam("identifier") String identifier,
                                                         @RequestParam("platform") String platform) {
        AuditCardReplacementActivity lastActivity = auditService.findLastCardReplacementActivity(identifierType, identifier, platform);
        if (lastActivity != null) {
            return ok(auditActivityConverter.convert(lastActivity));
        } else {
            return noContent();
        }
    }
}
