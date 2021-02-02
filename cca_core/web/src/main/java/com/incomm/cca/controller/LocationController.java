package com.incomm.cca.controller;

import com.incomm.apls.model.requests.AplsRequestLocation;
import com.incomm.apls.model.support.Address;
import com.incomm.cca.model.view.search.LocationSearchRequest;
import com.incomm.cca.service.apls.AplsNodeService;
import com.incomm.cscore.client.apls.model.node.EnhancedLocation;
import com.incomm.cscore.client.apls.model.node.EnhancedLocations;
import com.incomm.cscore.client.apls.model.node.EnhancedTerminals;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/location")
public class LocationController extends RestResponseHandler {

    @Autowired
    private AplsNodeService aplsNodeService;

    @GetMapping(value = "/{locationId}/terminal")
    public ResponseEntity findAllTerminalsByLocationId(
            @PathVariable("locationId") String locationId) {
        AplsRequestLocation aplsRequestLocation = new AplsRequestLocation();
        aplsRequestLocation.setLocationId(locationId);

        EnhancedTerminals dto = aplsNodeService.getTerminals(aplsRequestLocation);
        return ok(dto.getTerminals());
    }

    @GetMapping(value = "/{locationId}")
    public ResponseEntity findOne(@PathVariable("locationId") String locationId) {
        AplsRequestLocation aplsRequestLocation = new AplsRequestLocation();
        aplsRequestLocation.setLocationId(locationId);

        EnhancedLocations locations = aplsNodeService.getLocations(aplsRequestLocation);
        EnhancedLocation location = locations.getLocations()
                                             .stream()
                                             .filter(location1 -> location1.getId()
                                                                           .equals(locationId))
                                             .findFirst()
                                             .orElse(null);
        if (location != null) {
            return ok(location);
        } else {
            return noContent();
        }
    }

    @PostMapping(value = "/search")
    public ResponseEntity advancedSearch(@RequestBody LocationSearchRequest request) {
        Address address = new Address();
        address.setLine1(request.getAddress());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPostalCode(request.getPostalCode());

        AplsRequestLocation aplsRequestLocation = new AplsRequestLocation();
        aplsRequestLocation.setAddress(address);
        aplsRequestLocation.setTerminalName(request.getTerminalID());
        aplsRequestLocation.setPhone(request.getPhoneNumber());
        aplsRequestLocation.setLocationName(request.getLocationName());
        aplsRequestLocation.setLocationId(request.getLocationId());
        aplsRequestLocation.setLegacyLocationId(request.getLegacyLocationId());
        aplsRequestLocation.setMerchantName(request.getMerchantName());

        EnhancedLocations locations = aplsNodeService.getLocations(aplsRequestLocation);
        return ok(locations.getLocations());
    }
}
