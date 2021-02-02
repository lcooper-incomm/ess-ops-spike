package com.incomm.cca.controller.session;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.converter.LawEnforcementComponentConverter;
import com.incomm.cca.model.domain.session.LawEnforcementComponent;
import com.incomm.cca.service.session.LawEnforcementComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/law-enforcement-component")
public class LawEnforcementComponentController extends RestResponseHandler {

    @Autowired
    private LawEnforcementComponentConverter lawEnforcementComponentConverter;
    @Autowired
    private LawEnforcementComponentService lawEnforcementComponentService;

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity updateOne(@PathVariable("id") Long id, @RequestBody LawEnforcementComponent request) {
        LawEnforcementComponent domainModel = lawEnforcementComponentService.updateOne(id, request);
        return ok(lawEnforcementComponentConverter.convert(domainModel));
    }
}
