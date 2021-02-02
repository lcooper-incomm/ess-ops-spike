package com.incomm.cca.controller.session;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.converter.CallComponentConverter;
import com.incomm.cca.model.domain.session.CallComponent;
import com.incomm.cca.model.view.session.CallComponentView;
import com.incomm.cca.service.session.CallComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/call-component")
public class CallComponentController extends RestResponseHandler {

    @Autowired
    private CallComponentConverter callComponentConverter;
    @Autowired
    private CallComponentService callComponentService;

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity updateCallDetail(@PathVariable("id") Long id, @RequestBody CallComponentView request) {
        callComponentService.updateOne(request);
        CallComponent result = callComponentService.findOne(id);
        return ok(callComponentConverter.convert(result));
    }

}
