package com.incomm.cca.controller;

import com.incomm.cca.service.maples.MaplesCustomerService;
import com.incomm.cscore.client.maples.model.request.account.AccountQuery;
import com.incomm.cscore.client.maples.model.request.customer.CustomerQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/maples-customer")
public class MaplesCustomerController extends RestResponseHandler {

    @Autowired
    private MaplesCustomerService maplesCustomerService;

    @PostMapping(value = "/search")
    public ResponseEntity search(@RequestBody CustomerQuery query) {
        try {
            return ok(maplesCustomerService.search(query));
        } catch (IllegalArgumentException e) {
            return badRequest(e.getMessage());
        }
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity findOneById(@PathVariable String id) {
        return ok(maplesCustomerService.findOne(id));
    }
}
