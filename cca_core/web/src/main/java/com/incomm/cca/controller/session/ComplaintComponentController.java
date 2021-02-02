package com.incomm.cca.controller.session;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.converter.complaint.ComplaintComponentConverter;
import com.incomm.cca.model.domain.session.ComplaintComponent;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.model.view.session.ComplaintComponentView;
import com.incomm.cca.service.RequestService;
import com.incomm.cca.service.session.ComplaintComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/complaint-component")
public class ComplaintComponentController extends RestResponseHandler {

    @Autowired
    private ComplaintComponentConverter complaintComponentConverter;
    @Autowired
    private ComplaintComponentService complaintComponentService;
    @Autowired
    private RequestService requestService;

    @GetMapping("/{id}")
    public ResponseEntity findOne(@PathVariable("id") Long id) {
        ComplaintComponent complaintComponent = this.complaintComponentService.findOne(id);
        if (complaintComponent != null) {
            return ok(this.complaintComponentConverter.convert(complaintComponent));
        } else {
            return noContent();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity updateOne(@PathVariable("id") Long id, @RequestBody ComplaintComponentView request) throws IllegalAccessException, InstantiationException {
        Session session = new Session();
        session.setId(this.requestService.getSessionId());

        ComplaintComponent complaintComponent = complaintComponentConverter.convertView(request);
        complaintComponent.setSession(session);

        ComplaintComponent updated = this.complaintComponentService.updateOne(complaintComponent);
        return ok(this.complaintComponentConverter.convert(updated));
    }
}
