package com.incomm.cca.controller;

import com.incomm.cca.model.view.external.zippopotamus.ZippopotamusResponseView;
import com.incomm.cca.service.thirdparty.ZippopotamusService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/third-party")
public class ThirdPartyController extends RestResponseHandler {

    @Autowired
    private ZippopotamusService zippopotamusService;

    @RequestMapping(method = RequestMethod.GET, value = "/postal-code/{postalCode}")
    public ResponseEntity zipLookup(@PathVariable("postalCode") String postalCode) {
        ZippopotamusResponseView response = null;

        try {
            String postalCodeWithoutSpaces = postalCode.replaceAll("\\s+", "");
            if (StringUtils.isNumeric(postalCodeWithoutSpaces) && postalCodeWithoutSpaces.length() == 5) {
                response = zippopotamusService.lookup("us", postalCode);
            } else if (StringUtils.isAlphanumeric(postalCodeWithoutSpaces) && (postalCodeWithoutSpaces.length() == 3 || postalCodeWithoutSpaces.length() == 6)) {
                response = zippopotamusService.lookup("ca", postalCodeWithoutSpaces.substring(0, 3));
            } else {
                return noContent();
            }
            if (response != null) {
                return ok(response);
            } else {
                return noContent();
            }
        } catch (Exception e) {
            return noContent();
        }
    }
}
