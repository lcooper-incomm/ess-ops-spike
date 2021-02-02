package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.session.EncorComponent;
import com.incomm.cca.model.view.session.EncorComponentView;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EncorComponentConverter {

    public EncorComponentView convert(EncorComponent request) {
        EncorComponentView view = null;

        if (request != null) {
            view = new EncorComponentView();
            view.setId(request.getId());
            view.setPriority(request.getPriority());
            view.setCustomerId(request.getCustomerId());
            view.setOrderId(request.getOrderId());
            view.setIssueType(request.getIssueType());
            view.setComplaintType(request.getComplaintType());
        }

        return view;
    }
}
