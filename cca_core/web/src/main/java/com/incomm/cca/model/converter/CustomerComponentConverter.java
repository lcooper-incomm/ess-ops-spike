package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.session.CustomerComponent;
import com.incomm.cca.model.view.session.CustomerComponentView;
import com.incomm.cscore.client.model.CsCoreAddress;
import com.incomm.cscore.client.model.constant.CsCoreAddressType;
import org.springframework.stereotype.Service;

@Service
public class CustomerComponentConverter {

    public CustomerComponentView convert(CustomerComponent request) {
        CustomerComponentView view = null;

        if (request != null) {
            view = new CustomerComponentView();
            view.setId(request.getId());
            view.setAddress(this.convertAddress(request));
            view.setAni(request.getAni());
            view.setCallbackTime(request.getCallbackTime());
            view.setContactMethod(request.getContactMethod());
            view.setDateOfBirth(request.getDateOfBirth());
            view.setEmailAddress(request.getEmailAddress());
            view.setFirstName(request.getFirstName());
            view.setLanguage(request.getLanguage());
            view.setLastName(request.getLastName());
            view.setPhoneNumber(request.getPhoneNumber());
        }

        return view;
    }

    private CsCoreAddress convertAddress(CustomerComponent request) {
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
