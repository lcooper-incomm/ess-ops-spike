package com.incomm.cca.controller;

import com.incomm.apls.model.requests.AplsRequestLocation;
import com.incomm.cca.model.view.SimpleShortPayView;
import com.incomm.cca.model.view.response.GenericMessageView;
import com.incomm.cca.service.ChallegePasswordService;
import com.incomm.cca.service.apls.AplsNodeService;
import com.incomm.cscore.client.apls.model.node.EnhancedHierarchies;
import com.incomm.cscore.client.apls.model.node.EnhancedHierarchy;
import com.incomm.cscore.client.apls.model.node.EnhancedLocation;
import com.incomm.cscore.client.apls.model.node.EnhancedMerchant;
import com.incomm.cscore.client.apls.model.node.EnhancedTerminal;
import com.incomm.cscore.client.apls.model.node.EnhancedTerminals;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rest/terminal")
public class TerminalController extends RestResponseHandler {

    @Autowired
    private AplsNodeService aplsNodeService;
    @Autowired
    private ChallegePasswordService challegePasswordService;

    @RequestMapping(method = RequestMethod.GET, value = "/challenge/{challenge}")
    public ResponseEntity get(@PathVariable("challenge") Long challenge) {
        String password = challegePasswordService.getChallengePassword(challenge);
        return ok(new GenericMessageView(password));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/shortPayLocation/{locationId}")
    public ResponseEntity shortPayLocationId(
            @PathVariable("locationId") String locationId) {
        AplsRequestLocation aplsRequestLocation = new AplsRequestLocation();
        aplsRequestLocation.setLegacyLocationId(locationId);

        EnhancedHierarchies hierarchies = aplsNodeService.getHierarchies(aplsRequestLocation);
        EnhancedHierarchy hierarchy = hierarchies.getFirst();

        if (hierarchy != null) {
            EnhancedLocation location = hierarchy.getLocation();
            AplsRequestLocation terminalRequest = new AplsRequestLocation();
            terminalRequest.setLocationId(location.getId());

            EnhancedTerminals response = aplsNodeService.getTerminals(terminalRequest);
            List<EnhancedTerminal> terminals = response.getTerminals();
            List<EnhancedTerminal> visibleTerminals = getVisibleTerminalsWithValidHierarchy(terminals, hierarchy);
            return formatResponseToFitJqueryTable(visibleTerminals, hierarchy);
        }

        return ok(new ArrayList<>());
    }

    private ResponseEntity formatResponseToFitJqueryTable(List<EnhancedTerminal> terminals, EnhancedHierarchy hierarchy) {
        List<SimpleShortPayView> results = new ArrayList<>();
        for (EnhancedTerminal terminal : terminals) {
            EnhancedMerchant merchant = hierarchy.getFirstMerchant();
            EnhancedLocation location = hierarchy.getLocation();

            SimpleShortPayView result = new SimpleShortPayView();
            result.setLocationId((location != null && location.getLegacyId() != null) ? location.getLegacyId() : "N/A");
            result.setLocationName(location != null ? location.getName() : "N/A");
            result.setMerchantId((merchant != null && merchant.getLegacyId() != null) ? merchant.getLegacyId() : "N/A");
            result.setMerchantName(merchant != null ? merchant.getName() : "N/A");
            result.setTerminalId(terminal.getLegacyId() != null ? terminal.getLegacyId() : "N/A");
            result.setTerminalNumber(terminal.getName());

            results.add(result);
        }

        return ok(results);
    }

    private List<EnhancedTerminal> getVisibleTerminalsWithValidHierarchy(List<EnhancedTerminal> locationTerminals, final EnhancedHierarchy hierarchy) {
        return locationTerminals.stream()
                                .filter(p -> (p.getIsHidden() == null || !p.getIsHidden()) &&
                                        hierarchy != null &&
                                        (hierarchy.getMerchants() != null && hierarchy.getFirstMerchant() != null && hierarchy.getFirstMerchant()
                                                                                                                              .getName() != null) &&
                                        (hierarchy.getLocation() != null && hierarchy.getLocation()
                                                                                     .getName() != null) &&
                                        (p.getName() != null))
                                .collect(Collectors.toList());
    }

}
