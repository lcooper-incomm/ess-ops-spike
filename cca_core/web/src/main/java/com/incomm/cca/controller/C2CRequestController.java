package com.incomm.cca.controller;

import com.incomm.cca.model.converter.C2CRequestConverter;
import com.incomm.cca.model.domain.C2CRequest;
import com.incomm.cca.model.view.action.C2CRequestView;
import com.incomm.cca.service.C2CTransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/c2c-request")
public class C2CRequestController extends RestResponseHandler {

    @Autowired
    private C2CRequestConverter requestConverter;
    @Autowired
    private C2CTransferService c2CTransferService;

    @GetMapping
    public ResponseEntity findAllPending() {
        List<C2CRequest> requests = c2CTransferService.findAllPendingC2CTransferRequests();
        return ok(requestConverter.convert(requests));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity getDetails(@PathVariable("id") Long requestId) {
        C2CRequestView details = c2CTransferService.getDetails(requestId);
        return ok(details);
    }

    @PostMapping
    public ResponseEntity requestC2CTransfer(@RequestParam("selectionId") Long selectionId, @RequestBody C2CRequest request) {
        C2CRequest updated = c2CTransferService.createC2CTransferRequest(selectionId, request);
        return ok(requestConverter.convert(updated));
    }

    @PutMapping
    public ResponseEntity approveC2CTransfer(@RequestBody C2CRequest request) {
        C2CRequest updated = c2CTransferService.processC2CTransferRequest(request);
        return ok(requestConverter.convert(updated));
    }
}
