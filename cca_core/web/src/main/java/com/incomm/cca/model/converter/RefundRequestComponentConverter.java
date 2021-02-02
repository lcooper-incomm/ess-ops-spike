package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.session.RefundRequestComponent;
import com.incomm.cca.model.view.session.RefundRequestComponentView;
import com.incomm.cscore.client.model.CsCoreAddress;
import com.incomm.cscore.client.model.constant.CsCoreAddressType;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import com.incomm.cscore.gringotts.GringottsExchange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RefundRequestComponentConverter {

    @Autowired
    private TimestampConverter timestampConverter;

    public RefundRequestComponentView convert(RefundRequestComponent request) {
        RefundRequestComponentView view = null;

        if (request != null) {
            view = new RefundRequestComponentView();
            view.setId(request.getId());
            view.setAddress(this.convertAddress(request));
            view.setAmount(GringottsExchange.quickExchange(request.getAmount()));
            view.setAni(request.getAni());
            view.setApprovedDate(timestampConverter.convert(request.getApprovedDate()));
            view.setName(request.getName());
            view.setRequestedDate(timestampConverter.convert(request.getRequestedDate()));
        }

        return view;
    }

    private CsCoreAddress convertAddress(RefundRequestComponent request) {
        CsCoreAddress view = new CsCoreAddress();
        view.setLine1(request.getLine1());
        view.setLine2(request.getLine2());
        view.setCity(request.getCity());
        view.setState(request.getState());
        view.setPostalCode(request.getPostalCode());
        view.setType(CsCoreAddressType.MAILING);

        return view;
    }
}
