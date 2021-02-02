package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.C2CRequest;
import com.incomm.cca.model.view.action.C2CRequestView;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import com.incomm.cscore.gringotts.GringottsExchange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class C2CRequestConverter {

    @Autowired
    private TimestampConverter timestampConverter;
    @Autowired
    private UserConverter userConverter;

    public List<C2CRequestView> convert(Collection<C2CRequest> request) {
        List<C2CRequestView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(item -> views.add(this.convert(item)));
        }

        return views;
    }

    public C2CRequestView convert(C2CRequest request) {
        C2CRequestView view = null;

        if (request != null) {
            view = new C2CRequestView();
            view.setId(request.getId());
            view.setAmount(GringottsExchange.quickExchange(request.getAmount()));
            view.setComment(request.getComment());
            view.setCreatedBy(userConverter.convertSimple(request.getCreatedBy()));
            view.setCreatedDate(timestampConverter.convert(request.getCreatedDate()));
            view.setFromCustomerId(request.getFromCustomerId());
            view.setModifiedBy(userConverter.convertSimple(request.getModifiedBy()));
            view.setModifiedDate(timestampConverter.convert(request.getModifiedDate()));
            view.setPlatform(AplsPlatform.convert(request.getPlatform()));
            view.setReason(request.getReason());
            view.setSessionId(request.getSessionId());
            view.setStatus(request.getStatus());
            view.setToCustomerId(request.getToCustomerId());
            view.setTransferFee(GringottsExchange.quickExchange(request.getTransferFee()));
        }

        return view;
    }
}
