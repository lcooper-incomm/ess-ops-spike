package com.incomm.cca.controller.session;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.converter.RefundRequestComponentConverter;
import com.incomm.cca.model.domain.session.RefundRequestComponent;
import com.incomm.cca.model.view.session.RefundRequestComponentRequestView;
import com.incomm.cca.service.session.RefundRequestDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/refund-request-component")
public class RefundRequestComponentController extends RestResponseHandler {

    @Autowired
    private RefundRequestComponentConverter refundRequestComponentConverter;
    @Autowired
    private RefundRequestDetailService refundRequestDetailService;

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity updateOne(@PathVariable("id") Long id, @RequestBody RefundRequestComponentRequestView request) {
		RefundRequestComponent domainModel = refundRequestDetailService.updateOne(id, request);
        return ok(refundRequestComponentConverter.convert(domainModel));
    }
}
