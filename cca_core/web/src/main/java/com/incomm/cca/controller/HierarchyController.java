package com.incomm.cca.controller;

import com.incomm.apls.model.requests.AplsRequestLocation;
import com.incomm.cca.service.apls.AplsNodeService;
import com.incomm.cscore.client.apls.model.node.EnhancedHierarchies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/hierarchy")
public class HierarchyController extends RestResponseHandler {

    @Autowired
    private AplsNodeService aplsNodeService;
    private static final String NODE_TYPE_ILLEGAL_ARGUMENT = "searchType must be one of terminal, location, merchant, but is not case-sensitive";

    @RequestMapping(method = RequestMethod.GET, value = "/{searchType}/{id}")
    public ResponseEntity getHierarchy(@PathVariable("searchType") String searchType, @PathVariable("id") String id, @RequestParam(value = "isLegacy", defaultValue = "false") Boolean isLegacy) {
        //Validate searchType
        AplsRequestLocation aplsRequestLocation = new AplsRequestLocation();
        String searchTypeUpperCase = searchType.toUpperCase();
        if (searchTypeUpperCase.equals("TERMINAL")) {
            if (isLegacy) {
                aplsRequestLocation.setLegacyTerminalId(id);
            } else {
                aplsRequestLocation.setTerminalId(id);
            }
        } else if (searchTypeUpperCase.equals("LOCATION")) {
            if (isLegacy) {
                aplsRequestLocation.setLegacyLocationId(id);
            } else {
                aplsRequestLocation.setLocationId(id);
            }
        } else if (searchTypeUpperCase.equals("MERCHANT")) {
            aplsRequestLocation.setMerchantId(id);
        } else {
            return badRequest(NODE_TYPE_ILLEGAL_ARGUMENT);
        }
        EnhancedHierarchies hierarchies = aplsNodeService.getHierarchies(aplsRequestLocation);
        return ok(hierarchies.getFirst());
    }
}
