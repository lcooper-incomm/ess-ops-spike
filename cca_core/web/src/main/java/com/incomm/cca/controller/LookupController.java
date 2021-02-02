package com.incomm.cca.controller;

import com.incomm.cca.service.apls.AplsCardService;
import com.incomm.cca.service.apls.AplsCustomerService;
import com.incomm.cca.service.apls.AplsStatusService;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.apls.model.shared.EnhancedStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/rest/lookup")
public class LookupController extends RestResponseHandler {

    @Autowired
    private AplsStatusService statusService;
    @Autowired
    private AplsCardService cardService;
    @Autowired
    private AplsCustomerService customerService;

    @RequestMapping(value = "/card-number/{identifierType}/{identifier}", method = RequestMethod.GET)
    public ResponseEntity cardNumberLookup(
            @PathVariable("identifierType") String identifierType,
            @PathVariable("identifier") String identifier,
            @RequestParam("platform") String platform) {
        List<String> results = new ArrayList<>();

        AplsPlatform aplsPlatform = AplsPlatform.convert(platform);
        switch (aplsPlatform) {
            case GREENCARD:
                results.addAll(cardService.findAllCardNumbers(aplsPlatform, identifierType, identifier));
                break;
            case VMS:
                results.addAll(customerService.findAllCardNumbers(identifierType, identifier));
                break;
            default:
                break;
        }

        return ok(results);
    }

    @RequestMapping(value = "/status/{identifierType}/{identifier}", method = RequestMethod.GET)
    public ResponseEntity statusLookup(
            @PathVariable("identifierType") String identifierType,
            @PathVariable("identifier") String identifier,
            @RequestParam("platform") String platform) {
        List<EnhancedStatus> response = statusService.search(platform, identifierType, identifier);
        if (!response.isEmpty()) {
            return ok(response.get(0));
        } else {
            return noContent();
        }
    }
}
