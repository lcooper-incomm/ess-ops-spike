package com.incomm.cca.controller;

import com.incomm.apls.model.response.ProductActionReasonCodes;
import com.incomm.cca.service.apls.AplsCardService;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/action")
public class ActionController extends RestResponseHandler {

    @Autowired
    private AplsCardService aplsCardService;

    @GetMapping(value = "/reason")
    public ResponseEntity getProductActionReasonCodes(@RequestParam(value = "platform") String platform) {
        ProductActionReasonCodes reasonCodes = aplsCardService.findProductActionReasonCodes(AplsPlatform.convert(platform));
        return ok(reasonCodes.getProductActionReasonCodes());
    }

}
