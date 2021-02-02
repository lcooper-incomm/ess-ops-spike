package com.incomm.cca.controller.session;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.converter.MerchantComponentConverter;
import com.incomm.cca.model.domain.session.MerchantComponent;
import com.incomm.cca.model.view.session.MerchantComponentRequestView;
import com.incomm.cca.service.session.MerchantComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/merchant-component")
public class MerchantComponentController extends RestResponseHandler {

    @Autowired
    private MerchantComponentConverter merchantComponentConverter;
    @Autowired
    private MerchantComponentService merchantComponentService;

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity updateOne(@PathVariable("id") Long id, @RequestBody MerchantComponentRequestView request) {
        MerchantComponent domainModel = merchantComponentService.updateOne(id, request);
        return ok(merchantComponentConverter.convert(domainModel));
    }
}
