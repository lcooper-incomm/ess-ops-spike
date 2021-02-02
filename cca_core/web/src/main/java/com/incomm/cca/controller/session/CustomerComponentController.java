package com.incomm.cca.controller.session;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.converter.CustomerComponentConverter;
import com.incomm.cca.model.domain.session.CustomerComponent;
import com.incomm.cca.model.view.session.CustomerComponentView;
import com.incomm.cca.service.session.CustomerComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/customer-component")
public class CustomerComponentController extends RestResponseHandler {

    @Autowired
    private CustomerComponentConverter customerComponentConverter;
    @Autowired
    private CustomerComponentService customerComponentService;

    @PutMapping(value = "/{id}")
    public ResponseEntity updateOne(@PathVariable("id") Long id, @RequestBody CustomerComponentView request) {
        CustomerComponent domainModel = customerComponentService.updateOne(id, request);
        return ok(customerComponentConverter.convert(domainModel));
    }
}
