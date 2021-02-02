package com.incomm.cca.controller.session;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.converter.ReceiptComponentConverter;
import com.incomm.cca.model.domain.session.ReceiptCard;
import com.incomm.cca.model.domain.session.ReceiptComponent;
import com.incomm.cca.model.view.session.ReceiptComponentRequestView;
import com.incomm.cca.service.session.ReceiptComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/receipt-component")
public class ReceiptComponentController extends RestResponseHandler {

    @Autowired
    private ReceiptComponentConverter receiptComponentConverter;
    @Autowired
    private ReceiptComponentService receiptComponentService;

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity updateOne(@PathVariable("id") Long id, @RequestBody ReceiptComponentRequestView request) {
        ReceiptComponent domainModel = receiptComponentService.updateOne(id, request);
        return ok(receiptComponentConverter.convert(domainModel));
    }

    @RequestMapping(value = "/{id}/card", method = RequestMethod.POST)
    public ResponseEntity addOneCardDetail(@PathVariable("id") Long receiptDetailId, @RequestBody ReceiptCard request) {
        ReceiptCard domainModel = receiptComponentService.addOneCardDetail(receiptDetailId, request);
        return ok(receiptComponentConverter.convert(domainModel));
    }

    @RequestMapping(value = "/card/{id}", method = RequestMethod.PUT)
    public ResponseEntity updateOneCardDetail(@PathVariable("id") Long id, @RequestBody ReceiptCard request) {
        ReceiptCard domainModel = receiptComponentService.updateOneCardDetail(id, request);
        return ok(receiptComponentConverter.convert(domainModel));
    }

    @RequestMapping(value = "/card/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteOneCardDetail(@PathVariable("id") Long id) {
        receiptComponentService.deleteOneCardDetail(id);
        return noContent();
    }

}
