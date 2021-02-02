package com.incomm.cca.controller;

import com.incomm.cca.model.converter.PartnerConverter;
import com.incomm.cca.model.domain.Partner;
import com.incomm.cca.service.PartnerService;
import com.incomm.cca.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/partner")
public class PartnerController extends RestResponseHandler {

    @Autowired
    private PartnerConverter partnerConverter;
    @Autowired
    private PartnerService partnerService;
    @Autowired
    private SecurityService securityService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity getAllPartners() {
        List<Partner> partners = partnerService.findAll();
        return ok(partnerConverter.convert(partners));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/granted")
    public ResponseEntity getGrantedPartners() {
        List<Partner> partners;
        if (securityService.isSystemAdministrator()) {
            partners = partnerService.findAll();
        } else {
            partners = partnerService.getAllGranted();
        }

        return ok(partnerConverter.convert(partners));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity createPartner(@RequestBody Partner partner) {
        Partner updated = partnerService.create(partner);
        return ok(partnerConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity updatePartner(@RequestBody Partner partner) {
        Partner updated = partnerService.update(partner);
        return ok(partnerConverter.convert(updated));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    public ResponseEntity deletePartner(@PathVariable("id") Long partnerId) {
        partnerService.delete(partnerId);
        return noContent();
    }
}
