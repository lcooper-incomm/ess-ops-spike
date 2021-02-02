package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.session.PrivacyRequestComponent;
import com.incomm.cca.model.view.session.PrivacyRequestComponentView;
import com.incomm.cscore.client.model.CsCoreAddress;
import com.incomm.cscore.client.model.constant.CsCoreAddressType;
import org.springframework.stereotype.Service;

@Service
public class PrivacyRequestComponentConverter {

    public PrivacyRequestComponentView convert(PrivacyRequestComponent request) {
        PrivacyRequestComponentView view = null;

        if (request != null) {
            view = new PrivacyRequestComponentView();
            view.setId(request.getId());
            view.setAddress(this.convertAddress(request));
            view.setEmail(request.getEmail());
            view.setFirstName(request.getFirstName());
            view.setLastName(request.getLastName());
            view.setPhoneNumber(request.getPhoneNumber());
            view.setAccount(request.getAccount());
            view.setJobTitle(request.getJobTitle());
            view.setComment(request.getComment());
            view.setProductId(request.getProductId());
        }

        return view;
    }

    private CsCoreAddress convertAddress(PrivacyRequestComponent request) {
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
