package com.incomm.cca.controller;

import com.incomm.apls.model.response.ProductOccupation;
import com.incomm.cca.service.apls.OccupationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/occupation")
public class OccupationController extends RestResponseHandler {

    @Autowired
    private OccupationService occupationService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity findAll() {
        List<ProductOccupation> occupations = occupationService.findAll();
        return ok(occupations);
    }
}
