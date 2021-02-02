package com.incomm.cca.controller;

import com.incomm.apls.model.support.ProductDescription;
import com.incomm.cca.service.ProductDescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/product-description")
public class ProductDescriptionController extends RestResponseHandler {

    @Autowired
    private ProductDescriptionService productDescriptionService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity findAll() {
        List<ProductDescription> descriptions = productDescriptionService.findAll();
        return ok(descriptions);
    }
}
