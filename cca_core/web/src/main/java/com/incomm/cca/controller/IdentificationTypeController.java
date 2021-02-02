package com.incomm.cca.controller;

import com.incomm.apls.model.response.ProductIdentificationType;
import com.incomm.cca.service.apls.IdentificationTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/identification-type")
public class IdentificationTypeController extends RestResponseHandler {

    @Autowired
    private IdentificationTypeService identificationTypeService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity findAll() {
        List<ProductIdentificationType> identificationTypes = identificationTypeService.findAll();
        return ok(identificationTypes);
    }
}
