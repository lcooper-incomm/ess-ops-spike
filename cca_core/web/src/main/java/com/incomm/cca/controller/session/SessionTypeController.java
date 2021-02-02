package com.incomm.cca.controller.session;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.constant.SessionTypeType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/session-type")
public class SessionTypeController extends RestResponseHandler {

    @GetMapping
    public ResponseEntity findAll() {
        return ok(SessionTypeType.getAllValues());
    }
}
