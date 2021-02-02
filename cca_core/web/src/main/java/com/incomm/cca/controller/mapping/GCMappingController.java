package com.incomm.cca.controller.mapping;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.domain.mapping.GCRequest;
import com.incomm.cca.model.domain.mapping.GCResponse;
import com.incomm.cca.model.view.mapping.GreencardRequestMappingView;
import com.incomm.cca.model.view.mapping.GreencardResponseMappingView;
import com.incomm.cca.service.mapping.DataMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rest/greencard/mapping")
public class GCMappingController extends RestResponseHandler {

    @Autowired
    private DataMappingService dataMappingService;

    @RequestMapping(method = RequestMethod.GET, value = "/request")
    public ResponseEntity getAllRequests() {
        List<GCRequest> requests = dataMappingService.getAllGCRequests();
        return ok(requests.stream()
                          .map(GreencardRequestMappingView::new)
                          .collect(Collectors.toList()));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/response")
    public ResponseEntity getAllResponses() {
        List<GCResponse> responses = dataMappingService.getAllGCResponses();
        return ok(responses.stream()
                           .map(GreencardResponseMappingView::new)
                           .collect(Collectors.toList()));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/request")
    public ResponseEntity createGCRequest(@RequestBody GCRequest request) {
        GCRequest updated = dataMappingService.createGCRequest(request);
        return ok(new GreencardRequestMappingView(updated));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/response")
    public ResponseEntity createGCResponse(@RequestBody GCResponse request) {
        GCResponse updated = dataMappingService.createGCResponse(request);
        return ok(new GreencardResponseMappingView(updated));
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/request/{id}")
    public ResponseEntity updateGCRequest(@PathVariable("id") Long id, @RequestBody GCRequest request) {
        GCRequest updated = dataMappingService.updateGCRequest(request);
        return ok(new GreencardRequestMappingView(updated));
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/response/{id}")
    public ResponseEntity updateGCResponse(@PathVariable("id") Long id, @RequestBody GCResponse request) {
        GCResponse updated = dataMappingService.updateGCResponse(request);
        return ok(new GreencardResponseMappingView(updated));
    }

    @RequestMapping(value = "/request/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteGCRequest(@PathVariable("id") Long id) {
        dataMappingService.deleteGCRequest(id);
        return noContent();
    }

    @RequestMapping(value = "/response/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteGCResponse(@PathVariable("id") Long id) {
        dataMappingService.deleteGCResponse(id);
        return noContent();
    }
}
